import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useControls, button } from 'leva'
import HunyuanModel from './HunyuanModel'
import Room from './Room'
import Volcano from './Volcano'
import Oven from './Oven'
import Furniture from './Furniture'

// dev-only tuning stage: /?tune
// drag sliders, click "copy values", paste the JSON back in chat
export default function TuneScene() {
  const v = useControls('model', {
    px: { value: -5.5, min: -60, max: 60, step: 0.1 },
    py: { value: 1.3, min: -30, max: 30, step: 0.1 },
    pz: { value: -4.5, min: -80, max: 20, step: 0.1 },
    rx: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    ry: { value: 0.63, min: -Math.PI, max: Math.PI, step: 0.01 },
    rz: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    scale: { value: 3, min: 0.1, max: 80, step: 0.1 },
    showRoom: true,
    showProceduralVolcano: false,
    showProceduralOven: false,
  })

  useControls('actions', {
    'copy values': button(() => {
      const json = JSON.stringify(
        { position: [v.px, v.py, v.pz], rotation: [v.rx, v.ry, v.rz], scale: v.scale },
        null, 2
      )
      navigator.clipboard?.writeText(json)
      console.log('TUNE VALUES', json)
      alert('Copied:\n' + json)
    }),
  })

  return (
    <Canvas camera={{ fov: 50, position: [0, 4, 14], far: 300 }} dpr={[1, 2]}>
      <color attach='background' args={['#0a0705']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <pointLight position={[0, 3, 0]} color='#ffb347' intensity={2} />
      <Suspense fallback={null}>
        {v.showRoom && <Room />}
        {v.showRoom && <Furniture />}
        {v.showProceduralVolcano && <Volcano />}
        {v.showProceduralOven && <Oven />}
        <HunyuanModel
          position={[v.px, v.py, v.pz]}
          rotation={[v.rx, v.ry, v.rz]}
          scale={v.scale}
        />
      </Suspense>
      <Grid args={[40, 40]} sectionColor='#5c4a3a' cellColor='#2a2320' fadeDistance={60} />
      <OrbitControls makeDefault />
    </Canvas>
  )
}
