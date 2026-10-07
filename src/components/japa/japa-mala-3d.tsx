'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { type BeadMaterial } from '@/lib/japa-sound'
import { cn } from '@/lib/utils'
import { Sparkles, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface JapaMala3DProps {
  currentBead: number
  material: BeadMaterial
  onAdvanceBead: () => void
  tanpuraPlaying?: boolean
  justCounted?: boolean
  className?: string
}

// Material color and physical characteristics
const MATERIAL_SPECS: Record<
  BeadMaterial,
  {
    color: number
    roughness: number
    metalness: number
    transmission?: number
    clearcoat?: number
    emissive?: number
    specular?: number
  }
> = {
  tulsi: {
    color: 0xc89666, // Warm holy basil wood
    roughness: 0.55,
    metalness: 0.05,
    clearcoat: 0.2,
  },
  rudraksha: {
    color: 0x824424, // Deep auspicious rust terracotta
    roughness: 0.85,
    metalness: 0.08,
  },
  chandan: {
    color: 0xd9b382, // Sandalwood ivory gold
    roughness: 0.45,
    metalness: 0.04,
    clearcoat: 0.35,
  },
  sphatik: {
    color: 0xeef4f8, // Pure quartz crystal
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.75,
    clearcoat: 0.9,
  },
}

export function JapaMala3D({
  currentBead,
  material,
  onAdvanceBead,
  tanpuraPlaying = false,
  justCounted = false,
  className,
}: JapaMala3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mutable refs for Three.js objects
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null
    scene: THREE.Scene | null
    camera: THREE.PerspectiveCamera | null
    instancedMesh: THREE.InstancedMesh | null
    meruMesh: THREE.Group | null
    threadMesh: THREE.Mesh | null
    particles: THREE.Points | null
    pointLight: THREE.PointLight | null
    activeGlowLight: THREE.PointLight | null
    beadCurve: THREE.CatmullRomCurve3 | null
    beadPoints: THREE.Vector3[]
    currentRotation: number
    targetRotation: number
    dragStartX: number
    dragStartY: number
    isDragging: boolean
    hasMoved: boolean
    cameraAngleX: number
    cameraAngleY: number
    zoomDist: number
    animFrameId: number | null
  }>({
    renderer: null,
    scene: null,
    camera: null,
    instancedMesh: null,
    meruMesh: null,
    threadMesh: null,
    particles: null,
    pointLight: null,
    activeGlowLight: null,
    beadCurve: null,
    beadPoints: [],
    currentRotation: 0,
    targetRotation: 0,
    dragStartX: 0,
    dragStartY: 0,
    isDragging: false,
    hasMoved: false,
    cameraAngleX: 0.35,
    cameraAngleY: 0,
    zoomDist: 14,
    animFrameId: null,
  })

  // Sync target rotation when currentBead advances
  useEffect(() => {
    // 108 beads around a full circle
    const anglePerBead = (Math.PI * 2) / 108
    stateRef.current.targetRotation = currentBead * anglePerBead
  }, [currentBead])

  // Setup Three.js scene
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    stateRef.current.scene = scene

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(0, 3, stateRef.current.zoomDist)
    camera.lookAt(0, 0, 0)
    stateRef.current.camera = camera

    // 3. Renderer setup (GPU hardware acceleration, transparent background)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    stateRef.current.renderer = renderer

    // 4. Lighting setup (Sacred Temple Ambiance)
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.1)
    scene.add(ambientLight)

    // Warm golden top temple light
    const pointLight = new THREE.PointLight(0xffb74d, 2.4, 25)
    pointLight.position.set(0, 8, 6)
    scene.add(pointLight)
    stateRef.current.pointLight = pointLight

    // Cool rim light for spiritual depth
    const rimLight = new THREE.PointLight(0x64b5f6, 1.2, 20)
    rimLight.position.set(-6, -4, -6)
    scene.add(rimLight)

    // Active bead golden aura light
    const activeGlowLight = new THREE.PointLight(0xffd54f, 2.5, 5)
    scene.add(activeGlowLight)
    stateRef.current.activeGlowLight = activeGlowLight

    // 5. Generate 108 Bead 3D Curve (Realistic draped circular mala loop with gentle gravity sag)
    const radiusX = 4.8
    const radiusY = 5.2
    const beadPoints: THREE.Vector3[] = []

    for (let i = 0; i < 108; i++) {
      const theta = (i / 108) * Math.PI * 2
      // Subtle natural 3D wave so it feels like a real physical necklace in space
      const x = Math.sin(theta) * radiusX
      const y = Math.cos(theta) * radiusY
      const z = Math.sin(theta * 2) * 0.45
      beadPoints.push(new THREE.Vector3(x, y, z))
    }
    stateRef.current.beadPoints = beadPoints

    const curve = new THREE.CatmullRomCurve3(beadPoints, true)
    stateRef.current.beadCurve = curve

    // 6. Thread through all beads (Sacred silk thread)
    const threadGeo = new THREE.TubeGeometry(curve, 108, 0.04, 8, true)
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden silk
      roughness: 0.6,
      metalness: 0.1,
    })
    const threadMesh = new THREE.Mesh(threadGeo, threadMat)
    scene.add(threadMesh)
    stateRef.current.threadMesh = threadMesh

    // 7. Instanced Mesh for 108 Beads (Single GPU Draw Call = ZERO LAG)
    const beadGeo = new THREE.SphereGeometry(0.24, 24, 24)
    const beadMat = new THREE.MeshPhysicalMaterial({
      color: MATERIAL_SPECS[material].color,
      roughness: MATERIAL_SPECS[material].roughness,
      metalness: MATERIAL_SPECS[material].metalness,
      transmission: MATERIAL_SPECS[material].transmission || 0,
      clearcoat: MATERIAL_SPECS[material].clearcoat || 0,
      clearcoatRoughness: 0.1,
    })

    const instancedMesh = new THREE.InstancedMesh(beadGeo, beadMat, 108)
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(instancedMesh)
    stateRef.current.instancedMesh = instancedMesh

    // 8. Guru / Meru Bead at the Crest (Index 0 / Top)
    const meruGroup = new THREE.Group()
    
    // Main Meru body
    const meruBodyGeo = new THREE.SphereGeometry(0.42, 28, 28)
    const meruMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Radiant polished gold
      roughness: 0.25,
      metalness: 0.85,
    })
    const meruBody = new THREE.Mesh(meruBodyGeo, meruMat)
    meruGroup.add(meruBody)

    // Ornamental cone top
    const meruCapGeo = new THREE.ConeGeometry(0.22, 0.5, 16)
    const meruCap = new THREE.Mesh(meruCapGeo, meruMat)
    meruCap.position.y = 0.4
    meruGroup.add(meruCap)

    // Silk tassel threads
    const tasselGeo = new THREE.CylinderGeometry(0.08, 0.2, 0.9, 12)
    const tasselMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Sacred crimson saffron silk tassel
      roughness: 0.8,
    })
    const tassel = new THREE.Mesh(tasselGeo, tasselMat)
    tassel.position.y = -0.65
    meruGroup.add(tassel)

    scene.add(meruGroup)
    stateRef.current.meruMesh = meruGroup

    // 9. Floating Incense Embers / Temple Dust Particles
    const particleCount = 60
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14
      particlePositions[i + 1] = (Math.random() - 0.5) * 14
      particlePositions[i + 2] = (Math.random() - 0.5) * 8
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xffd54f,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)
    stateRef.current.particles = particles

    // 10. Animation & Render Loop
    let clock = new THREE.Clock()
    const dummyMatrix = new THREE.Matrix4()
    const dummyColor = new THREE.Color()

    const animate = () => {
      const state = stateRef.current
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth rotation glide toward target rotation
      state.currentRotation += (state.targetRotation - state.currentRotation) * 0.12

      // Position Camera based on user drag orbit angles
      const camDist = state.zoomDist
      const camY = Math.sin(state.cameraAngleX) * camDist
      const camXZ = Math.cos(state.cameraAngleX) * camDist
      camera.position.x = Math.sin(state.cameraAngleY) * camXZ
      camera.position.z = Math.cos(state.cameraAngleY) * camXZ
      camera.position.y = camY
      camera.lookAt(0, 0, 0)

      // Audio-reactive breathing of temple lights
      if (state.pointLight) {
        const pulse = tanpuraPlaying
          ? Math.sin(time * 2.5) * 0.5 + 2.4
          : Math.sin(time * 0.8) * 0.2 + 2.0
        state.pointLight.intensity = pulse
      }

      // Drift floating incense particles
      if (state.particles) {
        const positions = state.particles.geometry.attributes.position.array as Float32Array
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += delta * 0.35 // Drift upwards
          if (positions[i] > 8) positions[i] = -8
        }
        state.particles.geometry.attributes.position.needsUpdate = true
      }

      // Update 108 Bead Instance Transforms & Colors along rotated curve
      if (state.instancedMesh && state.beadCurve) {
        for (let i = 0; i < 108; i++) {
          // Offset theta by currentRotation
          const rawTheta = (i / 108) * Math.PI * 2
          const rotatedTheta = (rawTheta - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
          const point = state.beadCurve.getPoint(rotatedTheta / (Math.PI * 2))

          const isCurrent = i === currentBead
          const isQuarter = i === 27 || i === 54 || i === 81
          const isPassed = i < currentBead

          // Scale
          const baseScale = isCurrent ? 1.45 : isQuarter ? 1.25 : 1.0
          const bounceScale = isCurrent && justCounted ? baseScale * 1.2 : baseScale

          dummyMatrix.makeScale(bounceScale, bounceScale, bounceScale)
          dummyMatrix.setPosition(point.x, point.y, point.z)
          state.instancedMesh.setMatrixAt(i, dummyMatrix)

          // Color
          if (isCurrent) {
            dummyColor.setHex(0xf59e0b) // Radiant amber gold
          } else if (isPassed) {
            dummyColor.setHex(MATERIAL_SPECS[material].color)
          } else {
            dummyColor.setHex(0x555555) // Dim unchanted
          }
          state.instancedMesh.setColorAt(i, dummyColor)

          // Position active glow light right at the current chanting bead
          if (isCurrent && state.activeGlowLight) {
            state.activeGlowLight.position.copy(point)
            state.activeGlowLight.position.z += 0.8
            state.activeGlowLight.intensity = justCounted ? 4.5 : 2.0
          }
        }
        state.instancedMesh.instanceMatrix.needsUpdate = true
        if (state.instancedMesh.instanceColor) {
          state.instancedMesh.instanceColor.needsUpdate = true
        }
      }

      // Position Meru Bead at the top of the curve
      if (state.meruMesh && state.beadCurve) {
        const meruTheta = (0 - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
        const meruPt = state.beadCurve.getPoint(meruTheta / (Math.PI * 2))
        state.meruMesh.position.set(meruPt.x, meruPt.y + 0.3, meruPt.z)
      }

      renderer.render(scene, camera)
      state.animFrameId = requestAnimationFrame(animate)
    }

    stateRef.current.animFrameId = requestAnimationFrame(animate)

    // Handle container resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId)
      }
      scene.clear()
      renderer.dispose()
    }
  }, [material])

  // Mouse & Touch Orbit Controls (360° Drag & Tap)
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true
    stateRef.current.hasMoved = false
    stateRef.current.dragStartX = e.clientX
    stateRef.current.dragStartY = e.clientY
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return
    const dx = e.clientX - stateRef.current.dragStartX
    const dy = e.clientY - stateRef.current.dragStartY

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      stateRef.current.hasMoved = true
    }

    stateRef.current.cameraAngleY += dx * 0.007
    stateRef.current.cameraAngleX = Math.max(
      -0.6,
      Math.min(1.2, stateRef.current.cameraAngleX + dy * 0.007)
    )

    stateRef.current.dragStartX = e.clientX
    stateRef.current.dragStartY = e.clientY
  }

  const handlePointerUp = () => {
    stateRef.current.isDragging = false
    // If pointer was clicked without dragging, advance bead!
    if (!stateRef.current.hasMoved) {
      onAdvanceBead()
    }
  }

  // Camera reset
  const resetCamera = () => {
    stateRef.current.cameraAngleX = 0.35
    stateRef.current.cameraAngleY = 0
    stateRef.current.zoomDist = 14
  }

  const zoomCamera = (delta: number) => {
    stateRef.current.zoomDist = Math.max(8, Math.min(22, stateRef.current.zoomDist + delta))
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        stateRef.current.isDragging = false
        setIsHovered(false)
      }}
      onPointerEnter={() => setIsHovered(true)}
      className={cn(
        'relative w-full aspect-square max-w-[440px] mx-auto select-none touch-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden',
        className
      )}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating 3D Navigation Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation()
            zoomCamera(-2)
          }}
          title="Zoom In"
          className="w-7 h-7 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer shadow-xs"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            zoomCamera(2)
          }}
          title="Zoom Out"
          className="w-7 h-7 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer shadow-xs"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            resetCamera()
          }}
          title="Reset 3D View"
          className="w-7 h-7 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Tactile Hub inside the 3D loop */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onAdvanceBead()
        }}
        className={cn(
          'absolute inset-0 m-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center bg-card/65 backdrop-blur-md border shadow-lg cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all group pointer-events-auto z-10',
          justCounted
            ? 'border-emerald-500 shadow-emerald-500/30 ring-4 ring-emerald-500/20 scale-105'
            : 'border-primary/30'
        )}
      >
        <span className="text-[9px] uppercase font-bold tracking-widest text-primary/80 mb-0.5">
          Chant
        </span>
        <div
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          {currentBead}
        </div>
        <div className="text-[10px] text-muted-foreground font-medium">
          of 108
        </div>
      </div>

      {/* Bottom Center 3D Gesture Hint */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-md border border-border/40 text-[10px] text-muted-foreground/80 flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Click to roll bead · Drag to rotate 3D strand</span>
        </div>
      </div>
    </div>
  )
}
