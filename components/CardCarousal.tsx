"use client"

import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 6
const ANGLE_STEP = 360 / CARD_COUNT
const SCROLL_SENSITIVITY = 0.3

const CARD_IMAGES = [
  'https://i.pinimg.com/736x/d2/f7/48/d2f74855f505e846f70b6fea8328c282.jpg',
  'https://i.pinimg.com/736x/85/a6/ec/85a6ecb98250e3b9d7a51a341ff30ae4.jpg',
  'https://i.pinimg.com/736x/2e/19/ec/2e19ecbf70db86240090cb5570c35283.jpg',
  'https://i.pinimg.com/736x/d7/ab/ab/d7abab99acbb079c9c833ed8b1e9329e.jpg',
  'https://i.pinimg.com/736x/e5/34/b3/e534b37d96c742e341384f3daf4bef2f.jpg',
  'https://i.pinimg.com/736x/50/9e/49/509e49a1eede7ac819a3a7e70d452498.jpg',
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

  const containerRef = useRef<HTMLDivElement>(null)
  const lastTouchX = useRef(0)

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

  return (
    <>
      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ width: '800px', height: '300px', perspective: '1000px' }}
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

      <SettingsPanel
        opacity={opacity}        onOpacityChange={setOpacity}
        spread={spread}          onSpreadChange={setSpread}
        cardWidth={cardWidth}    onCardWidthChange={setCardWidth}
        gap={gap}                onGapChange={setGap}
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

const SliderRow = ({ label, value, min, max, step, unit = '', onChange }: SliderRowProps) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className="text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500">
        {Number.isInteger(value) ? value : value.toFixed(2)}{unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-0.5 rounded-full appearance-none cursor-pointer accent-neutral-500 bg-neutral-200 dark:bg-neutral-700"
    />
  </div>
)

type SettingsPanelProps = {
  opacity: number;      onOpacityChange: (v: number) => void
  spread: number;       onSpreadChange: (v: number) => void
  cardWidth: number;    onCardWidthChange: (v: number) => void
  gap: number;          onGapChange: (v: number) => void
}

const SettingsPanel = ({
  opacity, onOpacityChange,
  spread, onSpreadChange,
  cardWidth, onCardWidthChange,
  gap, onGapChange,
}: SettingsPanelProps) => (
  <div className="fixed bottom-6 right-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 rounded-2xl shadow-sm p-4 w-52">
    <p className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">Controls</p>
    <div className="space-y-4">
      <SliderRow label="Opacity"    value={opacity}   min={0.1} max={1}   step={0.05} onChange={onOpacityChange} />
      <SliderRow label="Radius"     value={spread}    min={0}   max={100} step={1}    unit="%" onChange={onSpreadChange} />
      <SliderRow label="Card Width" value={cardWidth} min={80}  max={350} step={1}    unit="px" onChange={onCardWidthChange} />
      <SliderRow label="Gap"        value={gap}       min={0}   max={100} step={1}    unit="px" onChange={onGapChange} />
    </div>
  </div>
)
