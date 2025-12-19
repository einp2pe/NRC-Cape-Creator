import { useEffect, useRef, useState, useCallback } from 'react'
import * as skinview3d from 'skinview3d'

interface CapePreview3DProps {
  capeCanvas: HTMLCanvasElement | null
  canvasVersion: number
}

const DEFAULT_SKIN_URL = 'https://textures.minecraft.net/texture/31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb'

const CapePreview3D: React.FC<CapePreview3DProps> = ({ capeCanvas, canvasVersion }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<skinview3d.SkinViewer | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState('')
  const [skinLoading, setSkinLoading] = useState(false)
  const [skinError, setSkinError] = useState<string | null>(null)
  const [viewerReady, setViewerReady] = useState(false)
  const [showElytra, setShowElytra] = useState(false)

  // Load skin by Minecraft username
  const loadSkinByUsername = useCallback(async (name: string) => {
    if (!viewerRef.current || !name.trim()) return
    
    setSkinLoading(true)
    setSkinError(null)
    
    try {
      const skinUrl = `https://mc-heads.net/skin/${encodeURIComponent(name.trim())}`
      await viewerRef.current.loadSkin(skinUrl)
      setSkinError(null)
    } catch (error) {
      console.error('Error loading skin:', error)
      setSkinError('Player not found')
      viewerRef.current.loadSkin(DEFAULT_SKIN_URL)
    } finally {
      setSkinLoading(false)
    }
  }, [])

  // Load skin from file
  const loadSkinFromFile = useCallback((file: File) => {
    if (!viewerRef.current) return
    
    setSkinLoading(true)
    setSkinError(null)
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const dataUrl = e.target?.result as string
        await viewerRef.current?.loadSkin(dataUrl)
        setUsername('')
        setSkinError(null)
      } catch (error) {
        console.error('Error loading skin file:', error)
        setSkinError('Invalid skin file')
      } finally {
        setSkinLoading(false)
      }
    }
    reader.onerror = () => {
      setSkinError('Failed to read file')
      setSkinLoading(false)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadSkinFromFile(file)
  }

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadSkinByUsername(username)
  }

  // Initialize viewer
  useEffect(() => {
    if (!containerRef.current) return

    const viewer = new skinview3d.SkinViewer({
      canvas: document.createElement('canvas'),
      width: 300,
      height: 400,
      skin: DEFAULT_SKIN_URL,
    })

    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(viewer.canvas)

    viewer.controls.enableRotate = true
    viewer.controls.enableZoom = true
    viewer.controls.enablePan = false
    viewer.camera.position.set(0, 0, -50)
    viewer.camera.lookAt(0, 0, 0)
    viewer.animation = new skinview3d.IdleAnimation()

    viewerRef.current = viewer
    setViewerReady(true)

    return () => {
      viewer.dispose()
      viewerRef.current = null
      setViewerReady(false)
    }
  }, [])

  // Update cape - triggered by viewerReady or canvasVersion change
  useEffect(() => {
    if (!viewerReady || !viewerRef.current || !capeCanvas) return

    const loadCape = () => {
      try {
        const capeDataUrl = capeCanvas.toDataURL('image/png')
        viewerRef.current?.loadCape(capeDataUrl, { backEquipment: showElytra ? 'elytra' : 'cape' })
      } catch (error) {
        console.error('Error loading cape:', error)
      }
    }

    // Try multiple times to ensure it loads
    loadCape()
    const timeoutId = setTimeout(loadCape, 50)
    
    return () => clearTimeout(timeoutId)
  }, [viewerReady, capeCanvas, canvasVersion, showElytra])

  return (
    <div className="viewer-3d">
      <div 
        ref={containerRef} 
        className="viewer-3d-canvas"
      />
      <div className="viewer-3d-options">
        <label className="elytra-toggle">
          <input
            type="checkbox"
            checked={showElytra}
            onChange={(e) => setShowElytra(e.target.checked)}
          />
          <span>Show Elytra</span>
        </label>
      </div>
      <div className="viewer-3d-skin">
        <form onSubmit={handleUsernameSubmit} className="skin-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="skin-input"
            disabled={skinLoading}
          />
          <button 
            type="submit" 
            className="skin-btn"
            disabled={skinLoading || !username.trim()}
          >
            {skinLoading ? '...' : 'Load'}
          </button>
        </form>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button 
          className="skin-upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={skinLoading}
        >
          Upload Skin
        </button>
        {skinError && <span className="skin-error">{skinError}</span>}
      </div>
    </div>
  )
}

export default CapePreview3D
