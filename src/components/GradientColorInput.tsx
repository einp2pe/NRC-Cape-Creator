import { FC } from 'react'

interface GradientColorInputProps {
  index: number
  color: string
  totalColors: number
  onColorChange: (color: string) => void
  onRemove: () => void
}

const GradientColorInput: FC<GradientColorInputProps> = ({
  index,
  color,
  totalColors,
  onColorChange,
  onRemove,
}) => {
  return (
    <div className="grad-row">
      <label>{index + 1}. Farbe</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
      {totalColors > 1 && (
        <button type="button" onClick={onRemove}>
          ✕
        </button>
      )}
    </div>
  )
}

export default GradientColorInput
