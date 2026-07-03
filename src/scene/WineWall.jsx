import { useMemo } from 'react'
import * as THREE from 'three'

const BOTTLE_COLORS = ['#1e3020', '#28401e', '#3a1a1a', '#1a2a3a']

// wine rack along the right wall
export default function WineWall() {
  const bottles = useMemo(() => {
    const list = []
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 9; col++) {
        list.push({
          pos: [0, 0.62 + row * 0.72, -4.3 + col * 0.42],
          color: BOTTLE_COLORS[(row * 3 + col) % BOTTLE_COLORS.length],
          lean: (Math.sin(row * 7 + col * 13) * 0.06),
        })
      }
    }
    return list
  }, [])

  return (
    <group position={[7.55, 0, -1]}>
      {/* shelves */}
      {[0.5, 1.22, 1.94, 2.66, 3.38].map((y) => (
        <mesh key={y} position={[0, y, -2.4]}>
          <boxGeometry args={[0.6, 0.07, 4.6]} />
          <meshStandardMaterial color='#3a241a' roughness={0.9} />
        </mesh>
      ))}
      {/* uprights */}
      {[-4.6, -0.2].map((z) => (
        <mesh key={z} position={[0, 1.95, z]}>
          <boxGeometry args={[0.6, 3.1, 0.09]} />
          <meshStandardMaterial color='#3a241a' roughness={0.9} />
        </mesh>
      ))}
      {/* bottles */}
      {bottles.map((b, i) => (
        <group key={i} position={b.pos} rotation-z={b.lean}>
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.5, 10]} />
            <meshStandardMaterial color={b.color} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.57, 0]}>
            <cylinderGeometry args={[0.025, 0.065, 0.16, 10]} />
            <meshStandardMaterial color={b.color} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
