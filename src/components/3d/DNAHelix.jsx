import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DNAHelix({ position = [0, 0, 0] }) {
  const groupRef = useRef()
  const particlesRef = useRef([])

  const {
    curve1,
    curve2,
    rungs,
    particles
  } = useMemo(() => {
    const turns = 3.0             // 3 full turns
    const count = 100             // backbone sample points for high resolution curves
    const rungCount = 22          // number of base pair rungs
    const particleCount = 60      // local floating micro-particles
    const radius = 1.05           // radius of the helix
    const height = 7.5            // total Y-axis height
    const offset = 2.3            // ~132 degrees offset for realistic major/minor grooves

    // 1. Generate Backbone Points & Curves
    const points1 = []
    const points2 = []

    for (let i = 0; i <= count; i++) {
      const u = i / count
      const t = u * Math.PI * 2 * turns
      const y = u * height - height / 2

      // Strand 1
      const x1 = Math.cos(t) * radius
      const z1 = Math.sin(t) * radius
      points1.push(new THREE.Vector3(x1, y, z1))

      // Strand 2 (offset for major & minor groove asymmetry)
      const x2 = Math.cos(t + offset) * radius
      const z2 = Math.sin(t + offset) * radius
      points2.push(new THREE.Vector3(x2, y, z2))
    }

    const curve1 = new THREE.CatmullRomCurve3(points1)
    const curve2 = new THREE.CatmullRomCurve3(points2)

    // 2. Generate Rungs (Base Pairs: Adenine, Thymine, Cytosine, Guanine)
    // Desaturated desaturated standard colors for elegant high-tech feel:
    const colors = {
      adenine: '#2EB872',  // Biology Green
      thymine: '#D92027',  // Biology Red
      cytosine: '#1D80E2', // Biology Blue
      guanine: '#F7B614',  // Biology Yellow/Orange
    }

    const rungsList = []
    for (let i = 0; i < rungCount; i++) {
      const u = i / (rungCount - 1)
      const p1 = curve1.getPointAt(u)
      const p2 = curve2.getPointAt(u)
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5)

      // Alternating base pairs (0: A-T, 1: T-A, 2: C-G, 3: G-C)
      const pairType = i % 4
      let color1, color2
      if (pairType === 0) {
        color1 = colors.adenine
        color2 = colors.thymine
      } else if (pairType === 1) {
        color1 = colors.thymine
        color2 = colors.adenine
      } else if (pairType === 2) {
        color1 = colors.cytosine
        color2 = colors.guanine
      } else {
        color1 = colors.guanine
        color2 = colors.cytosine
      }

      // Half-rung 1 (Strand 1 to mid)
      const dir1 = new THREE.Vector3().subVectors(mid, p1)
      const len1 = dir1.length()
      const center1 = new THREE.Vector3().addVectors(p1, dir1.clone().multiplyScalar(0.5))
      const q1 = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir1.clone().normalize()
      )

      // Half-rung 2 (Strand 2 to mid)
      const dir2 = new THREE.Vector3().subVectors(mid, p2)
      const len2 = dir2.length()
      const center2 = new THREE.Vector3().addVectors(p2, dir2.clone().multiplyScalar(0.5))
      const q2 = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir2.clone().normalize()
      )

      rungsList.push({
        p1,
        p2,
        mid,
        center1,
        center2,
        len1,
        len2,
        q1,
        q2,
        color1,
        color2,
      })
    }

    // 3. Generate local orbiting micro-particles (tiny glittering energy sparks)
    const particlesList = []
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random()
      const t = u * Math.PI * 2 * turns + (Math.random() - 0.5) * 2.0
      const y = u * height - height / 2 + (Math.random() - 0.5) * 0.5
      const r = radius * (1.15 + Math.random() * 0.45)
      const x = Math.cos(t) * r
      const z = Math.sin(t) * r

      particlesList.push({
        position: new THREE.Vector3(x, y, z),
        scale: Math.random() * 0.015 + 0.008, // extremely tiny, desaturated stardust sparks
        speed: Math.random() * 0.6 + 0.3,
        offset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.45 ? '#D58F4B' : '#B63A45', // brand highlights
      })
    }

    return {
      curve1,
      curve2,
      rungs: rungsList,
      particles: particlesList,
    }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // 1. Slow steady Y-rotation + breathing floating movement
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.22
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.12
    }

    // 2. Orbiting movement for the local energy particles
    particlesRef.current.forEach((mesh, idx) => {
      if (mesh) {
        const p = particles[idx]
        const wave = Math.sin(time * p.speed + p.offset)
        mesh.position.y = p.position.y + wave * 0.18
        mesh.position.x = p.position.x + Math.cos(time * 0.4 + p.offset) * 0.06
        mesh.position.z = p.position.z + Math.sin(time * 0.4 + p.offset) * 0.06
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {/* ─── STRAND 1 BACKBONE (Kumkum Red Ribbon) ─── */}
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.085, 20, false]} />
        <meshPhysicalMaterial
          color="#8B111B"
          roughness={0.12}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          emissive="#4a0409"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ─── STRAND 2 BACKBONE (Kesar Gold Ribbon) ─── */}
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.085, 20, false]} />
        <meshPhysicalMaterial
          color="#D58F4B"
          roughness={0.12}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          emissive="#522a04"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ─── COMPLEMENTARY BASE PAIR RUNGS (FLUSH & GLOWING GLASS) ─── */}
      {rungs.map((rung, i) => {
        return (
          <group key={`rung-group-${i}`}>
            {/* Base Pair 1 Cylinder Half */}
            <mesh position={[rung.center1.x, rung.center1.y, rung.center1.z]} quaternion={rung.q1}>
              <cylinderGeometry args={[0.038, 0.038, rung.len1, 12]} />
              <meshPhysicalMaterial
                color={rung.color1}
                roughness={0.1}
                metalness={0.1}
                transmission={0.65}
                thickness={0.8}
                clearcoat={1.0}
                emissive={rung.color1}
                emissiveIntensity={0.65}
              />
            </mesh>

            {/* Base Pair 2 Cylinder Half */}
            <mesh position={[rung.center2.x, rung.center2.y, rung.center2.z]} quaternion={rung.q2}>
              <cylinderGeometry args={[0.038, 0.038, rung.len2, 12]} />
              <meshPhysicalMaterial
                color={rung.color2}
                roughness={0.1}
                metalness={0.1}
                transmission={0.65}
                thickness={0.8}
                clearcoat={1.0}
                emissive={rung.color2}
                emissiveIntensity={0.65}
              />
            </mesh>
          </group>
        )
      })}

      {/* ─── FLOATING TINY ENERGY MICRO-SPARKS ─── */}
      {particles.map((p, i) => (
        <mesh
          key={`micro-p-${i}`}
          ref={(el) => (particlesRef.current[i] = el)}
          position={[p.position.x, p.position.y, p.position.z]}
          scale={p.scale}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
