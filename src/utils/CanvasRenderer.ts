class CanvasRenderer {
  private static instance: CanvasRenderer | null = null
  private templateImg: HTMLImageElement | null = null
  private templateReady: boolean = false
  private templateReadyListeners: Array<() => void> = []
  // vanilla elytra removed

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
  // continuation coords removed (unused)

  private constructor() {
    this.initTemplate()
  }

  static getInstance(): CanvasRenderer {
    if (!CanvasRenderer.instance) {
      CanvasRenderer.instance = new CanvasRenderer()
    }
    return CanvasRenderer.instance
  }

  onTemplateReady(listener: () => void): () => void {
    if (this.templateReady) {
      listener()
      return () => {}
    }
    this.templateReadyListeners.push(listener)
    return () => {
      this.templateReadyListeners = this.templateReadyListeners.filter((l) => l !== listener)
    }
  }

  private notifyTemplateReady(): void {
    if (this.templateReadyListeners.length === 0) return
    const listeners = [...this.templateReadyListeners]
    this.templateReadyListeners = []
    listeners.forEach((listener) => listener())
  }

  private initTemplate(): void {
    this.templateImg = new Image()
    // Try loading the template from the public folder using Vite base URL
    const templatePath = `${import.meta.env.BASE_URL}nrc_cape_template.png`
    const fallbackLogo = `${import.meta.env.BASE_URL}logo.svg`

    this.templateImg.src = templatePath
    this.templateImg.onload = () => {
      this.templateReady = true
      this.notifyTemplateReady()
    }
    // If the PNG is not found, try falling back to the project logo (SVG)
    this.templateImg.onerror = () => {
      // attempt fallback
      this.templateImg!.onerror = () => {
        this.templateReady = false
        this.notifyTemplateReady()
      }
      this.templateImg!.src = fallbackLogo
    }

    // vanilla elytra asset removed — overlay no longer used
  }

  drawCape(
    canvas: HTMLCanvasElement,
    frontImage: HTMLImageElement | null,
    backImage: HTMLImageElement | null,
    elytraImage: HTMLImageElement | null,
    gradientColors: string[],
    gradDirection: 'vertical' | 'horizontal',
    options?: {
      // optional separate elytra gradient
      separateElytraGradient?: boolean
      elytraGradientColors?: string[] | null
      elytraGradDirection?: 'vertical' | 'horizontal'
      // vanillaElytraEnabled removed
    }
  ): void {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Base template dimensions used by the renderer.
    // The template image is 512x256 and all coordinates below are defined in that space.
    const BASE_WIDTH = 512
    const BASE_HEIGHT = 256

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Scale drawing operations so template coordinates map to current canvas size
    const scaleX = canvas.width / BASE_WIDTH
    const scaleY = canvas.height / BASE_HEIGHT
    ctx.save()
    ctx.scale(scaleX, scaleY)

    // Draw template base if ready (coordinates are in base units)
    if (this.templateReady && this.templateImg) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(this.templateImg, 0, 0, BASE_WIDTH, BASE_HEIGHT)
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
    // Before template is ready, render directly so a white cape appears immediately.
    ctx.globalCompositeOperation = this.templateReady && this.templateImg ? 'source-atop' : 'source-over'
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

    // emoji/text rendering removed

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
    // vanilla elytra overlay removed

    // restore transform to pixel canvas coordinates
    ctx.restore()
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
