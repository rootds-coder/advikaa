import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 800 }) {
  const meshRef = useRef()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Kumkum red and kesar gold only — soft warm palette
    const kumkum = new THREE.Color('#E6A3A8')   // soft rose
    const kesar   = new THREE.Color('#F3CFA7')  // soft gold
    const warm    = new THREE.Color('#B63A45')  // deeper rose

    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = Math.random()
      const col = c < 0.45 ? kumkum : c < 0.75 ? kesar : warm
      colors[i * 3]     = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }
    return [positions, colors]
  }, [count])

  useFrame((s) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = s.clock.elapsedTime * 0.025
      meshRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.018) * 0.08
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}
