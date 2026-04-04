'use client'
import React, { useRef, useEffect, useState } from 'react'

const PRIZES = [
  { label: '🎉 You Won ₹5!', sub: 'Cashback added to your account' },
  { label: '🏆 You Won ₹21!', sub: 'Better luck next time… just kidding!' },
  { label: '💸 You Won ₹1!', sub: 'Every rupee counts!' },
  { label: '🎊 You Won ₹51!', sub: 'Woah, big winner!' },
  { label: '😅 Better Luck Next Time', sub: 'Try again tomorrow' },
  { label: '🌟 You Won ₹10!', sub: 'Redeemable on your next payment' },
]

const SCRATCH_THRESHOLD = 0.55

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const animating = useRef(false)
  const [prize] = useState(() => PRIZES[Math.floor(Math.random() * PRIZES.length)])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Silver foil gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grad.addColorStop(0, '#c8c8c8')
    grad.addColorStop(0.3, '#e8e8e8')
    grad.addColorStop(0.5, '#f5f5f5')
    grad.addColorStop(0.7, '#d0d0d0')
    grad.addColorStop(1, '#b0b0b0')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Noise texture to look like foil
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.07})`
      ctx.fillRect(x, y, 1.5, 1.5)
    }

    // Sheen lines
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 6) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + canvas.height, canvas.height)
      ctx.stroke()
    }

    // Hint label
    ctx.fillStyle = 'rgba(80,80,80,0.65)'
    ctx.font = 'bold 13px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦  SCRATCH HERE  ✦', canvas.width / 2, canvas.height / 2)
  }, [])

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 24)
    gradient.addColorStop(0, 'rgba(0,0,0,1)')
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.9)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, 24, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkReveal = () => {
    const canvas = canvasRef.current
    if (!canvas || revealed || animating.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++
    }
    const ratio = transparent / (canvas.width * canvas.height)
    if (ratio > SCRATCH_THRESHOLD) autoReveal()
  }

  const autoReveal = () => {
    if (animating.current || revealed) return
    animating.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let opacity = 1
    const fade = () => {
      opacity -= 0.045
      if (opacity <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setRevealed(true)
        animating.current = false
        return
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      grad.addColorStop(0, `rgba(200,200,200,${opacity})`)
      grad.addColorStop(0.5, `rgba(245,245,245,${opacity})`)
      grad.addColorStop(1, `rgba(176,176,176,${opacity})`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(fade)
    }
    requestAnimationFrame(fade)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (revealed) return
    isDrawing.current = true
    scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number])
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current || revealed) return
    scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number])
    checkReveal()
  }

  const onMouseUp = () => { isDrawing.current = false }

  const onTouchStart = (e: React.TouchEvent) => {
    if (revealed) return
    isDrawing.current = true
    scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number])
  }

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing.current || revealed) return
    scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number])
    checkReveal()
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      <p className='text-xs text-neutral-400 tracking-widest uppercase'>Scratch &amp; Win</p>

      <div className='relative w-72 h-40 rounded-2xl overflow-hidden shadow-2xl select-none'>
        {/* Prize layer */}
        <div className='absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 flex flex-col items-center justify-center gap-1.5'>
          <span className='text-white text-2xl font-bold'>{prize.label}</span>
          <span className='text-white/70 text-xs text-center px-6'>{prize.sub}</span>
        </div>

        {/* Scratch overlay */}
        <canvas
          ref={canvasRef}
          width={288}
          height={160}
          className='absolute inset-0 w-full h-full cursor-crosshair'
          style={{ opacity: revealed ? 0 : 1, transition: revealed ? 'opacity 0.4s ease' : undefined }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        />
      </div>

      {revealed && (
        <p className='text-xs text-neutral-400 animate-pulse'>Cashback will reflect within 24 hours</p>
      )}
    </div>
  )
}
