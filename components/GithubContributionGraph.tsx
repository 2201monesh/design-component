'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion'

// ─── Tiers ───────────────────────────────────────────────────────────────────
type Tier = 'sprout' | 'meadow' | 'grove' | 'forest' | 'ancient'

function getTier(n: number): Tier {
  if (n <= 50) return 'sprout'
  if (n <= 200) return 'meadow'
  if (n <= 500) return 'grove'
  if (n <= 1000) return 'forest'
  return 'ancient'
}

const TIER_META: Record<Tier, { label: string; subtitle: string; color: string }> = {
  sprout:  { label: 'Sprout',         subtitle: 'A tiny seed of potential',      color: '#86efac' },
  meadow:  { label: 'Meadow',         subtitle: 'A gentle garden takes root',    color: '#4ade80' },
  grove:   { label: 'Grove',          subtitle: 'Trees begin to gather',         color: '#22c55e' },
  forest:  { label: 'Forest',         subtitle: 'A thriving woodland',           color: '#16a34a' },
  ancient: { label: 'Ancient Forest', subtitle: 'A legendary, timeless canopy', color: '#15803d' },
}

// ─── SVG Primitives ──────────────────────────────────────────────────────────

function GrassBlade({ x, h, delay }: { x: number; h: number; delay: number }) {
  return (
    <motion.line
      x1={x} y1={200} x2={x} y2={200 - h}
      stroke="#4ade80" strokeWidth={1.5} strokeLinecap="round"
      initial={{ scaleY: 0, originY: 1 }}
      animate={{
        scaleY: 1,
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{
        scaleY: { delay, duration: 0.6, ease: 'easeOut' },
        rotate: { delay: delay + 0.6, duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ transformOrigin: `${x}px 200px` }}
      opacity={0.7}
    />
  )
}

function SmallTree({ x, h, delay, color = '#166534' }: { x: number; h: number; delay: number; color?: string }) {
  const trunk = h * 0.35
  const canopy = h * 0.75
  return (
    <motion.g
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: `${x}px 200px` }}
    >
      {/* trunk */}
      <rect x={x - 2} y={200 - trunk} width={4} height={trunk} fill="#713f12" rx={1} />
      {/* canopy layers */}
      <polygon
        points={`${x},${200 - h} ${x - canopy * 0.45},${200 - trunk * 1.1} ${x + canopy * 0.45},${200 - trunk * 1.1}`}
        fill={color} opacity={0.9}
      />
      <polygon
        points={`${x},${200 - h * 0.72} ${x - canopy * 0.55},${200 - trunk * 0.8} ${x + canopy * 0.55},${200 - trunk * 0.8}`}
        fill={color} opacity={0.75}
      />
      <motion.g
        animate={{ rotate: [0, 1.5, -1, 0.5, 0] }}
        transition={{ delay: delay + 1, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${x}px ${200 - trunk}px` }}
      >
        <polygon
          points={`${x},${200 - h * 0.4} ${x - canopy * 0.6},${200 - trunk * 0.3} ${x + canopy * 0.6},${200 - trunk * 0.3}`}
          fill={color} opacity={0.6}
        />
      </motion.g>
    </motion.g>
  )
}

function LargeTree({ x, h, delay, color = '#14532d' }: { x: number; h: number; delay: number; color?: string }) {
  const trunk = h * 0.3
  const w = h * 0.55
  return (
    <motion.g
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay, duration: 1, ease: [0.34, 1.4, 0.64, 1] }}
      style={{ transformOrigin: `${x}px 200px` }}
    >
      <rect x={x - 4} y={200 - trunk} width={8} height={trunk} fill="#78350f" rx={2} />
      <ellipse cx={x} cy={200 - h * 0.7} rx={w * 0.5} ry={h * 0.38} fill={color} opacity={0.95} />
      <ellipse cx={x - w * 0.25} cy={200 - h * 0.55} rx={w * 0.38} ry={h * 0.28} fill={color} opacity={0.8} />
      <ellipse cx={x + w * 0.25} cy={200 - h * 0.52} rx={w * 0.38} ry={h * 0.28} fill={color} opacity={0.8} />
      <motion.ellipse
        cx={x} cy={200 - h * 0.68}
        rx={w * 0.48} ry={h * 0.36}
        fill={color} opacity={0.5}
        animate={{ scaleX: [1, 1.02, 0.98, 1] }}
        transition={{ delay: delay + 1.2, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  )
}

function Bush({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: `${x}px 195px` }}
    >
      <ellipse cx={x} cy={195} rx={12} ry={8} fill="#166534" opacity={0.85} />
      <ellipse cx={x - 9} cy={196} rx={8} ry={6} fill="#15803d" opacity={0.75} />
      <ellipse cx={x + 9} cy={196} rx={8} ry={6} fill="#15803d" opacity={0.75} />
    </motion.g>
  )
}

function Firefly({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.circle
      cx={x} cy={y} r={1.5}
      fill="#fef08a"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 0.9, 0.3, 0.8, 0],
        x: [0, 8, -5, 12, 0],
        y: [0, -10, -20, -8, -30],
      }}
      transition={{
        delay,
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function Mist({ y, delay }: { y: number; delay: number }) {
  return (
    <motion.ellipse
      cx={200} cy={y} rx={180} ry={18}
      fill="white" opacity={0}
      animate={{ opacity: [0, 0.04, 0.02, 0.05, 0], x: [-10, 10, -5, 8, -10] }}
      transition={{ delay, duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ─── Scene Layers ─────────────────────────────────────────────────────────────

function SproutScene() {
  return (
    <>
      {[60, 80, 100, 120, 140, 160, 175, 200, 220, 240, 260, 280, 300, 320, 340].map((x, i) => (
        <GrassBlade key={x} x={x} h={8 + Math.sin(i * 1.7) * 5} delay={i * 0.04} />
      ))}
      <SmallTree x={200} h={38} delay={0.5} color="#166534" />
    </>
  )
}

function MeadowScene() {
  return (
    <>
      {Array.from({ length: 30 }, (_, i) => (
        <GrassBlade key={i} x={60 + i * 9.5} h={6 + Math.sin(i * 1.3) * 6} delay={i * 0.03} />
      ))}
      <SmallTree x={130} h={52} delay={0.3} color="#166534" />
      <SmallTree x={270} h={46} delay={0.5} color="#15803d" />
      <Bush x={190} delay={0.7} />
      <Bush x={230} delay={0.8} />
      <SmallTree x={200} h={60} delay={0.6} color="#14532d" />
    </>
  )
}

function GroveScene() {
  return (
    <>
      {Array.from({ length: 28 }, (_, i) => (
        <GrassBlade key={i} x={65 + i * 10} h={5 + Math.sin(i * 1.9) * 7} delay={i * 0.025} />
      ))}
      {/* back layer - silhouettes */}
      <LargeTree x={100} h={90} delay={0.1} color="#052e16" />
      <LargeTree x={310} h={85} delay={0.15} color="#052e16" />
      {/* mid layer */}
      <SmallTree x={150} h={72} delay={0.35} color="#14532d" />
      <SmallTree x={255} h={68} delay={0.4} color="#166534" />
      <LargeTree x={200} h={100} delay={0.5} color="#15803d" />
      {/* front bushes */}
      <Bush x={115} delay={0.7} />
      <Bush x={175} delay={0.75} />
      <Bush x={235} delay={0.8} />
      <Bush x={290} delay={0.85} />
    </>
  )
}

function ForestScene() {
  return (
    <>
      {Array.from({ length: 26 }, (_, i) => (
        <GrassBlade key={i} x={70 + i * 10.5} h={4 + Math.sin(i * 2.1) * 6} delay={i * 0.02} />
      ))}
      {/* deep back */}
      <LargeTree x={80}  h={110} delay={0.05} color="#022c22" />
      <LargeTree x={145} h={115} delay={0.1}  color="#022c22" />
      <LargeTree x={265} h={112} delay={0.1}  color="#022c22" />
      <LargeTree x={320} h={108} delay={0.05} color="#022c22" />
      {/* mid */}
      <LargeTree x={110} h={130} delay={0.25} color="#052e16" />
      <LargeTree x={195} h={140} delay={0.3}  color="#052e16" />
      <LargeTree x={290} h={132} delay={0.28} color="#052e16" />
      {/* front */}
      <SmallTree x={135} h={80}  delay={0.5}  color="#14532d" />
      <SmallTree x={240} h={75}  delay={0.52} color="#166534" />
      <Bush x={100} delay={0.7} />
      <Bush x={160} delay={0.72} />
      <Bush x={220} delay={0.74} />
      <Bush x={280} delay={0.76} />
      <Bush x={330} delay={0.78} />
      {[1, 2, 3, 4, 5].map(i => (
        <Firefly key={i} x={100 + i * 50} y={160 - i * 10} delay={i * 0.8} />
      ))}
    </>
  )
}

function AncientScene() {
  return (
    <>
      {Array.from({ length: 25 }, (_, i) => (
        <GrassBlade key={i} x={72 + i * 11} h={4 + Math.sin(i * 1.5) * 5} delay={i * 0.015} />
      ))}
      {/* deepest */}
      <LargeTree x={75}  h={135} delay={0.02} color="#011a0e" />
      <LargeTree x={160} h={140} delay={0.04} color="#011a0e" />
      <LargeTree x={240} h={145} delay={0.04} color="#011a0e" />
      <LargeTree x={325} h={138} delay={0.02} color="#011a0e" />
      {/* back */}
      <LargeTree x={110} h={155} delay={0.15} color="#022c22" />
      <LargeTree x={200} h={165} delay={0.18} color="#022c22" />
      <LargeTree x={290} h={158} delay={0.16} color="#022c22" />
      {/* mid */}
      <LargeTree x={145} h={145} delay={0.3}  color="#052e16" />
      <LargeTree x={255} h={140} delay={0.32} color="#052e16" />
      {/* front */}
      <SmallTree x={125} h={88}  delay={0.5}  color="#166534" />
      <SmallTree x={275} h={82}  delay={0.52} color="#166534" />
      <Bush x={88}  delay={0.65} />
      <Bush x={148} delay={0.67} />
      <Bush x={210} delay={0.69} />
      <Bush x={270} delay={0.71} />
      <Bush x={320} delay={0.73} />
      <Mist y={170} delay={0} />
      <Mist y={150} delay={2.5} />
      {Array.from({ length: 10 }, (_, i) => (
        <Firefly key={i} x={80 + i * 25} y={130 + Math.sin(i) * 20} delay={i * 0.6} />
      ))}
    </>
  )
}

const SCENE: Record<Tier, React.FC> = {
  sprout:  SproutScene,
  meadow:  MeadowScene,
  grove:   GroveScene,
  forest:  ForestScene,
  ancient: AncientScene,
}

// ─── Stars ────────────────────────────────────────────────────────────────────

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  cx: 20 + (i * 97.3) % 360,
  cy: 5 + (i * 53.7) % 80,
  r: 0.5 + (i % 3) * 0.4,
  delay: (i * 0.17) % 3,
}))

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GithubContributionGraph() {
  const [username, setUsername] = useState('')
  const [commits, setCommits]   = useState<number | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [fetched, setFetched]   = useState(false)

  const tier = commits !== null ? getTier(commits) : null
  const meta = tier ? TIER_META[tier] : null
  const Scene = tier ? SCENE[tier] : null

  const fetchCommits = useCallback(async () => {
    const u = username.trim()
    if (!u) return
    setLoading(true)
    setError(null)
    setFetched(false)

    try {
      const res = await fetch(
        `https://api.github.com/search/commits?q=author:${encodeURIComponent(u)}&per_page=1`,
        { headers: { Accept: 'application/vnd.github.cloak-preview+json' } }
      )
      if (res.status === 404 || res.status === 422) {
        setError('User not found')
        setCommits(null)
        return
      }
      if (!res.ok) {
        setError('GitHub API error — try again shortly')
        setCommits(null)
        return
      }
      const data = await res.json()
      setCommits(data.total_count ?? 0)
      setFetched(true)
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }, [username])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') fetchCommits()
  }

  // sky gradient based on tier
  const skyColors: Record<Tier, string> = {
    sprout:  'from-[#020d06] to-[#041a0a]',
    meadow:  'from-[#030f07] to-[#051e0c]',
    grove:   'from-[#020e06] to-[#062010]',
    forest:  'from-[#010a04] to-[#051808]',
    ancient: 'from-[#010804] to-[#031206]',
  }
  const skyClass = tier ? skyColors[tier] : 'from-[#020d06] to-[#041a0a]'

  return (
    <div className="min-h-screen bg-[#030a05] flex flex-col items-center justify-center p-6 font-mono">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-semibold tracking-widest text-emerald-400/80 uppercase">
          Commit Forest
        </h1>
        <p className="text-xs text-emerald-900/70 mt-1 tracking-wider">
          your commits, grown into a world
        </p>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-2 mb-10"
      >
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700 text-sm">@</span>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKey}
            placeholder="github username"
            className="
              bg-[#061208] border border-emerald-900/40 text-emerald-300
              placeholder:text-emerald-900/50 text-sm pl-7 pr-4 py-2.5 rounded-lg
              focus:outline-none focus:border-emerald-700/60 focus:ring-1 focus:ring-emerald-800/40
              w-52 tracking-wide transition-all duration-300
            "
          />
        </div>
        <motion.button
          onClick={fetchCommits}
          disabled={loading || !username.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            px-4 py-2.5 rounded-lg bg-emerald-900/40 border border-emerald-800/40
            text-emerald-400 text-sm tracking-wider transition-all duration-200
            hover:bg-emerald-800/50 hover:border-emerald-700/50
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ···
            </motion.span>
          ) : 'Grow'}
        </motion.button>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400/70 text-xs mb-6 tracking-wider"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Forest Scene */}
      <AnimatePresence mode="wait">
        {fetched && tier && meta && Scene && (
          <motion.div
            key={tier}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs tracking-widest uppercase"
                style={{ color: meta.color }}
              >
                {meta.label}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-emerald-600/80 tracking-wider"
              >
                {commits?.toLocaleString()} commits
              </motion.span>
            </div>

            {/* SVG canvas */}
            <div
              className={`rounded-2xl overflow-hidden border border-emerald-900/30 bg-gradient-to-b ${skyClass}`}
              style={{ boxShadow: '0 0 60px -20px rgba(16,185,129,0.08)' }}
            >
              <svg
                viewBox="0 0 400 210"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block' }}
              >
                {/* Stars */}
                {STARS.map(s => (
                  <motion.circle
                    key={s.id}
                    cx={s.cx} cy={s.cy} r={s.r}
                    fill="white"
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{ delay: s.delay, duration: 2.5 + s.delay, repeat: Infinity }}
                  />
                ))}

                {/* Ground */}
                <motion.rect
                  x={0} y={196} width={400} height={14}
                  fill="#0d2010"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: '200px 203px' }}
                />

                {/* Scene elements */}
                <Scene />
              </svg>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center text-xs text-emerald-900/60 mt-3 tracking-wider"
            >
              {meta.subtitle}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-4 px-1">
              <div className="h-px bg-emerald-950 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, #052e16, ${meta.color})` }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${Math.min(100, (commits! / 1000) * 100)}%`,
                  }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-emerald-950/80">0</span>
                <span className="text-[10px] text-emerald-950/80">1000+</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle hint */}
      <AnimatePresence>
        {!fetched && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="text-[11px] text-emerald-950/60 tracking-widest mt-2"
          >
            enter a username to grow your forest
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
