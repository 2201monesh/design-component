"use client"

import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 6
const ANGLE_STEP = 360 / CARD_COUNT
const SCROLL_SENSITIVITY = 0.3

const CARD_IMAGES = [
  '/img-carousal-img-7.jpg',
  '/img-carousal-img-8.jpg',
  '/img-carousal-img-9.jpg',
  '/img-carousal-img-14.jpg',
  '/img-carousal-img-11.jpg',
  '/img-carousal-img-12.jpg',
]

const CARD_LABELS = [
  'Interstellar',
  'La haine',
  'Pulp Fiction',
  'The Green Mile',
  'Raging Bull',
  'Whiplash',
]

const CARD_CHIPS: [string, string][] = [
  ['2014', 'Science fiction'],
  ['1995', 'Political cinema'],
  ['1994', 'Comedy'],
  ['1999', 'Melodrama'],
  ['1980', 'Action drama'],
  ['2014', 'Musical drama'],
]

const CardCarousal = () => {
  const [rotation, setRotation] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [spread, setSpread] = useState(100)
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

      <TweakpanePanel
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

// ─── Tweakpane panel ─────────────────────────────────────────────────────────

type TweakpanePanelProps = {
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

const TweakpanePanel = ({
  opacity, onOpacityChange,
  spread, onSpreadChange,
  cardWidth, onCardWidthChange,
  gap, onGapChange,
  tiltX, onTiltXChange,
  tiltY, onTiltYChange,
  tiltZ, onTiltZChange,
  autoRotate, onAutoRotateChange,
  rotateSpeed, onRotateSpeedChange,
}: TweakpanePanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const paneRef = useRef<any>(null)

  // Mutable object that Tweakpane binds to directly
  const params = useRef({
    autoRotate,
    rotateSpeed,
    opacity,
    spread,
    cardWidth,
    gap,
    tiltX,
    tiltY,
    tiltZ,
  })

  // Keep callbacks in a ref so Tweakpane event handlers always see the latest versions
  const cbs = useRef({
    onOpacityChange, onSpreadChange, onCardWidthChange, onGapChange,
    onTiltXChange, onTiltYChange, onTiltZChange, onAutoRotateChange, onRotateSpeedChange,
  })
  useEffect(() => {
    cbs.current = {
      onOpacityChange, onSpreadChange, onCardWidthChange, onGapChange,
      onTiltXChange, onTiltYChange, onTiltZChange, onAutoRotateChange, onRotateSpeedChange,
    }
  }, [
    onOpacityChange, onSpreadChange, onCardWidthChange, onGapChange,
    onTiltXChange, onTiltYChange, onTiltZChange, onAutoRotateChange, onRotateSpeedChange,
  ])

  // Mount Tweakpane once
  useEffect(() => {
    let disposed = false

    const init = async () => {
      const { Pane } = await import('tweakpane')
      if (disposed || !containerRef.current) return

      const pane = new Pane({ container: containerRef.current, title: 'Card Carousel' })
      paneRef.current = pane

      pane.addBinding(params.current, 'autoRotate', { label: 'Auto Rotate' })
        .on('change', ev => cbs.current.onAutoRotateChange(ev.value as boolean))

      pane.addBinding(params.current, 'rotateSpeed', { label: 'Speed', min: 5, max: 120, step: 5 })
        .on('change', ev => cbs.current.onRotateSpeedChange(ev.value as number))

      const controls = pane.addFolder({ title: 'Controls', expanded: true })
      controls.addBinding(params.current, 'opacity', { label: 'Opacity', min: 0.1, max: 1, step: 0.05 })
        .on('change', ev => cbs.current.onOpacityChange(ev.value as number))
      controls.addBinding(params.current, 'spread', { label: 'Radius %', min: 0, max: 100, step: 1 })
        .on('change', ev => cbs.current.onSpreadChange(ev.value as number))
      controls.addBinding(params.current, 'cardWidth', { label: 'Card Width', min: 80, max: 350, step: 1 })
        .on('change', ev => cbs.current.onCardWidthChange(ev.value as number))
      controls.addBinding(params.current, 'gap', { label: 'Gap', min: 0, max: 100, step: 1 })
        .on('change', ev => cbs.current.onGapChange(ev.value as number))

      const rotationFolder = pane.addFolder({ title: 'Rotation', expanded: true })
      rotationFolder.addBinding(params.current, 'tiltX', { label: 'Rotate X', min: -90, max: 90, step: 1 })
        .on('change', ev => cbs.current.onTiltXChange(ev.value as number))
      rotationFolder.addBinding(params.current, 'tiltY', { label: 'Rotate Y', min: -180, max: 180, step: 1 })
        .on('change', ev => cbs.current.onTiltYChange(ev.value as number))
      rotationFolder.addBinding(params.current, 'tiltZ', { label: 'Rotate Z', min: -180, max: 180, step: 1 })
        .on('change', ev => cbs.current.onTiltZChange(ev.value as number))
    }

    init()

    return () => {
      disposed = true
      paneRef.current?.dispose()
      paneRef.current = null
    }
  }, [])

  // Sync React state → Tweakpane when values change externally
  useEffect(() => {
    params.current.opacity = opacity
    params.current.spread = spread
    params.current.cardWidth = cardWidth
    params.current.gap = gap
    params.current.tiltX = tiltX
    params.current.tiltY = tiltY
    params.current.tiltZ = tiltZ
    params.current.autoRotate = autoRotate
    params.current.rotateSpeed = rotateSpeed
    paneRef.current?.refresh()
  }, [opacity, spread, cardWidth, gap, tiltX, tiltY, tiltZ, autoRotate, rotateSpeed])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50"
      style={{ width: '260px' }}
    />
  )
}
