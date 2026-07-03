import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { glowTexture } from '../textures'
import { useStore } from '../store'

// drifting ember particles (volcano crater, oven mouth)
export default function Embers({
  center = [0, 0, 0],
  count = 120,
  spread = 3,
  height = 8,
  speed = 1,
  size = 0.35,
  boostOnEruption = false,
}) {
  const points = useRef()
  const tex = useMemo(() => glowTexture(), [])

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = Math.random() * height
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      seeds[i] = Math.random()
    }
    return { positions, seeds }
  }, [count, spread, height])

  useFrame((state, delta) => {
    const { erupting } = useStore.getState()
    const boost = boostOnEruption && erupting ? 4 : 1
    const dt = Math.min(delta, 0.05)
    const arr = points.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const seed = data.seeds[i]
      arr[i * 3 + 1] += dt * speed * boost * (0.4 + seed)
      arr[i * 3] += Math.sin(t * (1 + seed) + seed * 20) * dt * 0.15
      if (arr[i * 3 + 1] > height) {
        arr[i * 3 + 1] = 0
        arr[i * 3] = (Math.random() - 0.5) * spread
        arr[i * 3 + 2] = (Math.random() - 0.5) * spread
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} position={center} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        color='#ff7a1a'
        size={size}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}
