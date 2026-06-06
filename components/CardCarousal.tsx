"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CARD_COUNT = 6
const ANGLE_STEP = 360 / CARD_COUNT
const SCROLL_SENSITIVITY = 0.3

const CARD_IMAGES = [
  '/img-carousal-img-1.jpg',
  '/img-carousal-img-2.jpg',
  '/img-carousal-img-3.jpg',
  '/img-carousal-img-4.jpg',
  '/img-carousal-img-5.jpg',
  '/img-carousal-img-6.jpg',
]

const CARD_LABELS = [
  'Urban Glow',
  'Night Sky',
  'Forest Walk',
  'Ocean Drift',
  'Mountain Air',
  'Desert Bloom',
]

const CARD_CHIPS: [string, string][] = [
  ['2024', 'Editorial'],
  ['2023', 'Series'],
  ['2024', 'Nature'],
  ['2022', 'Landscape'],
  ['2025', 'Travel'],
  ['2023', 'Portrait'],
]

const CardCarousal = () => {
  const [rotation, setRotation] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [spread, setSpread] = useState(100)   // 0 = flat row, 100 = full hexagon
  const [cardWidth, setCardWidth] = useState(288)
  const [gap, setGap] = useState(30)
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [tiltZ, setTiltZ] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotateSpeed, setRotateSpeed] = useState(30)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastTouchX = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  // t=0 → flat line, t=1 → full hexagon
  const t = spread / 100
  const hexRadius = (cardWidth + gap) / (2 * Math.tan(Math.PI / CARD_COUNT))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setRotation(prev => prev + e.deltaX * SCROLL_SENSITIVITY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const deltaX = e.touches[0].clientX - lastTouchX.current
      lastTouchX.current = e.touches[0].clientX
      setRotation(prev => prev - deltaX * SCROLL_SENSITIVITY)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    if (!autoRotate) {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current)
      lastTimeRef.current = null
      return
    }

    const tick = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current
        setRotation(prev => prev + (rotateSpeed * delta) / 1000)
      }
      lastTimeRef.current = time
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current)
      lastTimeRef.current = null
    }
  }, [autoRotate, rotateSpeed])

  return (
    <>
      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ width: '800px', height: '300px', perspective: '1000px' }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg)`,
          }}
        >
          <div
            className="relative h-34"
            style={{
              width: cardWidth,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {CARD_IMAGES.map((img, i) => (
              <Card
                key={i}
                index={i}
                image={img}
                label={CARD_LABELS[i]}
                chips={CARD_CHIPS[i]}
                opacity={opacity}
                t={t}
                hexRadius={hexRadius}
                cardWidth={cardWidth}
                gap={gap}
              />
            ))}
          </div>
        </div>
      </div>

      <SettingsPanel
        opacity={opacity}          onOpacityChange={setOpacity}
        spread={spread}            onSpreadChange={setSpread}
        cardWidth={cardWidth}      onCardWidthChange={setCardWidth}
        gap={gap}                  onGapChange={setGap}
        tiltX={tiltX}              onTiltXChange={setTiltX}
        tiltY={tiltY}              onTiltYChange={setTiltY}
        tiltZ={tiltZ}              onTiltZChange={setTiltZ}
        autoRotate={autoRotate}    onAutoRotateChange={setAutoRotate}
        rotateSpeed={rotateSpeed}  onRotateSpeedChange={setRotateSpeed}
      />
    </>
  )
}

export default CardCarousal

// ─── Card ────────────────────────────────────────────────────────────────────

type CardProps = {
  index: number
  image: string
  label: string
  chips: [string, string]
  opacity: number
  t: number
  hexRadius: number
  cardWidth: number
  gap: number
}

const Card = ({ index, image, label, chips, opacity, t, hexRadius, cardWidth, gap }: CardProps) => {
  const slot = cardWidth + gap
  const offsetX = (index - (CARD_COUNT - 1) / 2) * slot * (1 - t)
  const rotateY  = ANGLE_STEP * index * t
  const translateZ = hexRadius * t

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translateX(${offsetX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: 'transform 0.35s ease',
      }}
    >
      <div
        className="w-full h-full rounded-xl bg-neutral-200 dark:bg-neutral-700 bg-cover bg-center"
        style={{
          opacity,
          backgroundImage: `url(${image})`,
          transition: 'opacity 0.2s ease',
        }}
      />
      {cardWidth >= 190 && (
        <div className='flex items-center justify-center'>
          <p
            className="ml-2 mr-2 text-xs text-center font-medium mt-2 text-neutral-700 dark:text-neutral-300"
            style={{ opacity }}
          >
            {label}
          </p>
          <div className="flex justify-center items-center gap-1.5 mt-2" style={{ opacity }}>
            {chips.map((chip, ci) => (
              <span
                key={ci}
                className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[9px] font-medium whitespace-nowrap"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Settings panel ──────────────────────────────────────────────────────────

type SliderRowProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (v: number) => void
}

const SliderRow = ({ label, value, min, max, step, unit = '', onChange }: SliderRowProps) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const valueFromX = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const raw = min + pct * (max - min)
    const stepped = Math.round(raw / step) * step
    return parseFloat(Math.min(max, Math.max(min, stepped)).toFixed(10))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange(valueFromX(e.clientX))
    const onMove = (e: MouseEvent) => onChange(valueFromX(e.clientX))
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const pct = ((value - min) / (max - min)) * 100

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className="group relative h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 cursor-pointer overflow-hidden"
    >
      <div
        className="absolute inset-y-0 left-0 bg-neutral-200 dark:bg-neutral-600"
        style={{ width: `${pct}%` }}
      >
        <div className="absolute right-0 inset-y-0 flex items-center">
          <div className="w-[2px] h-4 mr-1 rounded-full bg-neutral-400 dark:bg-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2.5">
        <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{label}</span>
        <span className="text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
          {Number.isInteger(value) ? value : value.toFixed(2)}{unit}
        </span>
      </div>
    </div>
  )
}

type SettingsPanelProps = {
  opacity: number;        onOpacityChange: (v: number) => void
  spread: number;         onSpreadChange: (v: number) => void
  cardWidth: number;      onCardWidthChange: (v: number) => void
  gap: number;            onGapChange: (v: number) => void
  tiltX: number;          onTiltXChange: (v: number) => void
  tiltY: number;          onTiltYChange: (v: number) => void
  tiltZ: number;          onTiltZChange: (v: number) => void
  autoRotate: boolean;    onAutoRotateChange: (v: boolean) => void
  rotateSpeed: number;    onRotateSpeedChange: (v: number) => void
}

const SettingsPanel = ({
  opacity, onOpacityChange,
  spread, onSpreadChange,
  cardWidth, onCardWidthChange,
  gap, onGapChange,
  tiltX, onTiltXChange,
  tiltY, onTiltYChange,
  tiltZ, onTiltZChange,
  autoRotate, onAutoRotateChange,
  rotateSpeed, onRotateSpeedChange,
}: SettingsPanelProps) => (
  <div className="fixed bottom-6 right-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl shadow-sm p-4 w-52">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">Auto Rotate</span>
      <button
        onClick={() => onAutoRotateChange(!autoRotate)}
        className={`relative flex items-center w-10 h-5 rounded-full px-0.5 transition-colors duration-200 focus:outline-none flex-shrink-0 ${
          autoRotate ? 'bg-neutral-800 dark:bg-neutral-200 justify-end' : 'bg-neutral-200 dark:bg-neutral-700 justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-4 h-4 rounded-full bg-white dark:bg-neutral-900 shadow-sm"
        />
      </button>
    </div>
    <div className="mb-4">
      <SliderRow label="Speed" value={rotateSpeed} min={5} max={120} step={5} unit="°/s" onChange={onRotateSpeedChange} />
    </div>
    <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60">
      <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">Controls</p>
      <div className="space-y-4">
        <SliderRow label="Opacity"    value={opacity}   min={0.1} max={1}   step={0.05} onChange={onOpacityChange} />
        <SliderRow label="Radius"     value={spread}    min={0}   max={100} step={1}    unit="%" onChange={onSpreadChange} />
        <SliderRow label="Card Width" value={cardWidth} min={80}  max={350} step={1}    unit="px" onChange={onCardWidthChange} />
        <SliderRow label="Gap"        value={gap}       min={0}   max={100} step={1}    unit="px" onChange={onGapChange} />
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60">
      <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">Rotation</p>
      <div className="space-y-4">
        <SliderRow label="Rotate X" value={tiltX} min={-90}  max={90}  step={1} unit="°" onChange={onTiltXChange} />
        <SliderRow label="Rotate Y" value={tiltY} min={-180} max={180} step={1} unit="°" onChange={onTiltYChange} />
        <SliderRow label="Rotate Z" value={tiltZ} min={-180} max={180} step={1} unit="°" onChange={onTiltZChange} />
      </div>
    </div>
  </div>
)
