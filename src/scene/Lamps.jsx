// hanging cone lamps over the tables
function Lamp({ position, color = '#ffb347' }) {
  const [x, , z] = position
  return (
    <group>
      {/* cord */}
      <mesh position={[x, 4.85, z]}>
        <cylinderGeometry args={[0.015, 0.015, 2.1, 6]} />
        <meshStandardMaterial color='#0d0a08' roughness={1} />
      </mesh>
      {/* shade */}
      <mesh position={[x, 3.75, z]}>
        <coneGeometry args={[0.35, 0.4, 18, 1, true]} />
        <meshStandardMaterial color='#a02310' roughness={0.6} side={2} />
      </mesh>
      {/* bulb */}
      <mesh position={[x, 3.68, z]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={3} color={color} toneMapped={false} />
      </mesh>
      <pointLight position={[x, 3.5, z]} color={color} intensity={2.4} distance={7} decay={1.6} />
    </group>
  )
}

export default function Lamps() {
  return (
    <group>
      <Lamp position={[1.5, 0, -1]} />
      <Lamp position={[-4.2, 0, -2.2]} />
      <Lamp position={[5.3, 0, -3]} />
    </group>
  )
}
