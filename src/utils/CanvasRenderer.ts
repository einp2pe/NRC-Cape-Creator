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
    this.templateImg.src = 'nrc_cape_template.png'
    this.templateImg.onload = () => {
      this.templateReady = true
    }
    this.templateImg.onerror = () => {
      this.templateReady = false
    }
  }

  drawCape(
    canvas: HTMLCanvasElement,
    frontImage: HTMLImageElement | null,
    backImage: HTMLImageElement | null,
    elytraImage: HTMLImageElement | null,
    gradientColors: string[],
    gradDirection: 'vertical' | 'horizontal'
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

    // Create and draw gradient
    const gradient = this.createGradient(ctx, canvas, gradientColors, gradDirection)
    ctx.globalCompositeOperation = 'source-atop'
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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

  private createGradient(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: string[],
    direction: 'vertical' | 'horizontal'
  ): CanvasGradient {
    let gradient: CanvasGradient

    if (direction === 'vertical') {
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    } else {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
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
}

export default CanvasRenderer
