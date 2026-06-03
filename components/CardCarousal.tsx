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
  opacity: number
  t: number
  hexRadius: number
  cardWidth: number
  gap: number
}

const Card = ({ index, image, opacity, t, hexRadius, cardWidth, gap }: CardProps) => {
  const slot = cardWidth + gap
  const offsetX = (index - (CARD_COUNT - 1) / 2) * slot * (1 - t)
  const rotateY  = ANGLE_STEP * index * t
  const translateZ = hexRadius * t

  return (
    <div
      className="absolute inset-0 rounded-xl bg-neutral-200 bg-cover bg-center"
      style={{
        opacity,
        backgroundImage: `url(${image})`,
        transform: `translateX(${offsetX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: 'transform 0.35s ease, opacity 0.2s ease',
      }}
    />
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
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-xs font-medium text-neutral-700">{label}</span>
      <span className="text-xs tabular-nums text-neutral-400">
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
      className="w-full h-1 rounded-full appearance-none cursor-pointer accent-neutral-800 bg-neutral-200"
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
  <div className="fixed bottom-6 right-6 bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-200/60 p-4 w-60">
    <p className="text-sm font-semibold text-neutral-800 mb-4">Options</p>
    <SliderRow label="Opacity"     value={opacity}    min={0.1} max={1}   step={0.05} onChange={onOpacityChange} />
    <SliderRow label="Radius"      value={spread}     min={0}   max={100} step={1}    unit="%" onChange={onSpreadChange} />
    <SliderRow label="Card Width"  value={cardWidth}  min={80}  max={350} step={1}    unit="px" onChange={onCardWidthChange} />
    <SliderRow label="Gap"         value={gap}        min={0}   max={100} step={1}    unit="px" onChange={onGapChange} />
  </div>
)
