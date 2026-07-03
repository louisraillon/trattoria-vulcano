import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

// shared hover wrapper: syncs with the DOM menu list + cursor tooltip
function Dish({ id, label, children, ...props }) {
  const group = useRef()

  useFrame((_, delta) => {
    const { hoveredDish } = useStore.getState()
    const target = hoveredDish === id ? 1.15 : 1
    const s = group.current.scale.x
    group.current.scale.setScalar(s + (target - s) * Math.min(1, 8 * delta))
  })

  const over = (e) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
    useStore.getState().setHoveredDish(id)
    useStore.getState().setTip({ label, x: e.clientX, y: e.clientY })
  }
  const move = (e) => {
    useStore.getState().setTip({ label, x: e.clientX, y: e.clientY })
  }
  const out = () => {
    document.body.style.cursor = ''
    useStore.getState().setHoveredDish(null)
    useStore.getState().setTip(null)
  }

  return (
    <group ref={group} onPointerOver={over} onPointerMove={move} onPointerOut={out} {...props}>
      {children}
    </group>
  )
}

export function Pizza(props) {
  return (
    <Dish id='pizza' label='Pizza Etna' {...props}>
      {/* base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 24]} />
        <meshStandardMaterial color='#e8b84b' roughness={0.8} />
      </mesh>
      {/* sauce */}
      <mesh position={[0, 0.062, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 24]} />
        <meshStandardMaterial color='#b3220e' roughness={0.7} />
      </mesh>
      {/* crust */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.4, 0.05, 10, 24]} />
        <meshStandardMaterial color='#d99a3d' roughness={0.85} />
      </mesh>
      {/* basil + mozzarella */}
      {[[0.15, 0.1], [-0.12, -0.14], [0.02, 0.2], [-0.2, 0.05], [0.18, -0.18]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.085, z]}>
          <cylinderGeometry args={[0.055, 0.055, 0.02, 10]} />
          <meshStandardMaterial color={i % 2 ? '#f4ebdc' : '#5c8a3c'} roughness={0.6} />
        </mesh>
      ))}
    </Dish>
  )
}

export function Spaghetti(props) {
  return (
    <Dish id='spaghetti' label='Spaghetti al Nero' {...props}>
      {/* bowl */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.32, 0.2, 0.16, 20]} />
        <meshStandardMaterial color='#f4ebdc' roughness={0.4} />
      </mesh>
      {/* pasta tangle */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.18, 0]} rotation={[i * 1.1, i * 0.8, i * 0.5]}>
          <torusKnotGeometry args={[0.14, 0.028, 48, 8, 2 + i, 3]} />
          <meshStandardMaterial color='#1c1714' roughness={0.5} />
        </mesh>
      ))}
      {/* gambero */}
      <mesh position={[0.08, 0.26, 0.05]} rotation={[0.4, 0, 0.8]}>
        <capsuleGeometry args={[0.035, 0.08, 4, 8]} />
        <meshStandardMaterial color='#ff7a5c' roughness={0.55} />
      </mesh>
    </Dish>
  )
}

export function Wine(props) {
  return (
    <Dish id='vino' label="Rosso dell'Etna" {...props}>
      {/* bottle */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.55, 14]} />
          <meshStandardMaterial color='#1e3020' roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.63, 0]}>
          <cylinderGeometry args={[0.028, 0.075, 0.18, 14]} />
          <meshStandardMaterial color='#1e3020' roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.42, 0.086]}>
          <planeGeometry args={[0.12, 0.16]} />
          <meshStandardMaterial color='#f4ebdc' roughness={0.7} />
        </mesh>
      </group>
      {/* glass */}
      <group position={[0.32, 0, 0.1]}>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.02, 0.06, 0.12, 10]} />
          <meshStandardMaterial color='#d8d3c8' transparent opacity={0.35} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <sphereGeometry args={[0.09, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
          <meshStandardMaterial color='#d8d3c8' transparent opacity={0.35} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <sphereGeometry args={[0.075, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color='#6e1423' roughness={0.2} />
        </mesh>
      </group>
    </Dish>
  )
}

export function Arancini(props) {
  return (
    <Dish id='arancini' label='Arancini di Lava' {...props}>
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 20]} />
        <meshStandardMaterial color='#f4ebdc' roughness={0.4} />
      </mesh>
      {[[-0.1, 0.06], [0.12, 0.02], [0.0, -0.12]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.14, z]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          <meshStandardMaterial color='#d98a2b' roughness={0.9} />
        </mesh>
      ))}
    </Dish>
  )
}
