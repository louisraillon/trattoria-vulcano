import { useMemo } from 'react'
import { ginghamTexture, useTiledTexture } from '../textures'
import { Pizza, Spaghetti, Wine, Arancini } from './Dishes'

function Chair({ position, rotation = 0 }) {
  return (
    <group position={position} rotation-y={rotation}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
        <meshStandardMaterial color='#6b4423' roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.78, -0.19]}>
        <boxGeometry args={[0.42, 0.6, 0.05]} />
        <meshStandardMaterial color='#6b4423' roughness={0.9} />
      </mesh>
      {[[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 8]} />
          <meshStandardMaterial color='#54351c' roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Table({ position, radius = 0.8, cloth = false, children }) {
  const tex = useMemo(() => (cloth ? ginghamTexture(5) : null), [cloth])
  const woodTex = useTiledTexture('/tex/wood.jpg', 1, 1)
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[radius, radius, 0.06, 24]} />
        {cloth
          ? <meshStandardMaterial map={tex} roughness={0.8} />
          : <meshStandardMaterial map={woodTex} color='#8a6a4a' roughness={0.85} />}
      </mesh>
      {cloth && (
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[radius + 0.04, radius - 0.1, 0.14, 24, 1, true]} />
          <meshStandardMaterial map={tex} roughness={0.8} side={2} />
        </mesh>
      )}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.75, 10]} />
        <meshStandardMaterial color='#2a1a0e' roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.05, 16]} />
        <meshStandardMaterial color='#2a1a0e' roughness={0.9} />
      </mesh>
      <group position={[0, 0.78, 0]}>{children}</group>
    </group>
  )
}

export default function Furniture() {
  return (
    <group>
      {/* hero table with the interactive dishes */}
      <Table position={[1.5, 0, -1]} radius={1.05} cloth>
        <Pizza position={[-0.35, 0, -0.25]} />
        <Spaghetti position={[0.4, 0, -0.35]} />
        <Wine position={[0.05, 0, 0.35]} rotation-y={-0.6} />
        <Arancini position={[-0.55, 0, 0.4]} />
      </Table>
      <Chair position={[0.3, 0, -2]} rotation={0.5} />
      <Chair position={[2.7, 0, -1.6]} rotation={-1.2} />
      <Chair position={[1.7, 0, 0.3]} rotation={2.8} />

      {/* background tables */}
      <Table position={[-4.2, 0, -2.2]} />
      <Chair position={[-5.1, 0, -2.5]} rotation={1.4} />
      <Chair position={[-3.4, 0, -1.6]} rotation={-2.4} />

      <Table position={[-2.2, 0, 2.2]} />
      <Chair position={[-3, 0, 2.6]} rotation={1.1} />

      <Table position={[5.3, 0, -3]} />
      <Chair position={[6.1, 0, -2.6]} rotation={-1.8} />
      <Chair position={[4.6, 0, -3.9]} rotation={0.4} />
    </group>
  )
}
