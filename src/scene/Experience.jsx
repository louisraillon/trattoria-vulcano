import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import CameraRig from './CameraRig'
import Room from './Room'
import Volcano from './Volcano'
import Oven from './Oven'
import Furniture from './Furniture'
import WineWall from './WineWall'
import Lamps from './Lamps'

export default function Experience({ onReady }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Canvas
      dpr={[1, isDesktop ? 2 : 1.5]}
      camera={{ fov: 50, near: 0.1, far: 120, position: [0, 2.2, 2.5] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <color attach='background' args={['#0a0705']} />
      <fog attach='fog' args={['#0a0705', 30, 90]} />

      <ambientLight intensity={0.25} color='#3a3040' />
      {/* moonlight through the arch */}
      <directionalLight position={[2, 10, -20]} intensity={0.5} color='#7a8aad' />

      <Suspense fallback={null}>
        <CameraRig />
        <Room />
        <Volcano />
        <Oven />
        <Furniture />
        <WineWall />
        <Lamps />
        <Stars radius={70} depth={30} count={isDesktop ? 1500 : 500} factor={3} fade speed={0.5} />
      </Suspense>

      {isDesktop && (
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.9} mipmapBlur />
          <Vignette darkness={0.55} offset={0.25} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
