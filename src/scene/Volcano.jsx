import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Embers from './Embers'
import { useStore } from '../store'

// stylized volcano seen through the arch window — clickable, it erupts
export default function Volcano() {
  const craterLight = useRef()
  const craterGlow = useRef()
  const eruptTimer = useRef(0)

  const handleClick = (e) => {
    e.stopPropagation()
    const { erupting, setErupting } = useStore.getState()
    if (!erupting) {
      setErupting(true)
      eruptTimer.current = 2.5
    }
  }

  useFrame((state, delta) => {
    const { erupting, setErupting } = useStore.getState()
    if (erupting) {
      eruptTimer.current -= delta
      if (eruptTimer.current <= 0) setErupting(false)
    }
    const base = erupting ? 14 : 5
    const flicker = Math.sin(state.clock.elapsedTime * 8) * 0.6 + Math.random() * 0.5
    if (craterLight.current) craterLight.current.intensity = base + flicker
    if (craterGlow.current) {
      craterGlow.current.material.emissiveIntensity = (erupting ? 6 : 2.5) + flicker * 0.3
    }
  })

  return (
    <group position={[0, -1.5, -42]}>
      {/* cone body */}
      <mesh
        position={[0, 7, 0]}
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = '' }}
      >
        <coneGeometry args={[13, 14, 32]} />
        <meshStandardMaterial color='#171310' roughness={1} flatShading />
      </mesh>

      {/* crater glow disc */}
      <mesh ref={craterGlow} position={[0, 14.05, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[2.4, 24]} />
        <meshStandardMaterial
          color='#ff4d00'
          emissive='#ff4d00'
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* lava streaks hugging the cone slope (cone: base r=13 at y=0, apex y=14) */}
      {[0.3, 1.4, 2.6, 4.2, 5.3].map((a, i) => {
        const yCenter = 10.6 - (i % 3) * 0.8
        const surfaceR = 13 * (1 - yCenter / 14) + 0.15
        const slope = Math.atan(13 / 14)
        return (
          <group key={i} rotation-y={a}>
            <mesh position={[0, yCenter, surfaceR]} rotation-x={-slope}>
              <boxGeometry args={[0.32, 3.5 + (i % 3) * 1.2, 0.12]} />
              <meshStandardMaterial
                color='#ff4d00'
                emissive='#ff3000'
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          </group>
        )
      })}

      <pointLight ref={craterLight} position={[0, 15.5, 0]} color='#ff5a1a' intensity={5} distance={60} />

      {/* crater embers */}
      <Embers center={[0, 14, 0]} count={140} spread={3.5} height={10} speed={2.2} size={0.6} boostOnEruption />

      {/* smoke puffs */}
      <Smoke />
    </group>
  )
}

function Smoke() {
  const group = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current.children.forEach((m, i) => {
      const p = ((t * 0.25 + i / 3) % 1)
      m.position.y = 15 + p * 9
      m.position.x = Math.sin(t * 0.4 + i * 2) * (1 + p * 2)
      const s = 1.5 + p * 4
      m.scale.setScalar(s)
      m.material.opacity = 0.25 * (1 - p)
    })
  })
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color='#3a2f28' transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
