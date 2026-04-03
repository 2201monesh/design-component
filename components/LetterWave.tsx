'use client'
import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'

interface Particle {
  char: string
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
}

const FONT_SIZE = 13
const COL_GAP = 13
const ROW_GAP = 18
const MOUSE_RADIUS = 100
const SPRING_K = 0.06
const DAMPING = 0.88

export default function LetterWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let particles: Particle[] = []

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      const cols = Math.ceil(canvas.width / COL_GAP) + 2
      const rows = Math.ceil(canvas.height / ROW_GAP) + 2
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * COL_GAP
          const by = row * ROW_GAP + FONT_SIZE
          particles.push({
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
          })
        }
      }
    }
    init()

    let raf: number
    let t = 0

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px monospace`
      ctx.fillStyle = 'rgba(255,255,255,0.82)'
      const { x: mx, y: my } = mouseRef.current
      t += 0.016

      for (const p of particles) {
        // Ocean wave: two traveling waves moving in the same direction at different scales
        const wave =
          Math.sin(p.baseX * 0.018 - t * 1.1) * 9 +
          Math.sin(p.baseX * 0.032 - t * 0.65) * 4

        const tx = p.baseX
        const ty = p.baseY + wave

        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.hypot(dx, dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 1.5 * 3
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx += (tx - p.x) * SPRING_K
        p.vy += (ty - p.y) * SPRING_K
        p.vx *= DAMPING
        p.vy *= DAMPING
        p.x += p.vx
        p.y += p.vy

        ctx.fillText(p.char, p.x, p.y)
      }

      raf = requestAnimationFrame(frame)
    }
    frame()

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', init)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <div className='w-screen h-screen bg-neutral-950 overflow-hidden'>
      <canvas ref={canvasRef} />
    </div>
  )
}
