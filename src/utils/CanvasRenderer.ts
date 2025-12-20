class CanvasRenderer {
  private static instance: CanvasRenderer | null = null
  private templateImg: HTMLImageElement | null = null
  private templateReady: boolean = false

  private readonly FRONT_X = 8
  private readonly FRONT_Y = 8
  private readonly FRONT_W = 80
  private readonly FRONT_H = 128

  private readonly BACK_X = 96
  private readonly BACK_Y = 8
  private readonly BACK_W = 80
  private readonly BACK_H = 128

  private readonly ELYTRA_X = 288
  private readonly ELYTRA_Y = 16
  private readonly ELYTRA_W = 80
  private readonly ELYTRA_H = 160

  // Template "bottom" strip (maps to front of cape)
  // In template: 88,0 to 167,7 (80x8 pixels)
  // Rendered on cape front: 8,8 to 87,135 (80x128 pixels)
  private readonly BOTTOM_STRIP_X = 88
  private readonly BOTTOM_STRIP_Y = 0
  private readonly BOTTOM_STRIP_W = 80
  private readonly BOTTOM_STRIP_H = 8

  // Elytra "bottom" strip (maps to below elytra)
  // In template: 272,0 to 319,7 (48x8 pixels)
  // Rendered below elytra: 320,176 to 367,183 (48x8 pixels)
  private readonly ELYTRA_BOTTOM_STRIP_X = 272
  private readonly ELYTRA_BOTTOM_STRIP_Y = 0
  private readonly ELYTRA_BOTTOM_STRIP_W = 48
  private readonly ELYTRA_BOTTOM_STRIP_H = 8
  // Where it actually renders (continuation area)
  private readonly ELYTRA_CONTINUATION_X = 320
  private readonly ELYTRA_CONTINUATION_Y = 176

  private constructor() {
    this.initTemplate()
  }

  static getInstance(): CanvasRenderer {
    if (!CanvasRenderer.instance) {
      CanvasRenderer.instance = new CanvasRenderer()
    }
    return CanvasRenderer.instance
  }

  private initTemplate(): void {
    this.templateImg = new Image()
    // Try loading the template from the public folder using Vite base URL
    const templatePath = `${import.meta.env.BASE_URL}nrc_cape_template.png`
    const fallbackLogo = `${import.meta.env.BASE_URL}logo.svg`

    this.templateImg.src = templatePath
    this.templateImg.onload = () => {
      this.templateReady = true
    }
    // If the PNG is not found, try falling back to the project logo (SVG)
    this.templateImg.onerror = () => {
      // attempt fallback
      this.templateImg!.onerror = () => {
        this.templateReady = false
      }
      this.templateImg!.src = fallbackLogo
    }
  }

  drawCape(
    canvas: HTMLCanvasElement,
    frontImage: HTMLImageElement | null,
    backImage: HTMLImageElement | null,
    elytraImage: HTMLImageElement | null,
    gradientColors: string[],
    gradDirection: 'vertical' | 'horizontal',
    options?: {
      emojiEnabled?: boolean
      emoji?: string
      emojiSize?: number
      emojiSpacing?: number
      emojiOpacity?: number
      emojiRotation?: number
      emojiRandomRotation?: boolean
      emojiJitter?: number
      emojiApplyToElytra?: boolean
      emojiSeed?: number
      textColor?: string
      textStrokeEnabled?: boolean
      textStrokeColor?: string
      textStrokeWidth?: number
      textFont?: string
      textBold?: boolean
      textItalic?: boolean
      // optional separate elytra gradient
      separateElytraGradient?: boolean
      elytraGradientColors?: string[] | null
      elytraGradDirection?: 'vertical' | 'horizontal'
    }
  ): void {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw template base if ready
    if (this.templateReady && this.templateImg) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(this.templateImg, 0, 0)
    } else {
      ctx.globalCompositeOperation = 'source-over'
    }

    // Cape area: fill 0,0 to 176,136, gradient starts at 8,8
    const CAPE_FILL_X = 0
    const CAPE_FILL_Y = 0
    const CAPE_FILL_W = 176
    const CAPE_FILL_H = 136
    const CAPE_GRAD_START_X = 8
    const CAPE_GRAD_START_Y = 8
    const CAPE_GRAD_W = 168  // from 8 to 176
    const CAPE_GRAD_H = 128  // from 8 to 136
    const capeGradient = this.createGradientAt(ctx, CAPE_GRAD_START_X, CAPE_GRAD_START_Y, CAPE_GRAD_W, CAPE_GRAD_H, gradientColors, gradDirection)
    ctx.globalCompositeOperation = 'source-atop'
    ctx.fillStyle = capeGradient
    ctx.fillRect(CAPE_FILL_X, CAPE_FILL_Y, CAPE_FILL_W, CAPE_FILL_H)

    // Bottom strip area (maps to front): continues below front area
    // The strip at 88,0 to 167,7 represents Y=136 to Y=143 below front (continuation)
    // Gradient should continue from where front ends
    const bottomStripGradient = this.createContinuationGradient(
      ctx,
      this.BOTTOM_STRIP_X,
      this.BOTTOM_STRIP_Y,
      this.BOTTOM_STRIP_W,
      this.BOTTOM_STRIP_H,
      gradientColors,
      gradDirection,
      this.FRONT_H,  // front height (where we continue from)
      this.BOTTOM_STRIP_H  // strip height (continuation length)
    )
    ctx.fillStyle = bottomStripGradient
    ctx.fillRect(this.BOTTOM_STRIP_X, this.BOTTOM_STRIP_Y, this.BOTTOM_STRIP_W, this.BOTTOM_STRIP_H)

    // Elytra area: fill 176,0 to 368,176, gradient starts at 272,16
    const ELYTRA_FILL_X = 176
    const ELYTRA_FILL_Y = 0
    const ELYTRA_FILL_W = 192  // from 176 to 368
    const ELYTRA_FILL_H = 176
    const ELYTRA_GRAD_START_X = 272
    const ELYTRA_GRAD_START_Y = 16
    const ELYTRA_GRAD_W = 96   // from 272 to 368
    const ELYTRA_GRAD_H = 160  // from 16 to 176
    const elytraColors = options?.separateElytraGradient && options?.elytraGradientColors ? options.elytraGradientColors : gradientColors
    const elytraDir = options?.separateElytraGradient && options?.elytraGradDirection ? options.elytraGradDirection : gradDirection
    const elytraGradient = this.createGradientAt(ctx, ELYTRA_GRAD_START_X, ELYTRA_GRAD_START_Y, ELYTRA_GRAD_W, ELYTRA_GRAD_H, elytraColors!, elytraDir)
    ctx.fillStyle = elytraGradient
    ctx.fillRect(ELYTRA_FILL_X, ELYTRA_FILL_Y, ELYTRA_FILL_W, ELYTRA_FILL_H)

    // Elytra bottom strip area: continues below elytra area
    // The strip at 272,0 to 319,7 represents Y=176 to Y=183 below elytra (continuation)
    // Gradient should continue from where elytra ends
    const elytraBottomStripGradient = this.createContinuationGradient(
      ctx,
      this.ELYTRA_BOTTOM_STRIP_X,
      this.ELYTRA_BOTTOM_STRIP_Y,
      this.ELYTRA_BOTTOM_STRIP_W,
      this.ELYTRA_BOTTOM_STRIP_H,
      elytraColors!,
      elytraDir,
      this.ELYTRA_H,  // elytra height (where we continue from)
      this.ELYTRA_BOTTOM_STRIP_H  // strip height (continuation length)
    )
    ctx.fillStyle = elytraBottomStripGradient
    ctx.fillRect(this.ELYTRA_BOTTOM_STRIP_X, this.ELYTRA_BOTTOM_STRIP_Y, this.ELYTRA_BOTTOM_STRIP_W, this.ELYTRA_BOTTOM_STRIP_H)

    // Draw emoji tiled pattern above the color but below user images
    if (options?.emojiEnabled && options?.emoji) {
      const emoji = options.emoji
      const size = options.emojiSize || 48
      const spacing = options.emojiSpacing || 64
      const opacity = typeof options.emojiOpacity === 'number' ? options.emojiOpacity : 1
      const baseRotation = options.emojiRotation || 0
      const randomRotation = !!options.emojiRandomRotation
      const jitter = options.emojiJitter || 0
      const applyToElytra = options.emojiApplyToElytra !== false
      const seed = options.emojiSeed || 0

      // Text style options
      const textColor = options.textColor || '#ffffff'
      const textStrokeEnabled = !!options.textStrokeEnabled
      const textStrokeColor = options.textStrokeColor || '#000000'
      const textStrokeWidth = options.textStrokeWidth || 2
      const textFont = options.textFont || 'sans-serif'
      const textBold = !!options.textBold
      const textItalic = !!options.textItalic

      ctx.save()
      ctx.globalAlpha = opacity

      // Create clipping region that excludes the strip areas (88,0 to 167,7) and (272,0 to 319,7) and (176,88 to 183,175)
      ctx.beginPath()
      // Draw the entire canvas area
      ctx.rect(0, 0, canvas.width, canvas.height)
      // Cut out excluded strip 1: 88,0 to 168,8
      ctx.rect(88, 0, 80, 8)
      // Cut out excluded strip 2: 272,0 to 320,8
      ctx.rect(272, 0, 48, 8)
      // Cut out excluded area 3: 176,88 to 183,175 (8x88)
      ctx.rect(176, 88, 8, 88)
      ctx.clip('evenodd')

      // Build font string
      let fontStyle = ''
      if (textItalic) fontStyle += 'italic '
      if (textBold) fontStyle += 'bold '
      fontStyle += `${size}px `
      // Use emoji fonts for pure emoji (single emoji character), otherwise use selected font
      // Improved emoji detection: check if it's a single grapheme that is an emoji
      const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(\u200D(\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*$/u
      const isEmoji = emojiRegex.test(emoji) && [...emoji].length <= 7 // ZWJ sequences can be long
      if (isEmoji) {
        fontStyle += '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
      } else {
        fontStyle += `"${textFont}", sans-serif`
      }
      ctx.font = fontStyle
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = textColor
      if (textStrokeEnabled) {
        ctx.strokeStyle = textStrokeColor
        ctx.lineWidth = textStrokeWidth
      }

      const rand = (x: number, y: number) => {
        // deterministic pseudo-random based on coordinates and seed
        const s = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
        return s - Math.floor(s)
      }

      // Map "below front" coordinates to bottom strip coordinates
      // Below front: Y=136-143 (continuation) -> Bottom strip: 88,0 to 167,7
      // X stays same relative position, Y maps 136-143 to 0-7
      const mapBelowFrontToBottomStrip = (belowX: number, belowY: number) => {
        const relX = belowX - this.FRONT_X  // 0-79 (same X as front)
        const relY = belowY - (this.FRONT_Y + this.FRONT_H)  // 0-7 (Y below front)
        const stripX = this.BOTTOM_STRIP_X + relX  // 88-167
        const stripY = this.BOTTOM_STRIP_Y + relY  // 0-7
        return { x: stripX, y: stripY }
      }

      // Map "below elytra" coordinates to elytra bottom strip coordinates
      // Below elytra: 320,176 to 367,183 -> Elytra bottom strip: 272,0 to 319,7
      const mapBelowElytraToBottomStrip = (belowX: number, belowY: number) => {
        const relX = belowX - this.ELYTRA_CONTINUATION_X  // 0-47
        const relY = belowY - this.ELYTRA_CONTINUATION_Y  // 0-7
        const stripX = this.ELYTRA_BOTTOM_STRIP_X + relX  // 272-319
        const stripY = this.ELYTRA_BOTTOM_STRIP_Y + relY  // 0-7
        return { x: stripX, y: stripY }
      }

      // Emoji covers entire gradient area (cape + elytra = 0,0 to 368,176)
      const EMOJI_AREA_W = 368
      const EMOJI_AREA_H = 176

      for (let y = 0; y < EMOJI_AREA_H + spacing; y += spacing) {
        const rowIndex = Math.floor(y / spacing)
        const offset = (rowIndex % 2 === 0) ? 0 : spacing / 2
        for (let x = -spacing; x < EMOJI_AREA_W + spacing; x += spacing) {
          let px = x + offset + spacing / 2
          let py = y + spacing / 2

          // apply jitter
          if (jitter > 0) {
            const r = rand(px + 0.1, py + 0.2)
            const j = (r * 2 - 1) * jitter * spacing
            px += j
            py += (rand(px + 0.3, py + 0.4) * 2 - 1) * jitter * spacing
          }

          // Skip if not applying to elytra and the point intersects elytra region
          if (!applyToElytra) {
            if (
              px >= this.ELYTRA_X && px <= this.ELYTRA_X + this.ELYTRA_W &&
              py >= this.ELYTRA_Y && py <= this.ELYTRA_Y + this.ELYTRA_H
            ) {
              continue
            }
          }

          // rotation
          let angleDeg = baseRotation
          if (randomRotation) {
            angleDeg = (rand(px + 0.5, py + 0.6) * 360) - 180
          }
          const angle = (angleDeg * Math.PI) / 180

          ctx.save()
          ctx.translate(px, py)
          if (angle !== 0) ctx.rotate(angle)
          if (textStrokeEnabled) {
            ctx.strokeText(emoji as string, 0, 0)
          }
          ctx.fillText(emoji as string, 0, 0)
          ctx.restore()

          // Also draw in bottom strip if this emoji is in the "below front" area
          // Below front: X=8-87, Y=136-143 (continuation of front)
          const belowFrontStartY = this.FRONT_Y + this.FRONT_H  // 136
          const belowFrontEndY = belowFrontStartY + this.BOTTOM_STRIP_H  // 144
          const isInBelowFrontArea = px >= this.FRONT_X && px <= this.FRONT_X + this.FRONT_W &&
                                     py >= belowFrontStartY && py < belowFrontEndY
          if (isInBelowFrontArea) {
            const mapped = mapBelowFrontToBottomStrip(px, py)

            ctx.save()
            ctx.translate(mapped.x, mapped.y)
            if (angle !== 0) ctx.rotate(angle)
            if (textStrokeEnabled) {
              ctx.strokeText(emoji as string, 0, 0)
            }
            ctx.fillText(emoji as string, 0, 0)
            ctx.restore()
          }

          // Also draw in elytra bottom strip if this emoji is in the "below elytra" area
          // Below elytra: X=320-367, Y=176-183 (continuation of elytra)
          const isInBelowElytraArea = px >= this.ELYTRA_CONTINUATION_X && 
                                      px < this.ELYTRA_CONTINUATION_X + this.ELYTRA_BOTTOM_STRIP_W &&
                                      py >= this.ELYTRA_CONTINUATION_Y && 
                                      py < this.ELYTRA_CONTINUATION_Y + this.ELYTRA_BOTTOM_STRIP_H
          if (isInBelowElytraArea) {
            const mapped = mapBelowElytraToBottomStrip(px, py)

            ctx.save()
            ctx.translate(mapped.x, mapped.y)
            if (angle !== 0) ctx.rotate(angle)
            if (textStrokeEnabled) {
              ctx.strokeText(emoji as string, 0, 0)
            }
            ctx.fillText(emoji as string, 0, 0)
            ctx.restore()
          }
        }
      }

      ctx.restore()
    }

    // Draw template on top
    if (this.templateReady && this.templateImg) {
      ctx.globalCompositeOperation = 'destination-over'
      ctx.drawImage(this.templateImg, 0, 0)
    }

    ctx.globalCompositeOperation = 'source-over'

    // Draw user images
    if (frontImage) {
      ctx.drawImage(frontImage, this.FRONT_X, this.FRONT_Y, this.FRONT_W, this.FRONT_H)
    }
    if (backImage) {
      ctx.drawImage(backImage, this.BACK_X, this.BACK_Y, this.BACK_W, this.BACK_H)
    }

    // Draw elytra with masking
    if (elytraImage && this.templateReady && this.templateImg) {
      const maskCanvas = document.createElement('canvas')
      maskCanvas.width = this.ELYTRA_W
      maskCanvas.height = this.ELYTRA_H
      const maskCtx = maskCanvas.getContext('2d')
      if (!maskCtx) return

      maskCtx.drawImage(
        this.templateImg,
        this.ELYTRA_X,
        this.ELYTRA_Y,
        this.ELYTRA_W,
        this.ELYTRA_H,
        0,
        0,
        this.ELYTRA_W,
        this.ELYTRA_H
      )

      const elyCanvas = document.createElement('canvas')
      elyCanvas.width = this.ELYTRA_W
      elyCanvas.height = this.ELYTRA_H
      const elyCtx = elyCanvas.getContext('2d')
      if (!elyCtx) return

      elyCtx.drawImage(elytraImage, 0, 0, this.ELYTRA_W, this.ELYTRA_H)
      elyCtx.globalCompositeOperation = 'destination-in'
      elyCtx.drawImage(maskCanvas, 0, 0)

      ctx.drawImage(elyCanvas, this.ELYTRA_X, this.ELYTRA_Y)
    }
  }

  private createGradientAt(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    colors: string[],
    direction: 'vertical' | 'horizontal'
  ): CanvasGradient {
    let gradient: CanvasGradient

    if (direction === 'vertical') {
      gradient = ctx.createLinearGradient(x, y, x, y + height)
    } else {
      gradient = ctx.createLinearGradient(x, y, x + width, y)
    }

    if (colors.length === 0) {
      gradient.addColorStop(0, '#002aff')
      gradient.addColorStop(1, '#002aff')
    } else if (colors.length === 1) {
      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(1, colors[0])
    } else {
      const n = colors.length - 1
      colors.forEach((color, i) => {
        gradient.addColorStop(i / n, color)
      })
    }

    return gradient
  }

  // Create a gradient that continues from where the front area ends
  // This is used for the bottom strip which represents Y=136+ (below front)
  private createContinuationGradient(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    colors: string[],
    direction: 'vertical' | 'horizontal',
    frontHeight: number,
    stripHeight: number
  ): CanvasGradient {
    let gradient: CanvasGradient

    if (direction === 'vertical') {
      // For vertical gradient, we need to show the colors that would appear
      // at Y=136 to Y=143 if the gradient continued past the front area
      // The front area is 128px, strip is 8px, so we're showing 128/136 to 136/136 of the gradient
      gradient = ctx.createLinearGradient(x, y, x, y + height)
    } else {
      // For horizontal gradient, just continue the same gradient
      gradient = ctx.createLinearGradient(x, y, x + width, y)
    }

    if (colors.length === 0) {
      gradient.addColorStop(0, '#002aff')
      gradient.addColorStop(1, '#002aff')
    } else if (colors.length === 1) {
      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(1, colors[0])
    } else {
      if (direction === 'vertical') {
        // Calculate where in the overall gradient we are (128-136 out of 136 total)
        const totalHeight = frontHeight + stripHeight  // 136
        const startRatio = frontHeight / totalHeight   // 128/136 ≈ 0.941
        const endRatio = 1.0                           // 136/136 = 1.0
        
        // Interpolate colors for this portion of the gradient
        const n = colors.length - 1
        
        // Find the color at startRatio and endRatio
        const getColorAtRatio = (ratio: number) => {
          const pos = ratio * n
          const lowerIdx = Math.floor(pos)
          const upperIdx = Math.min(lowerIdx + 1, n)
          const t = pos - lowerIdx
          return this.interpolateColor(colors[lowerIdx], colors[upperIdx], t)
        }
        
        gradient.addColorStop(0, getColorAtRatio(startRatio))
        gradient.addColorStop(1, getColorAtRatio(endRatio))
      } else {
        // Horizontal: same as normal gradient
        const n = colors.length - 1
        colors.forEach((color, i) => {
          gradient.addColorStop(i / n, color)
        })
      }
    }

    return gradient
  }

  // Helper to interpolate between two hex colors
  private interpolateColor(color1: string, color2: string, t: number): string {
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')
    
    const r1 = parseInt(hex1.substring(0, 2), 16)
    const g1 = parseInt(hex1.substring(2, 4), 16)
    const b1 = parseInt(hex1.substring(4, 6), 16)
    
    const r2 = parseInt(hex2.substring(0, 2), 16)
    const g2 = parseInt(hex2.substring(2, 4), 16)
    const b2 = parseInt(hex2.substring(4, 6), 16)
    
    const r = Math.round(r1 + (r2 - r1) * t)
    const g = Math.round(g1 + (g2 - g1) * t)
    const b = Math.round(b1 + (b2 - b1) * t)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
}

export default CanvasRenderer
