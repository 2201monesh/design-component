'use client'

import React, { useRef, useEffect, useState } from 'react'

const TEXT =
  "I'm a frontend engineer who enjoys building clean, modern UIs with smooth, minimal animations. I mostly work with React, Next.js, Tailwind CSS, and shadcn/ui, and I love turning well-thought-out designs into fast, polished web experiences. These days, I spend a lot of time using Framer Motion to add subtle motion-micro-interactions, transitions, and animations that make interfaces feel natural without being flashy. I care a lot about visual consistency, performance, and writing code that's easy to scale and maintain."

// ── Physics ───────────────────────────────────────────────────────────────────
const GRAVITY  = 0.42
const SUBSTEPS = 8
const ITERS    = 12
const DAMPING  = 0.997   // per substep  →  0.997^8 ≈ 0.977 per frame
const BOUNCE   = 0.01
const FRICTION = 0.62
const GRAB_R   = 72
const FONT     = '16px Inter, system-ui, sans-serif'

// Peel rate: frames between freeing one more node while holding
// Faster the further you pull from the grab origin
const peelEvery = (d: number) => Math.max(1, Math.round(8 - d / 10))

interface PNode {
  x: number; y: number
  px: number; py: number
  free: boolean; held: boolean
  word: string; hw: number
}

export default function DraggableChain() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  const nodes      = useRef<PNode[]>([])
  const dists      = useRef<number[]>([])
  const mouse      = useRef({ x: 0, y: 0 })
  const grabOrigin = useRef({ x: 0, y: 0 })  // where the user first clicked
  const holdIdx    = useRef(-1)
  const peelTimer  = useRef(0)
  const raf        = useRef(0)
  const ground     = useRef(0)

  // ── Init: measure word positions → build snake-ordered node list ──────────
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const canvas = canvasRef.current
        const div    = measureRef.current
        if (!canvas || !div) return

        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
        ground.current = canvas.height - 10

        const chars = TEXT.split('')
        const spans = Array.from(div.querySelectorAll<HTMLSpanElement>('span'))
        if (spans.length !== chars.length) return

        // Measure every character's center in viewport coordinates
        type Measured = { cx: number; cy: number; word: string; hw: number }
        const measured: Measured[] = spans.map((s, i) => {
          const r = s.getBoundingClientRect()
          return {
            cx: r.left + r.width / 2,
            cy: r.top  + r.height / 2,
            word: chars[i],
            hw: r.width / 2,
          }
        })

        // ── Group words into lines by Y proximity ─────────────────────────────
        // All spans on the same line share an identical r.top, so tolerance = 4 is safe.
        const lineMap = new Map<number, Measured[]>()
        for (const m of measured) {
          const key = Math.round(m.cy)   // same line → same rounded Y
          let found = false
          for (const [k, arr] of lineMap) {
            if (Math.abs(k - key) < 6) { arr.push(m); found = true; break }
          }
          if (!found) lineMap.set(key, [m])
        }

        // Sort lines bottom → top; words within each line left → right
        const lines = [...lineMap.values()]
          .sort((a, b) => b[0].cy - a[0].cy)
          .map(g => g.sort((a, b) => a.cx - b.cx))

        // ── Snake / boustrophedon order ───────────────────────────────────────
        // Even lines from bottom (0, 2, …) → right-to-left  (reversed)
        // Odd  lines from bottom (1, 3, …) → left-to-right  (normal)
        // This makes every inter-line link span only ONE line-height (~24 px)
        // instead of a long diagonal, so the constraint never breaks.
        const snake: Measured[] = []
        lines.forEach((line, idx) => {
          snake.push(...(idx % 2 === 0 ? [...line].reverse() : line))
        })

        nodes.current = snake.map(m => ({
          x: m.cx, y: m.cy, px: m.cx, py: m.cy,
          free: false, held: false,
          word: m.word, hw: m.hw,
        }))

        dists.current = nodes.current.slice(0, -1).map((n, i) => {
          const m = nodes.current[i + 1]
          return Math.hypot(m.x - n.x, m.y - n.y)
        })

        setReady(true)
      })
    )
    return () => cancelAnimationFrame(id)
  }, [])

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const G_SUB  = GRAVITY / SUBSTEPS
    const GND    = ground.current

    const tick = () => {
      const ns = nodes.current
      const ds = dists.current

      // ── Peel: while holding, advance the free frontier one node at a time ──
      if (holdIdx.current >= 0) {
        peelTimer.current++
        const drag = Math.hypot(
          mouse.current.x - grabOrigin.current.x,
          mouse.current.y - grabOrigin.current.y,
        )
        if (peelTimer.current >= peelEvery(drag)) {
          peelTimer.current = 0
          // Find the rightmost (highest-index) free node and free the next one
          for (let i = ns.length - 1; i >= 0; i--) {
            if (ns[i].free && i + 1 < ns.length && !ns[i + 1].free) {
              ns[i + 1].free = true
              ns[i + 1].px   = ns[i + 1].x
              ns[i + 1].py   = ns[i + 1].y
              break
            }
          }
        }
      } else {
        peelTimer.current = 0
      }

      // ── Substep physics ───────────────────────────────────────────────────
      for (let sub = 0; sub < SUBSTEPS; sub++) {

        // 1. Verlet integration
        for (let i = 0; i < ns.length; i++) {
          const p = ns[i]
          if (!p.free) continue

          if (p.held) {
            p.px = p.x;  p.py = p.y
            p.x  = mouse.current.x
            p.y  = mouse.current.y
            continue
          }

          const vx = (p.x - p.px) * DAMPING
          const vy = (p.y - p.py) * DAMPING
          p.px = p.x;  p.py = p.y
          p.x += vx
          p.y += vy + G_SUB

          // Ground: absorb almost all energy so letters rest, not bounce
          if (p.y > GND) {
            const vy_ = p.y  - p.py
            const vx_ = p.x  - p.px
            p.y  = GND
            p.py = GND + vy_ * BOUNCE
            p.px = p.x - vx_ * FRICTION
          }

          // Kill micro-vibrations so settled letters go fully still
          if (Math.hypot(p.x - p.px, p.y - p.py) < 0.25) {
            p.px = p.x; p.py = p.y
          }
        }

        // 2. Distance constraints — maintain link lengths
        for (let it = 0; it < ITERS; it++) {
          for (let i = 0; i < ns.length - 1; i++) {
            const a = ns[i], b = ns[i + 1]
            if (!a.free && !b.free) continue

            const dx   = b.x - a.x
            const dy   = b.y - a.y
            const dist = Math.hypot(dx, dy) || 1e-6
            const f    = (dist - ds[i]) / dist * 0.5

            if (a.free && !a.held) { a.x += dx * f;  a.y += dy * f  }
            if (b.free && !b.held) { b.x -= dx * f;  b.y -= dy * f  }
          }
        }
      }

      // ── Draw ──────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font         = FONT
      ctx.fillStyle    = '#111827'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      for (const p of ns) ctx.fillText(p.word, p.x, p.y)

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [ready])

  // ── Mouse handlers ────────────────────────────────────────────────────────
  const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ready) return
    const ns = nodes.current
    const mx = e.clientX,  my = e.clientY

    let best = -1, bestDist = GRAB_R

    // Find the free frontier (highest-index free node)
    let frontier = -1
    for (let i = ns.length - 1; i >= 0; i--) {
      if (ns[i].free) { frontier = i; break }
    }

    // Primary: search the last ~80 freed nodes — this is the "active" hanging
    // part of the chain. Keeping the held node close to the frontier means the
    // constraint solver has a short chain to resolve, so pulling stays snappy.
    if (frontier >= 0) {
      const lo = Math.max(0, frontier - 80)
      for (let i = lo; i <= frontier; i++) {
        const d = Math.hypot(ns[i].x - mx, ns[i].y - my)
        if (d < bestDist) { bestDist = d; best = i }
      }
    }

    // Fallback: use the original cap region to initiate a fresh pull when
    // nothing near the frontier is within reach (e.g. very first grab).
    if (best < 0) {
      const cap = Math.floor(ns.length * 0.4)
      for (let i = 0; i < cap; i++) {
        const d = Math.hypot(ns[i].x - mx, ns[i].y - my)
        if (d < bestDist) { bestDist = d; best = i }
      }
    }

    if (best < 0) return

    // Free the tail (nodes 0 … best-1) so they hang from the grab point
    for (let i = 0; i <= best; i++) {
      ns[i].free = true
      ns[i].px   = ns[i].x
      ns[i].py   = ns[i].y
    }
    ns[best].held    = true
    holdIdx.current  = best
    peelTimer.current = 0
    mouse.current    = { x: mx, y: my }
    grabOrigin.current = { x: mx, y: my }
    e.currentTarget.style.cursor = 'grabbing'
  }

  const onMove  = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
  }

  const release = (e: React.MouseEvent<HTMLDivElement>) => {
    if (holdIdx.current >= 0) {
      nodes.current[holdIdx.current].held = false
      holdIdx.current   = -1
      peelTimer.current = 0
    }
    e.currentTarget.style.cursor = 'grab'
  }

  return (
    <div
      className='w-screen h-screen'
      style={{ cursor: 'grab' }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={release}
      onMouseLeave={release}
    >
      {/* Invisible measurement layer — browser lays text out normally */}
      <div className='absolute inset-0 flex justify-center pointer-events-none'>
        <div
          ref={measureRef}
          className='w-[40%] mt-36'
          style={{ visibility: ready ? 'hidden' : 'visible' }}
        >
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', lineHeight: '24px' }}>
            {TEXT.split('').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </p>
        </div>
      </div>

      {/* Physics canvas — fixed so coords match getBoundingClientRect() */}
      <canvas
        ref={canvasRef}
        className='fixed inset-0'
        style={{ visibility: ready ? 'visible' : 'hidden', pointerEvents: 'none' }}
      />
    </div>
  )
}
