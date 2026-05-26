import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DNAHelix from './DNAHelix'

export default function DNAScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#e8a0a0" />
      <pointLight position={[-3, -3, -3]} intensity={1.5} color="#7ecdc4" />
      <Suspense fallback={null}>
        <DNAHelix position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  )
}
