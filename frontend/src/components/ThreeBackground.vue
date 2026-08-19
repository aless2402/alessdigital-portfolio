<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let renderer, animId, resizeHandler, disposers = []

async function init() {
  // three.js se importa dinámicamente: solo se descarga en la página de contacto,
  // no engorda el bundle del resto del sitio.
  const THREE = await import('three')

  const canvas = canvasRef.value
  if (!canvas) return
  const parent = canvas.parentElement

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    55,
    parent.offsetWidth / parent.offsetHeight,
    0.1,
    1000
  )
  camera.position.z = 24

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(parent.offsetWidth, parent.offsetHeight)

  const group = new THREE.Group()
  scene.add(group)

  // Nube de puntos
  const COUNT = 110
  const positions = []
  const nodes = []
  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * 32
    const y = (Math.random() - 0.5) * 22
    const z = (Math.random() - 0.5) * 18
    positions.push(x, y, z)
    nodes.push(new THREE.Vector3(x, y, z))
  }

  const pointsGeometry = new THREE.BufferGeometry()
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xf5d8a8,
    size: 0.22,
    transparent: true,
    opacity: 0.9
  })
  const points = new THREE.Points(pointsGeometry, pointsMaterial)
  group.add(points)

  // Líneas entre nodos cercanos (efecto red / plexus)
  const linePositions = []
  const maxDist = 6.5
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x8a5cff,
    transparent: true,
    opacity: 0.15
  })
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  group.add(lines)

  resizeHandler = () => {
    const w = parent.offsetWidth
    const h = parent.offsetHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', resizeHandler)

  function animate() {
    group.rotation.y += 0.0009
    group.rotation.x += 0.00025
    renderer.render(scene, camera)
    if (!reduceMotion) animId = requestAnimationFrame(animate)
  }
  animate()

  disposers = [
    () => pointsGeometry.dispose(),
    () => pointsMaterial.dispose(),
    () => lineGeometry.dispose(),
    () => lineMaterial.dispose(),
    () => renderer.dispose()
  ]
}

onMounted(init)

onBeforeUnmount(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (animId) cancelAnimationFrame(animId)
  disposers.forEach((dispose) => dispose())
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
</template>
