import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function EmbryoModel({ activeDay = 1 }) {
  const groupRef = useRef()
  const shellRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Gentle rotation of the entire embryo
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08
    }

    // Smoothly expand/morph the outer protective shell (Zona Pellucida) for Day 5 (Blastocyst)
    if (shellRef.current) {
      const targetShellScale = activeDay === 5 ? 1.08 : 1.0
      const currentScale = shellRef.current.scale.x
      const nextScale = THREE.MathUtils.lerp(currentScale, targetShellScale, 0.08)
      shellRef.current.scale.setScalar(nextScale)
    }
  })

  return (
    <Float
      speed={1.5} 
      rotationIntensity={0.4} 
      floatIntensity={1.5}
    >
      <group ref={groupRef} scale={1.35}>
        {/* Outer Protective Shell (Zona Pellucida) */}
        <mesh ref={shellRef}>
          <sphereGeometry args={[2.0, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.55}
            chromaticAberration={0.06}
            anisotropy={0.12}
            distortion={0.08}
            distortionScale={0.45}
            temporalDistortion={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.12}
            roughness={0.18}
            transmission={0.92}
            opacity={activeDay === 5 ? 0.22 : 0.32} // Thins out as blastocyst expands
            transparent={true}
            color="#FFF2F6"
          />
        </mesh>

        {/* Dynamic Multiplying Cells (Morula / Blastocyst Stage) */}
        <CellCluster activeDay={activeDay} />

        {/* Floating supportive proteins / micro-particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <mesh 
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 4.0,
              (Math.random() - 0.5) * 4.0,
              (Math.random() - 0.5) * 4.0
            ]}
            scale={Math.random() * 0.05 + 0.02}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#D58F4B" emissive="#D58F4B" emissiveIntensity={0.4} transparent opacity={0.75} />
          </mesh>
        ))}

        {/* Lighting — warm and directional */}
        <ambientLight intensity={0.7} color="#FFF6F2" />
        <pointLight position={[3, 5, 3]} intensity={4.0} color="#FFE8DC" />
        <pointLight position={[-3, -2, -2]} intensity={1.8} color="#D58F4B" />
        <pointLight position={[0, -5, 2]} intensity={1.2} color="#B63A45" />
      </group>
    </Float>
  )
}

function CellCluster({ activeDay }) {
  const clusterRef = useRef()

  // Pre-calculate stable, beautiful, biologically correct positions for all 5 stages
  const cells = useMemo(() => {
    const arr = []
    const count = 60 // maximum capacity for blastocyst stage

    // Day 3 (8-cell cleavage) cube vertices with organic offset
    const day3Pos = [
      new THREE.Vector3(-0.48, -0.48, -0.48),
      new THREE.Vector3(0.48, -0.48, -0.48),
      new THREE.Vector3(-0.48, 0.48, -0.48),
      new THREE.Vector3(0.48, 0.48, -0.48),
      new THREE.Vector3(-0.48, -0.48, 0.48),
      new THREE.Vector3(0.48, -0.48, 0.48),
      new THREE.Vector3(-0.48, 0.48, 0.48),
      new THREE.Vector3(0.48, 0.48, 0.48)
    ]

    // Day 4 (Morula) positions packed tightly in r=1.05
    const day4Pos = []
    for (let i = 0; i < 24; i++) {
      const r = 0.95 * Math.cbrt((i + 1) / 24)
      const theta = i * 2.39996 // Golden angle in radians
      const phi = Math.acos(1 - 2 * (i + 0.5) / 24)
      day4Pos.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }

    // Day 5 (Blastocyst) positions:
    // - Index 0 to 11: Inner Cell Mass (ICM) clustered tightly on the top-right interior
    const day5Pos = []
    for (let i = 0; i < 12; i++) {
      const r = 0.42 * Math.cbrt((i + 1) / 12)
      const theta = i * 2.39996
      const phi = Math.acos(1 - 2 * (i + 0.5) / 12)
      day5Pos.push(new THREE.Vector3(
        0.78 + r * Math.sin(phi) * Math.cos(theta),
        0.78 + r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }
    // - Index 12 to 51: Trophoblast outer surface cells mapped onto sphere (r = 1.58)
    const trophoCount = 40
    for (let i = 0; i < trophoCount; i++) {
      const y = 1 - (i / (trophoCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y) * 1.58
      const theta = i * 2.39996
      day5Pos.push(new THREE.Vector3(
        Math.cos(theta) * radius,
        y * 1.58,
        Math.sin(theta) * radius
      ))
    }

    // Set configuration maps for smooth interpolations
    for (let i = 0; i < count; i++) {
      arr.push({
        // Day 1: Zygote (Single massive cell)
        p1: new THREE.Vector3(0, 0, 0),
        s1: i === 0 ? 1.25 : 0,

        // Day 2: 2-Cell Split
        p2: i === 0 ? new THREE.Vector3(-0.58, 0, 0) : (i === 1 ? new THREE.Vector3(0.58, 0, 0) : new THREE.Vector3(0, 0, 0)),
        s2: i < 2 ? 0.88 : 0,

        // Day 3: 8-Cell Cleavage
        p3: i < 8 ? day3Pos[i] : new THREE.Vector3(0, 0, 0),
        s3: i < 8 ? 0.56 : 0,

        // Day 4: Morula (Packed ball)
        p4: i < 24 ? day4Pos[i] : new THREE.Vector3(0, 0, 0),
        s4: i < 24 ? 0.38 : 0,

        // Day 5: Blastocyst (Core ICM + Outer Trophoblast)
        p5: i < 52 ? day5Pos[i] : new THREE.Vector3(0, 0, 0),
        s5: i < 12 ? 0.28 : (i < 52 ? 0.16 : 0)
      })
    }
    return arr
  }, [])

  // Initialize cells instantly on mount or transition to prevent flashes
  useEffect(() => {
    if (clusterRef.current) {
      clusterRef.current.children.forEach((mesh, i) => {
        const data = cells[i]
        const targetScale = activeDay === 1 ? data.s1 : activeDay === 2 ? data.s2 : activeDay === 3 ? data.s3 : activeDay === 4 ? data.s4 : data.s5
        mesh.scale.setScalar(targetScale)
        const targetPos = activeDay === 1 ? data.p1 : activeDay === 2 ? data.p2 : activeDay === 3 ? data.p3 : activeDay === 4 ? data.p4 : data.p5
        mesh.position.copy(targetPos)
      })
    }
  }, [activeDay, cells])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const speed = 0.085 // Lerp speed for smooth fluid transitions

    if (clusterRef.current) {
      clusterRef.current.children.forEach((mesh, i) => {
        const data = cells[i]
        
        let targetPos = data.p1
        let targetScale = data.s1

        if (activeDay === 1) {
          targetPos = data.p1
          targetScale = data.s1
        } else if (activeDay === 2) {
          targetPos = data.p2
          targetScale = data.s2
        } else if (activeDay === 3) {
          targetPos = data.p3
          targetScale = data.s3
        } else if (activeDay === 4) {
          targetPos = data.p4
          targetScale = data.s4
        } else if (activeDay === 5) {
          targetPos = data.p5
          targetScale = data.s5
        }

        // Smoothly interpolate position towards target
        mesh.position.lerp(targetPos, speed)

        // Add small, natural organic bubbling drift to active cells
        if (targetScale > 0) {
          const driftX = Math.sin(t * 1.6 + i) * 0.005
          const driftY = Math.cos(t * 1.8 + i) * 0.005
          const driftZ = Math.sin(t * 1.4 + i) * 0.005
          mesh.position.x += driftX
          mesh.position.y += driftY
          mesh.position.z += driftZ
        }

        // Smoothly interpolate scale
        const currentScale = mesh.scale.x
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, speed)
        mesh.scale.setScalar(nextScale)
      })
    }
  })

  return (
    <group ref={clusterRef}>
      {cells.map((_, i) => (
        <mesh key={`cell-${i}`}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={i < 12 && activeDay === 5 ? "#E37A84" : "#B63A45"} // Highlight ICM slightly for Day 5
            roughness={0.22}
            metalness={0.12}
            emissive={i < 12 && activeDay === 5 ? "#7E1922" : "#5E0C13"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}
