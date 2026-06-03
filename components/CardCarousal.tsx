"use client"

import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 6
const ANGLE_STEP = 360 / CARD_COUNT // 60° per card
const CARD_WIDTH_PX = 288 // w-72 = 18rem at 16px base
const GAP_PX = 30 // spacing between adjacent card edges
// Inradius of regular hexagon with effective side = card width + gap
const RADIUS = Math.round((CARD_WIDTH_PX + GAP_PX) / (2 * Math.tan(Math.PI / CARD_COUNT))) // ~267px
const SCROLL_SENSITIVITY = 0.3

const CardCarousal = () => {
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setRotation(prev => prev + e.deltaX * SCROLL_SENSITIVITY)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ width: '800px', height: '300px', perspective: '1000px' }}
    >
      <div
        className="relative w-72 h-34"
        style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}
      >
        {Array.from({ length: CARD_COUNT }, (_, i) => (
          <Card key={i} index={i} />
        ))}
      </div>
    </div>
  )
}

export default CardCarousal

const Card = ({ index }: { index: number }) => {
  const rotateY = ANGLE_STEP * index
  return (
    <div
      className="absolute inset-0 rounded-xl bg-neutral-200"
      style={{ transform: `rotateY(${rotateY}deg) translateZ(${RADIUS}px)` }}
    />
  )
}
