"use client"

import { useEffect, useRef, useState } from 'react'

const CARD_COUNT = 6
const ANGLE_STEP = 360 / CARD_COUNT // 60° per card
const CARD_WIDTH_PX = 288 // w-72 = 18rem at 16px base
const GAP_PX = 30 // spacing between adjacent card edges
// Inradius of regular hexagon with effective side = card width + gap
const RADIUS = Math.round((CARD_WIDTH_PX + GAP_PX) / (2 * Math.tan(Math.PI / CARD_COUNT))) // ~267px
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
  const containerRef = useRef<HTMLDivElement>(null)

  const lastTouchX = useRef(0)

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
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ width: '800px', height: '300px', perspective: '1000px' }}
    >
      <div
        className="relative w-72 h-34"
        style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}
      >
        {CARD_IMAGES.map((img, i) => (
          <Card key={i} index={i} image={img} />
        ))}
      </div>
    </div>
  )
}

export default CardCarousal

const Card = ({ index, image }: { index: number; image: string }) => {
  const rotateY = ANGLE_STEP * index
  return (
    <div
      className="absolute inset-0 rounded-xl bg-neutral-200 bg-cover bg-center"
      style={{
        transform: `rotateY(${rotateY}deg) translateZ(${RADIUS}px)`,
        backgroundImage: `url(${image})`,
      }}
    />
  )
}
