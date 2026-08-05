<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let ctx, w, h, nodes, animId
const colors = ['#e91e8c', '#3b7dff', '#4fd6ff', '#f5d8a8']
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initNodes() {
  const count = Math.max(18, Math.floor((w * h) / 45000))
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 2 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  }))
}

function resize() {
  const canvas = canvasRef.value
  const parent = canvas.parentElement
  w = canvas.width = parent.offsetWidth
  h = canvas.height = parent.offsetHeight
  initNodes()
}

function step() {
  ctx.clearRect(0, 0, w, h)
  const maxDist = Math.min(180, w * 0.18)

  for (const n of nodes) {
    n.x += n.vx
    n.y += n.vy
    if (n.x < 0 || n.x > w) n.vx *= -1
    if (n.y < 0 || n.y > h) n.vy *= -1
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j]
      const dx = a.x - b.x, dy = a.y - b.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < maxDist) {
        ctx.strokeStyle = a.color
        ctx.globalAlpha = (1 - dist / maxDist) * 0.35
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  ctx.globalAlpha = 1
  for (const n of nodes) {
    ctx.fillStyle = n.color
    ctx.beginPath()
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
    ctx.fill()
  }

  if (!reduceMotion) animId = requestAnimationFrame(step)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  step()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
</template>
