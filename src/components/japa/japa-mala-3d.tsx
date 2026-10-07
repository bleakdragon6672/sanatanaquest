'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { type BeadMaterial } from '@/lib/japa-sound'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Eye,
  Camera,
  Layers,
} from 'lucide-react'

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
    bumpScale: number
  }
> = {
  tulsi: {
    color: 0xc89666, // Warm holy basil wood
    roughness: 0.65,
    metalness: 0.04,
    clearcoat: 0.15,
    bumpScale: 0.025,
  },
  rudraksha: {
    color: 0x823b1e, // Deep authentic terracotta rust
    roughness: 0.9,
    metalness: 0.06,
    bumpScale: 0.075,
  },
  chandan: {
    color: 0xdeb887, // Sandalwood ivory gold
    roughness: 0.48,
    metalness: 0.03,
    clearcoat: 0.35,
    bumpScale: 0.015,
  },
  sphatik: {
    color: 0xf0f7fc, // Pure quartz crystal
    roughness: 0.08,
    metalness: 0.05,
    transmission: 0.85,
    clearcoat: 1.0,
    bumpScale: 0.02,
  },
}

// Generate procedural procedural textures and bump maps in memory (0 network lag)
function generateBeadTextures(type: BeadMaterial): {
  map: THREE.CanvasTexture | null
  bumpMap: THREE.CanvasTexture | null
} {
  if (typeof document === 'undefined') return { map: null, bumpMap: null }

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = 256
  bumpCanvas.height = 256
  const bumpCtx = bumpCanvas.getContext('2d')

  if (!ctx || !bumpCtx) return { map: null, bumpMap: null }

  if (type === 'rudraksha') {
    // Terracotta base
    ctx.fillStyle = '#7a3318'
    ctx.fillRect(0, 0, 256, 256)

    bumpCtx.fillStyle = '#808080'
    bumpCtx.fillRect(0, 0, 256, 256)

    // 5-Mukhi prominent vertical furrow clefts
    for (let f = 0; f < 5; f++) {
      const x = Math.round((f / 5) * 256 + 25) % 256

      ctx.fillStyle = '#331006'
      ctx.fillRect(x - 5, 0, 10, 256)
      ctx.fillStyle = '#180501'
      ctx.fillRect(x - 2, 0, 4, 256)

      bumpCtx.fillStyle = '#202020'
      bumpCtx.fillRect(x - 5, 0, 10, 256)
      bumpCtx.fillStyle = '#050505'
      bumpCtx.fillRect(x - 2, 0, 4, 256)
    }

    // Rugged surface ridges
    for (let i = 0; i < 450; i++) {
      const rx = Math.random() * 256
      const ry = Math.random() * 256
      const rad = Math.random() * 5 + 1.5
      const isHigh = Math.random() > 0.45
      ctx.fillStyle = isHigh ? '#9e4420' : '#4d1908'
      ctx.beginPath()
      ctx.arc(rx, ry, rad, 0, Math.PI * 2)
      ctx.fill()

      bumpCtx.fillStyle = isHigh ? '#d8d8d8' : '#383838'
      bumpCtx.beginPath()
      bumpCtx.arc(rx, ry, rad, 0, Math.PI * 2)
      bumpCtx.fill()
    }
  } else if (type === 'tulsi') {
    // Sacred Tulsi wood grain
    ctx.fillStyle = '#C89666'
    ctx.fillRect(0, 0, 256, 256)

    bumpCtx.fillStyle = '#808080'
    bumpCtx.fillRect(0, 0, 256, 256)

    for (let y = 0; y < 256; y += 3) {
      const alpha = Math.sin(y * 0.12) * 0.22 + 0.15
      ctx.fillStyle = `rgba(120, 75, 38, ${alpha})`
      ctx.fillRect(0, y, 256, Math.random() * 2 + 1)

      const bVal = Math.floor(128 + Math.sin(y * 0.12) * 45)
      bumpCtx.fillStyle = `rgb(${bVal},${bVal},${bVal})`
      bumpCtx.fillRect(0, y, 256, 2)
    }

    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = 'rgba(80, 45, 20, 0.3)'
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.5, Math.random() * 3 + 1)
    }
  } else if (type === 'chandan') {
    // Silky Sandalwood
    ctx.fillStyle = '#D9B382'
    ctx.fillRect(0, 0, 256, 256)

    bumpCtx.fillStyle = '#808080'
    bumpCtx.fillRect(0, 0, 256, 256)

    for (let y = 0; y < 256; y += 4) {
      const alpha = Math.sin(y * 0.08) * 0.09 + 0.05
      ctx.fillStyle = `rgba(240, 215, 175, ${alpha})`
      ctx.fillRect(0, y, 256, 2)
    }
  } else {
    // Sphatik quartz
    ctx.fillStyle = '#F2F8FC'
    ctx.fillRect(0, 0, 256, 256)

    bumpCtx.fillStyle = '#808080'
    bumpCtx.fillRect(0, 0, 256, 256)

    for (let i = 0; i < 25; i++) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.lineWidth = Math.random() * 2 + 1
      ctx.beginPath()
      ctx.moveTo(Math.random() * 256, Math.random() * 256)
      ctx.lineTo(Math.random() * 256, Math.random() * 256)
      ctx.stroke()
    }
  }

  const map = new THREE.CanvasTexture(canvas)
  map.wrapS = THREE.RepeatWrapping
  map.wrapT = THREE.RepeatWrapping

  const bumpMap = new THREE.CanvasTexture(bumpCanvas)
  bumpMap.wrapS = THREE.RepeatWrapping
  bumpMap.wrapT = THREE.RepeatWrapping

  return { map, bumpMap }
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
  const [viewPreset, setViewPreset] = useState<'normal' | 'macro' | 'altar'>('normal')

  // Mutable refs for Three.js objects
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null
    scene: THREE.Scene | null
    camera: THREE.PerspectiveCamera | null
    instancedMesh: THREE.InstancedMesh | null
    knotsMesh: THREE.InstancedMesh | null
    meruMesh: THREE.Group | null
    tasselMesh: THREE.Mesh | null
    mandalaGroup: THREE.Group | null
    threadMesh: THREE.Mesh | null
    particles: THREE.Points | null
    sparkParticles: THREE.Points | null
    sparkVelocities: THREE.Vector3[]
    pointLight: THREE.PointLight | null
    flameLight: THREE.PointLight | null
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
    targetAngleX: number
    targetAngleY: number
    zoomDist: number
    targetZoom: number
    animFrameId: number | null
  }>({
    renderer: null,
    scene: null,
    camera: null,
    instancedMesh: null,
    knotsMesh: null,
    meruMesh: null,
    tasselMesh: null,
    mandalaGroup: null,
    threadMesh: null,
    particles: null,
    sparkParticles: null,
    sparkVelocities: [],
    pointLight: null,
    flameLight: null,
    activeGlowLight: null,
    beadCurve: null,
    beadPoints: [],
    currentRotation: 0,
    targetRotation: 0,
    dragStartX: 0,
    dragStartY: 0,
    isDragging: false,
    hasMoved: false,
    cameraAngleX: 0.32,
    cameraAngleY: 0,
    targetAngleX: 0.32,
    targetAngleY: 0,
    zoomDist: 14,
    targetZoom: 14,
    animFrameId: null,
  })

  // Sync target rotation when currentBead advances
  useEffect(() => {
    const anglePerBead = (Math.PI * 2) / 108
    stateRef.current.targetRotation = currentBead * anglePerBead
  }, [currentBead])

  // Trigger prana spark burst on count
  useEffect(() => {
    if (justCounted && stateRef.current.sparkParticles) {
      const sparks = stateRef.current.sparkParticles
      const positions = sparks.geometry.attributes.position.array as Float32Array
      // Reset sparks to current active bead position
      const state = stateRef.current
      if (state.beadCurve) {
        const theta = ((currentBead / 108) * Math.PI * 2 - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
        const pt = state.beadCurve.getPoint(theta / (Math.PI * 2))

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = pt.x
          positions[i + 1] = pt.y
          positions[i + 2] = pt.z + 0.1
        }
        sparks.geometry.attributes.position.needsUpdate = true
      }
    }
  }, [justCounted, currentBead])

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

    // 3. Renderer setup (GPU hardware acceleration)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    stateRef.current.renderer = renderer

    // 4. Lighting setup (Sacred Temple Diya Ambiance)
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.15)
    scene.add(ambientLight)

    // Warm golden top sanctuary light
    const pointLight = new THREE.PointLight(0xffb74d, 2.5, 28)
    pointLight.position.set(0, 8, 7)
    scene.add(pointLight)
    stateRef.current.pointLight = pointLight

    // Flickering Diya (oil lamp) warm fire light
    const flameLight = new THREE.PointLight(0xff7700, 1.4, 18)
    flameLight.position.set(4, -3, 5)
    scene.add(flameLight)
    stateRef.current.flameLight = flameLight

    // Cool celestial rim light
    const rimLight = new THREE.PointLight(0x64b5f6, 1.1, 22)
    rimLight.position.set(-6, -4, -6)
    scene.add(rimLight)

    // Active bead golden aura light
    const activeGlowLight = new THREE.PointLight(0xffd54f, 2.8, 6)
    scene.add(activeGlowLight)
    stateRef.current.activeGlowLight = activeGlowLight

    // 5. Generate 108 Bead 3D Natural Loop
    const radiusX = 4.8
    const radiusY = 5.2
    const beadPoints: THREE.Vector3[] = []

    for (let i = 0; i < 108; i++) {
      const theta = (i / 108) * Math.PI * 2
      const x = Math.sin(theta) * radiusX
      const y = Math.cos(theta) * radiusY
      const z = Math.sin(theta * 2) * 0.45
      beadPoints.push(new THREE.Vector3(x, y, z))
    }
    stateRef.current.beadPoints = beadPoints

    const curve = new THREE.CatmullRomCurve3(beadPoints, true)
    stateRef.current.beadCurve = curve

    // 6. Thread through all beads (Sacred golden silk thread)
    const threadGeo = new THREE.TubeGeometry(curve, 108, 0.045, 8, true)
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden silk
      roughness: 0.5,
      metalness: 0.25,
    })
    const threadMesh = new THREE.Mesh(threadGeo, threadMat)
    scene.add(threadMesh)
    stateRef.current.threadMesh = threadMesh

    // 7. Instanced Mesh for 108 Beads with Procedural Bump Textures
    const { map, bumpMap } = generateBeadTextures(material)

    // Geometry: faceted crystal for Sphatik, smooth sphere for woods
    const beadGeo =
      material === 'sphatik'
        ? new THREE.IcosahedronGeometry(0.25, 2)
        : new THREE.SphereGeometry(0.24, 28, 28)

    const beadMat = new THREE.MeshPhysicalMaterial({
      color: MATERIAL_SPECS[material].color,
      roughness: MATERIAL_SPECS[material].roughness,
      metalness: MATERIAL_SPECS[material].metalness,
      transmission: MATERIAL_SPECS[material].transmission || 0,
      clearcoat: MATERIAL_SPECS[material].clearcoat || 0,
      clearcoatRoughness: 0.1,
      map: map || undefined,
      bumpMap: bumpMap || undefined,
      bumpScale: MATERIAL_SPECS[material].bumpScale,
      flatShading: material === 'sphatik',
    })

    const instancedMesh = new THREE.InstancedMesh(beadGeo, beadMat, 108)
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(instancedMesh)
    stateRef.current.instancedMesh = instancedMesh

    // 8. Sacred Silk Knots (Granthi) between EVERY bead
    const knotGeo = new THREE.SphereGeometry(0.065, 12, 12)
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Hand-tied golden silk knot
      roughness: 0.6,
      metalness: 0.35,
    })
    const knotsMesh = new THREE.InstancedMesh(knotGeo, knotMat, 108)
    knotsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(knotsMesh)
    stateRef.current.knotsMesh = knotsMesh

    // 9. Consecrated Meru (Guru) Bead & Swaying Silk Tassel
    const meruGroup = new THREE.Group()

    // Spherical golden crown bead
    const meruBodyGeo = new THREE.SphereGeometry(0.44, 32, 32)
    const meruMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Radiant polished gold
      roughness: 0.22,
      metalness: 0.88,
    })
    const meruBody = new THREE.Mesh(meruBodyGeo, meruMat)
    meruGroup.add(meruBody)

    // Ornamental embossed gold filigree ring
    const meruRingGeo = new THREE.TorusGeometry(0.42, 0.05, 12, 32)
    const meruRing = new THREE.Mesh(meruRingGeo, meruMat)
    meruGroup.add(meruRing)

    // Conical finial cap
    const meruCapGeo = new THREE.ConeGeometry(0.24, 0.55, 18)
    const meruCap = new THREE.Mesh(meruCapGeo, meruMat)
    meruCap.position.y = 0.44
    meruGroup.add(meruCap)

    // Sacred Zari metallic knot ring
    const zariGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 18)
    const zari = new THREE.Mesh(zariGeo, meruMat)
    zari.position.y = -0.42
    meruGroup.add(zari)

    // Multi-strand cascading silk tassel
    const tasselGeo = new THREE.CylinderGeometry(0.14, 0.3, 1.1, 16)
    const tasselMat = new THREE.MeshStandardMaterial({
      color: 0xd92626, // Sacred crimson saffron silk tassel
      roughness: 0.85,
    })
    const tassel = new THREE.Mesh(tasselGeo, tasselMat)
    tassel.position.y = -0.98
    meruGroup.add(tassel)
    stateRef.current.tasselMesh = tassel

    scene.add(meruGroup)
    stateRef.current.meruMesh = meruGroup

    // 10. Background 3D Sacred Sri Yantra / Lotus Wireframe Mandala
    const mandalaGroup = new THREE.Group()
    mandalaGroup.position.set(0, 0, -2.8)

    const innerRing = new THREE.RingGeometry(1.8, 1.83, 64)
    const mandalaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    })
    mandalaGroup.add(new THREE.Mesh(innerRing, mandalaMat))

    const outerRing = new THREE.RingGeometry(3.6, 3.63, 64)
    mandalaGroup.add(new THREE.Mesh(outerRing, mandalaMat))

    // 8 Sacred Lotus Petals
    for (let p = 0; p < 8; p++) {
      const pAngle = (p / 8) * Math.PI * 2
      const petalGeo = new THREE.BufferGeometry()
      const tipX = Math.cos(pAngle) * 3.5
      const tipY = Math.sin(pAngle) * 3.5
      const b1X = Math.cos(pAngle - 0.22) * 1.8
      const b1Y = Math.sin(pAngle - 0.22) * 1.8
      const b2X = Math.cos(pAngle + 0.22) * 1.8
      const b2Y = Math.sin(pAngle + 0.22) * 1.8

      const petalVerts = new Float32Array([
        b1X, b1Y, 0, tipX, tipY, 0,
        tipX, tipY, 0, b2X, b2Y, 0,
        b2X, b2Y, 0, b1X, b1Y, 0,
      ])
      petalGeo.setAttribute('position', new THREE.BufferAttribute(petalVerts, 3))
      mandalaGroup.add(new THREE.LineSegments(petalGeo, mandalaMat))
    }
    scene.add(mandalaGroup)
    stateRef.current.mandalaGroup = mandalaGroup

    // 11. Floating Incense Embers / Temple Atmosphere Particles
    const particleCount = 70
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
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)
    stateRef.current.particles = particles

    // 12. Chant Prana Spark Particle Burst System
    const sparkCount = 24
    const sparkGeo = new THREE.BufferGeometry()
    const sparkPositions = new Float32Array(sparkCount * 3)
    const sparkVelocities: THREE.Vector3[] = []

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = 0
      sparkPositions[i * 3 + 1] = 0
      sparkPositions[i * 3 + 2] = 0

      sparkVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 1.8,
          (Math.random() - 0.5) * 1.8
        )
      )
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))

    const sparkMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.14,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat)
    scene.add(sparkParticles)
    stateRef.current.sparkParticles = sparkParticles
    stateRef.current.sparkVelocities = sparkVelocities

    // 13. High-Performance Render Loop
    let clock = new THREE.Clock()
    const dummyMatrix = new THREE.Matrix4()
    const dummyColor = new THREE.Color()

    const animate = () => {
      const state = stateRef.current
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth rotation glide toward target rotation
      const rotDiff = state.targetRotation - state.currentRotation
      state.currentRotation += rotDiff * 0.12

      // Smooth camera interpolation for orbit & view presets
      state.cameraAngleX += (state.targetAngleX - state.cameraAngleX) * 0.1
      state.cameraAngleY += (state.targetAngleY - state.cameraAngleY) * 0.1
      state.zoomDist += (state.targetZoom - state.zoomDist) * 0.1

      const camDist = state.zoomDist
      const camY = Math.sin(state.cameraAngleX) * camDist
      const camXZ = Math.cos(state.cameraAngleX) * camDist
      camera.position.x = Math.sin(state.cameraAngleY) * camXZ
      camera.position.z = Math.cos(state.cameraAngleY) * camXZ
      camera.position.y = camY
      camera.lookAt(0, 0, 0)

      // Audio-reactive breathing of temple lights & Diya flicker
      if (state.pointLight) {
        const pulse = tanpuraPlaying
          ? Math.sin(time * 2.5) * 0.5 + 2.5
          : Math.sin(time * 0.8) * 0.2 + 2.2
        state.pointLight.intensity = pulse
      }

      if (state.flameLight) {
        // Natural candle / Diya flame flicker
        state.flameLight.intensity = 1.3 + Math.sin(time * 12) * 0.18 + Math.cos(time * 23) * 0.12
      }

      // Rotate background Sacred Lotus Mandala
      if (state.mandalaGroup) {
        state.mandalaGroup.rotation.z += 0.0015
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

      // Animate chant prana spark particles
      if (state.sparkParticles) {
        const sPos = state.sparkParticles.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < sparkCount; i++) {
          const vel = state.sparkVelocities[i]
          sPos[i * 3] += vel.x * delta * 2
          sPos[i * 3 + 1] += vel.y * delta * 2
          sPos[i * 3 + 2] += vel.z * delta * 2
        }
        state.sparkParticles.geometry.attributes.position.needsUpdate = true
      }

      // Gentle momentum sway on silk tassel
      if (state.tasselMesh) {
        const swayAngle = Math.sin(time * 2.2) * 0.08 + Math.sin(rotDiff * 4) * 0.15
        state.tasselMesh.rotation.z = swayAngle
      }

      // Update 108 Bead Instance Transforms & Colors along rotated curve
      if (state.instancedMesh && state.beadCurve) {
        for (let i = 0; i < 108; i++) {
          const rawTheta = (i / 108) * Math.PI * 2
          const rotatedTheta = (rawTheta - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
          const point = state.beadCurve.getPoint(rotatedTheta / (Math.PI * 2))

          const isCurrent = i === currentBead
          const isQuarter = i === 27 || i === 54 || i === 81
          const isPassed = i < currentBead

          // Scale
          const baseScale = isCurrent ? 1.45 : isQuarter ? 1.25 : 1.0
          const bounceScale = isCurrent && justCounted ? baseScale * 1.25 : baseScale

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

      // Update 108 Sacred Hand-Tied Knots (Granthi)
      if (state.knotsMesh && state.beadCurve) {
        for (let i = 0; i < 108; i++) {
          const rawTheta = ((i + 0.5) / 108) * Math.PI * 2
          const rotatedTheta = (rawTheta - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
          const knotPt = state.beadCurve.getPoint(rotatedTheta / (Math.PI * 2))

          dummyMatrix.makeScale(1.0, 1.0, 1.0)
          dummyMatrix.setPosition(knotPt.x, knotPt.y, knotPt.z)
          state.knotsMesh.setMatrixAt(i, dummyMatrix)
        }
        state.knotsMesh.instanceMatrix.needsUpdate = true
      }

      // Position Meru Bead at the top of the curve
      if (state.meruMesh && state.beadCurve) {
        const meruTheta = (0 - state.currentRotation + Math.PI * 2) % (Math.PI * 2)
        const meruPt = state.beadCurve.getPoint(meruTheta / (Math.PI * 2))
        state.meruMesh.position.set(meruPt.x, meruPt.y + 0.32, meruPt.z)
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

    stateRef.current.targetAngleY += dx * 0.007
    stateRef.current.targetAngleX = Math.max(
      -0.6,
      Math.min(1.2, stateRef.current.targetAngleX + dy * 0.007)
    )

    stateRef.current.dragStartX = e.clientX
    stateRef.current.dragStartY = e.clientY
  }

  const handlePointerUp = () => {
    stateRef.current.isDragging = false
    // If clicked without dragging, advance bead!
    if (!stateRef.current.hasMoved) {
      onAdvanceBead()
    }
  }

  // Camera presets
  const applyPreset = (preset: 'normal' | 'macro' | 'altar') => {
    setViewPreset(preset)
    if (preset === 'normal') {
      stateRef.current.targetAngleX = 0.32
      stateRef.current.targetAngleY = 0
      stateRef.current.targetZoom = 14
    } else if (preset === 'macro') {
      stateRef.current.targetAngleX = 0.15
      stateRef.current.targetAngleY = 0
      stateRef.current.targetZoom = 8.5
    } else if (preset === 'altar') {
      stateRef.current.targetAngleX = -0.35
      stateRef.current.targetAngleY = 0.25
      stateRef.current.targetZoom = 15
    }
  }

  const zoomCamera = (delta: number) => {
    stateRef.current.targetZoom = Math.max(7, Math.min(22, stateRef.current.targetZoom + delta))
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        stateRef.current.isDragging = false
      }}
      className={cn(
        'relative w-full aspect-square max-w-[450px] mx-auto select-none touch-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden',
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
            applyPreset('normal')
          }}
          title="Reset 3D View"
          className="w-7 h-7 rounded-xl bg-card/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Left Camera Presets Bar */}
      <div className="absolute top-3 left-3 flex items-center gap-1 z-10 bg-card/75 backdrop-blur-md p-1 rounded-xl border border-border/60 shadow-xs">
        {[
          { id: 'normal', label: 'Strand', icon: Eye },
          { id: 'macro', label: 'Macro', icon: Camera },
          { id: 'altar', label: 'Altar', icon: Layers },
        ].map((p) => {
          const IconComp = p.icon
          const isAct = viewPreset === p.id
          return (
            <button
              key={p.id}
              onClick={(e) => {
                e.stopPropagation()
                applyPreset(p.id as 'normal' | 'macro' | 'altar')
              }}
              className={cn(
                'px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer flex items-center gap-1',
                isAct
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <IconComp className="w-2.5 h-2.5" />
              <span>{p.label}</span>
            </button>
          )
        })}
      </div>

      {/* Center Tactile Hub inside the 3D loop */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onAdvanceBead()
        }}
        className={cn(
          'absolute inset-0 m-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center bg-card/70 backdrop-blur-md border shadow-lg cursor-pointer hover:scale-[1.05] active:scale-[0.95] transition-all group pointer-events-auto z-10',
          justCounted
            ? 'border-emerald-500 shadow-emerald-500/30 ring-4 ring-emerald-500/20 scale-105'
            : 'border-primary/35'
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
        <div className="px-3 py-1 rounded-full bg-card/85 backdrop-blur-md border border-border/40 text-[10px] text-muted-foreground/90 flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Tap to roll bead · Drag to orbit 3D strand</span>
        </div>
      </div>
    </div>
  )
}
