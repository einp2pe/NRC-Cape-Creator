export interface RemoteCapeSections {
  front: HTMLImageElement
  back: HTMLImageElement
  elytra: HTMLImageElement
}

export const ALLOWED_TEMPLATE_HOSTS = [
  'cdn.norisk.gg',
  'cdn.discordapp.com',
  'media.discordapp.net',
  'discord.com',
  'discordapp.com',
  'discordapp.net'
]

const CAPE_SECTIONS = {
  front: { x: 8, y: 8, w: 80, h: 128 },
  back: { x: 96, y: 8, w: 80, h: 128 },
  elytra: { x: 288, y: 16, w: 80, h: 160 },
}

const PNG_EXTENSION = '.png'

const isDiscordHost = (host: string) => /discord(app)?\.net$/i.test(host) || /discord(app)?\.com$/i.test(host)

const matchesAllowedHost = (host: string) => {
  const normalized = host.toLowerCase()
  if (normalized === 'cdn.norisk.gg') return true
  if (normalized === 'cdn.discordapp.com' || normalized === 'media.discordapp.net') return true
  if (isDiscordHost(normalized)) return true
  return false
}

const ensureHttpsUrl = (url: URL) => {
  if (url.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs are allowed for templates')
  }
}

const ensureAllowedHost = (url: URL) => {
  if (!matchesAllowedHost(url.hostname)) {
    throw new Error('URL domain is not whitelisted for template imports')
  }
}

const ensurePngPath = (url: URL) => {
  if (!url.pathname.toLowerCase().endsWith(PNG_EXTENSION)) {
    throw new Error('Template URL must point to a .png file')
  }
}

const loadImageFromBlob = (blob: Blob, signal?: AbortSignal): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob)
    const image = new Image()
    const cleanup = () => URL.revokeObjectURL(objectUrl)

    image.onload = () => {
      cleanup()
      resolve(image)
    }

    image.onerror = () => {
      cleanup()
      reject(new Error('Failed to decode template PNG'))
    }

    if (signal) {
      signal.addEventListener('abort', () => {
        cleanup()
        image.src = ''
        reject(new DOMException('Template load aborted', 'AbortError'))
      }, { once: true })
    }

    image.src = objectUrl
  })
}

const canvasToImage = (draw: (ctx: CanvasRenderingContext2D) => void, width: number, height: number): Promise<HTMLImageElement> => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return Promise.reject(new Error('Canvas 2D context unavailable'))
  }
  draw(ctx)
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to create image from section'))
    image.src = canvas.toDataURL('image/png')
  })
}

const cropSection = async (image: HTMLImageElement, section: { x: number; y: number; w: number; h: number }) => {
  if (image.width < section.x + section.w || image.height < section.y + section.h) {
    throw new Error('Template PNG is smaller than the required cape layout')
  }

  return canvasToImage((ctx) => {
    ctx.drawImage(
      image,
      section.x,
      section.y,
      section.w,
      section.h,
      0,
      0,
      section.w,
      section.h
    )
  }, section.w, section.h)
}

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const isNearWhite = (r: number, g: number, b: number) => {
  // Treat very bright colors as white-ish to avoid choosing the template background
  const threshold = 235
  return r >= threshold && g >= threshold && b >= threshold
}

const countDominantColor = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const data = ctx.getImageData(0, 0, w, h).data
  const counts = new Map<string, number>()
  // Sample every 2 pixels for performance
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const idx = (y * w + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = data[idx + 3]
      if (a < 10) continue // skip transparent
      if (isNearWhite(r, g, b)) continue // skip near-white
      const hex = rgbToHex(r, g, b)
      counts.set(hex, (counts.get(hex) ?? 0) + 1)
    }
  }
  let best: string | null = null
  let bestCount = 0
  counts.forEach((cnt, hex) => {
    if (cnt > bestCount) { bestCount = cnt; best = hex }
  })
  return best ?? '#ffffff'
}

export const computeDominantCapeColor = async (image: HTMLImageElement): Promise<string> => {
  // Create canvas and analyze front + back sections; prefer front then fallback to back
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return '#ffffff'

  // Try front
  canvas.width = CAPE_SECTIONS.front.w
  canvas.height = CAPE_SECTIONS.front.h
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    image,
    CAPE_SECTIONS.front.x,
    CAPE_SECTIONS.front.y,
    CAPE_SECTIONS.front.w,
    CAPE_SECTIONS.front.h,
    0,
    0,
    CAPE_SECTIONS.front.w,
    CAPE_SECTIONS.front.h
  )
  let dominant = countDominantColor(ctx, canvas.width, canvas.height)
  if (dominant !== '#ffffff') return dominant

  // Fallback to back
  canvas.width = CAPE_SECTIONS.back.w
  canvas.height = CAPE_SECTIONS.back.h
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    image,
    CAPE_SECTIONS.back.x,
    CAPE_SECTIONS.back.y,
    CAPE_SECTIONS.back.w,
    CAPE_SECTIONS.back.h,
    0,
    0,
    CAPE_SECTIONS.back.w,
    CAPE_SECTIONS.back.h
  )
  dominant = countDominantColor(ctx, canvas.width, canvas.height)
  return dominant
}

export const validateTemplateUrl = (input: string): URL => {
  if (!input.trim()) {
    throw new Error('Template URL is required')
  }

  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    throw new Error('Template URL is not a valid URL')
  }

  ensureHttpsUrl(url)
  ensureAllowedHost(url)
  ensurePngPath(url)

  return url
}

export const loadRemoteCapeTemplate = async (input: string, signal?: AbortSignal): Promise<RemoteCapeSections> => {
  const url = validateTemplateUrl(input)

  const response = await fetch(url.toString(), { signal })
  if (!response.ok) {
    throw new Error('Failed to fetch template PNG')
  }

  const contentType = response.headers.get('content-type')
  if (contentType && !contentType.includes('image/png')) {
    throw new Error('Template URL must point to a PNG file')
  }

  const blob = await response.blob()
  const baseImage = await loadImageFromBlob(blob, signal)

  const [front, back, elytra] = await Promise.all([
    cropSection(baseImage, CAPE_SECTIONS.front),
    cropSection(baseImage, CAPE_SECTIONS.back),
    cropSection(baseImage, CAPE_SECTIONS.elytra),
  ])

  return { front, back, elytra }
}
