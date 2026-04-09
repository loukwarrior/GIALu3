'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic positions — no Math.random() to avoid hydration issues
const GRANOLA = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2 + i * 0.37
  const r = 0.15 + (i * 0.147 % 1.05) * 1.1
  return { x: Math.cos(a) * r, z: Math.sin(a) * r, s: 0.055 + (i * 0.033 % 0.045) }
})

const BLUEBERRIES = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + 0.3 + i * 0.21
  const r = 0.25 + (i * 0.153 % 0.85)
  return { x: Math.cos(a) * r, z: Math.sin(a) * r, s: 0.09 + (i * 0.021 % 0.05) }
})

const STRAWBERRIES = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 + 0.8
  const r = 0.4 + (i * 0.19 % 0.7)
  return { x: Math.cos(a) * r, z: Math.sin(a) * r, ry: i * 1.05 }
})

const BANANAS = Array.from({ length: 5 }, (_, i) => {
  const a = (i / 5) * Math.PI * 2 + 1.2
  const r = 0.5 + (i * 0.17 % 0.55)
  return { x: Math.cos(a) * r, z: Math.sin(a) * r }
})

function AcaiBowlMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.22
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={groupRef} scale={0.88}>
        {/* Bowl outer wall */}
        <mesh>
          <cylinderGeometry args={[1.9, 1.15, 1.3, 64, 1, true]} />
          <meshStandardMaterial
            color="#F5F0E8"
            side={THREE.DoubleSide}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
        {/* Bowl bottom */}
        <mesh position={[0, -0.65, 0]}>
          <circleGeometry args={[1.15, 64]} />
          <meshStandardMaterial color="#EDE5D8" roughness={0.3} />
        </mesh>
        {/* Bowl rim */}
        <mesh position={[0, 0.65, 0]}>
          <torusGeometry args={[1.9, 0.1, 16, 64]} />
          <meshStandardMaterial color="#EAD8BA" roughness={0.2} metalness={0.08} />
        </mesh>
        {/* Açaí base (dark purple) */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.72, 1.72, 0.6, 64]} />
          <meshStandardMaterial color="#2D1047" roughness={0.85} />
        </mesh>
        {/* Granola layer */}
        {GRANOLA.map((g, i) => (
          <mesh key={`g${i}`} position={[g.x, 0.43, g.z]}>
            <sphereGeometry args={[g.s, 8, 8]} />
            <meshStandardMaterial color="#C4913A" roughness={0.9} />
          </mesh>
        ))}
        {/* Blueberries */}
        {BLUEBERRIES.map((b, i) => (
          <mesh key={`b${i}`} position={[b.x, 0.55, b.z]}>
            <sphereGeometry args={[b.s, 16, 16]} />
            <meshStandardMaterial color="#3B1F8C" roughness={0.3} metalness={0.1} />
          </mesh>
        ))}
        {/* Strawberry pieces */}
        {STRAWBERRIES.map((s, i) => (
          <mesh key={`s${i}`} position={[s.x, 0.5, s.z]} rotation={[Math.PI / 2, 0, s.ry]}>
            <coneGeometry args={[0.17, 0.28, 8]} />
            <meshStandardMaterial color="#E8434A" roughness={0.6} />
          </mesh>
        ))}
        {/* Banana slices */}
        {BANANAS.map((b, i) => (
          <mesh key={`bn${i}`} position={[b.x, 0.48, b.z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.07, 16]} />
            <meshStandardMaterial color="#F5D547" roughness={0.7} />
          </mesh>
        ))}
        {/* Coconut flakes */}
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2 + 0.5
          const r = 0.2 + (i * 0.19 % 1.1)
          return (
            <mesh key={`c${i}`} position={[Math.cos(a) * r, 0.47, Math.sin(a) * r]} rotation={[Math.PI / 2, 0, a]}>
              <planeGeometry args={[0.22, 0.07]} />
              <meshStandardMaterial color="#F5EFE6" side={THREE.DoubleSide} roughness={0.8} />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

export default function Bowl3D() {
  return (
    <Canvas
      camera={{ position: [0, 2.8, 4.8], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} />
      <directionalLight position={[-4, 3, -4]} intensity={0.3} color="#84A98C" />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#D4A574" />
      <Suspense fallback={null}>
        <AcaiBowlMesh />
      </Suspense>
    </Canvas>
  )
}
