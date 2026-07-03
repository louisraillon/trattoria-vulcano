import { useGLTF } from '@react-three/drei'

// Hunyuan-3D generated mesh (simplified to 40k tris, 2048 jpg texture)
export default function HunyuanModel({ url = '/models/hunyuan.glb', ...props }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/models/hunyuan.glb')
