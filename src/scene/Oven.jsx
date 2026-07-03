import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Embers from './Embers'
import HunyuanModel from './HunyuanModel'

// Hunyuan-3D oven mesh placement inside the group (tuned via /?tune)
const MODEL = { position: [0, 1.3, 0], rotation: [0, 0, 0], scale: 3 }

// wood-fired pizza oven, the indoor "crater"
export default function Oven() {
  const fireLight = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const flicker = Math.sin(t * 11) * 0.4 + Math.sin(t * 23) * 0.25 + Math.random() * 0.3
    if (fireLight.current) fireLight.current.intensity = 2.2 + flicker
  })

  return (
    <group position={[-5.5, 0, -4.5]} rotation-y={Math.PI / 5}>
      {/* Hunyuan-generated oven body (fire is baked into the model's mouth) */}
      <HunyuanModel position={MODEL.position} rotation={MODEL.rotation} scale={MODEL.scale} />

      <pointLight ref={fireLight} position={[0, 1.3, 1.5]} color='#ff6a1a' intensity={3.2} distance={9} />
      <Embers center={[0, 1.2, 1.1]} count={30} spread={0.5} height={1.6} speed={0.8} size={0.14} />

      {/* stacked firewood */}
      {[[-1.55, 0.18, 0.8], [-1.55, 0.18, 0.45], [-1.55, 0.5, 0.62]].map((p, i) => (
        <mesh key={i} position={p} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.14, 0.14, 0.9, 8]} />
          <meshStandardMaterial color='#6b4423' roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
