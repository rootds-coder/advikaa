import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import EmbryoModel from './EmbryoModel'
import ParticleField from './ParticleField'

export default function HeroScene({ activeDay = 1 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Warm ambient for light theme */}
      <ambientLight intensity={1.2} color="#FFF5EE" />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFE8D6" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#D58F4B" />

      <Suspense fallback={null}>
        <ParticleField count={700} />
        <EmbryoModel activeDay={activeDay} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3}
        enableDamping
        dampingFactor={0.04}
      />
    </Canvas>
  )
}
