import { useStore } from '../store'

// cursor-follow label when hovering a 3D dish
export default function DishTip() {
  const tip = useStore((s) => s.tip)
  if (!tip) return null
  return (
    <div className='dish-tip' style={{ left: tip.x, top: tip.y }} role='status'>
      {tip.label}
    </div>
  )
}
