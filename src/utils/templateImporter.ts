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

