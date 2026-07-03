import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

// camera path through the trattoria, one keyframe per section
const POSITIONS = [
  new THREE.Vector3(0, 2.2, 2.5),    // hero — facing the arch + volcano
  new THREE.Vector3(4.8, 2.9, 4.6),  // storia — wide corner view
  new THREE.Vector3(2.9, 1.7, 1.0),  // menu — leaning over the hero table
  new THREE.Vector3(-2.2, 1.9, -1.2),// forno — walking to the oven
  new THREE.Vector3(3.8, 1.9, -0.6), // vini — wine wall
  new THREE.Vector3(0, 3.4, 5.8),    // prenota — wide central pullback
]
const TARGETS = [
  new THREE.Vector3(0, 2.8, -40),
  new THREE.Vector3(-2, 1.4, -4),
  new THREE.Vector3(1.5, 0.85, -1),
  new THREE.Vector3(-5.5, 1.3, -4.5),
  new THREE.Vector3(7.6, 1.9, -2.5),
  new THREE.Vector3(0, 1.8, -8),
]

export default function CameraRig() {
  const camera = useThree((s) => s.camera)
  const posCurve = useMemo(() => new THREE.CatmullRomCurve3(POSITIONS, false, 'centripetal'), [])
  const tgtCurve = useMemo(() => new THREE.CatmullRomCurve3(TARGETS, false, 'centripetal'), [])

  const smoothT = useRef(0)
  const pos = useRef(new THREE.Vector3())
  const tgt = useRef(new THREE.Vector3())
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    const { scroll, erupting, reducedMotion } = useStore.getState()
    const dt = Math.min(delta, 0.05)

    // critically-damped-ish approach toward the scroll position
    const k = reducedMotion ? 30 : 4.5
    smoothT.current += (scroll - smoothT.current) * Math.min(1, k * dt)
    const t = THREE.MathUtils.clamp(smoothT.current, 0, 1)

    posCurve.getPoint(t, pos.current)
    tgtCurve.getPoint(t, tgt.current)

    // pointer parallax
    if (!reducedMotion) {
      mouse.current.x += (state.pointer.x - mouse.current.x) * 3 * dt
      mouse.current.y += (state.pointer.y - mouse.current.y) * 3 * dt
      pos.current.x += mouse.current.x * 0.35
      pos.current.y += mouse.current.y * 0.2
    }

    // eruption shake
    if (erupting) {
      const s = 0.05
      pos.current.x += (Math.random() - 0.5) * s
      pos.current.y += (Math.random() - 0.5) * s
    }

    camera.position.copy(pos.current)
    camera.lookAt(tgt.current)
  })

  return null
}
