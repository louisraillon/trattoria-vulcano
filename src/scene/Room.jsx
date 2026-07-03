import { useMemo } from 'react'
import * as THREE from 'three'
import { useTiledTexture } from '../textures'

// plaster map is near-white: tint it down to smoke-stained warm dark
const PLASTER_TINT = '#4a3b30'
const PLASTER_TINT_LIGHT = '#5a4638'

// back wall with a big arched opening looking out at the volcano
// extrude UVs are in shape units (16×6), so it needs its own repeat scale
function ArchWall() {
  const wallMap = useTiledTexture('/tex/plaster.jpg', 0.25, 0.3)
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-8, 0)
    shape.lineTo(8, 0)
    shape.lineTo(8, 6)
    shape.lineTo(-8, 6)
    shape.closePath()

    const hole = new THREE.Path()
    const r = 2.4
    const cy = 2.6
    hole.moveTo(-r, 0)
    hole.lineTo(-r, cy)
    hole.absarc(0, cy, r, Math.PI, 0, true)
    hole.lineTo(r, 0)
    hole.closePath()
    shape.holes.push(hole)

    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.35, bevelEnabled: false })
    geo.translate(0, 0, -0.175)
    return geo
  }, [])

  return (
    <mesh geometry={geometry} position={[0, 0, -6]} receiveShadow>
      <meshStandardMaterial map={wallMap} color={PLASTER_TINT} roughness={0.95} />
    </mesh>
  )
}

export default function Room() {
  // CC0 ambientCG maps: Tiles012 (checker marble) + Plaster001
  const floorTex = useTiledTexture('/tex/floor.jpg', 4, 3.25)
  const plasterTex = useTiledTexture('/tex/plaster.jpg', 4, 1.8)

  return (
    <group>
      {/* checkerboard floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[16, 13]} />
        <meshStandardMaterial map={floorTex} roughness={0.55} />
      </mesh>

      <ArchWall />

      {/* side walls */}
      <mesh position={[-8, 3, -0.5]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[13, 6]} />
        <meshStandardMaterial map={plasterTex} color={PLASTER_TINT_LIGHT} roughness={0.95} />
      </mesh>
      <mesh position={[8, 3, -0.5]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[13, 6]} />
        <meshStandardMaterial map={plasterTex} color={PLASTER_TINT_LIGHT} roughness={0.95} />
      </mesh>

      {/* ceiling with exposed beams */}
      <mesh position={[0, 6, -0.5]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[16, 13]} />
        <meshStandardMaterial color='#191310' roughness={1} />
      </mesh>
      {[-5, -1.5, 2, 5.5].map((x) => (
        <mesh key={x} position={[x, 5.75, -0.5]}>
          <boxGeometry args={[0.35, 0.5, 13]} />
          <meshStandardMaterial color='#171008' roughness={0.9} />
        </mesh>
      ))}

      {/* lava-red baseboard stripe, loud graphic touch */}
      {[
        { pos: [-7.95, 0.35, -0.5], rot: Math.PI / 2 },
        { pos: [7.95, 0.35, -0.5], rot: -Math.PI / 2 },
      ].map(({ pos, rot }, i) => (
        <mesh key={i} position={pos} rotation-y={rot}>
          <planeGeometry args={[13, 0.7]} />
          <meshStandardMaterial color='#a02310' roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
