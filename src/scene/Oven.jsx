import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Embers from './Embers'

// wood-fired pizza oven, the indoor "crater"
export default function Oven() {
  const fireLight = useRef()
  const fire = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const flicker = Math.sin(t * 11) * 0.4 + Math.sin(t * 23) * 0.25 + Math.random() * 0.3
    if (fireLight.current) fireLight.current.intensity = 3.2 + flicker
    if (fire.current) fire.current.material.emissiveIntensity = 2.6 + flicker
  })

  return (
    <group position={[-5.5, 0, -4.5]} rotation-y={Math.PI / 5}>
      {/* brick base */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[2.6, 1.1, 2.2]} />
        <meshStandardMaterial color='#4a2c1c' roughness={0.9} />
      </mesh>
      {/* dome */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[1.25, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color='#5a3423' roughness={0.85} />
      </mesh>
      {/* mouth arch */}
      <mesh position={[0, 1.28, 1.02]}>
        <torusGeometry args={[0.55, 0.14, 10, 16, Math.PI]} />
        <meshStandardMaterial color='#31201a' roughness={0.9} />
      </mesh>
      {/* glowing mouth */}
      <mesh ref={fire} position={[0, 1.15, 1.06]}>
        <circleGeometry args={[0.52, 20]} />
        <meshStandardMaterial
          color='#ff6a00'
          emissive='#ff5500'
          emissiveIntensity={2.6}
          toneMapped={false}
        />
      </mesh>
      {/* chimney */}
      <mesh position={[0, 2.9, -0.4]}>
        <boxGeometry args={[0.5, 1.6, 0.5]} />
        <meshStandardMaterial color='#3a241a' roughness={0.9} />
      </mesh>

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
