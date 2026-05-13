"use client"
import React, { useState } from 'react'

const TOTAL_SPREADS = 4

const BookCardAnimation = () => {
  const [spread, setSpread] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const remaining = TOTAL_SPREADS - 1 - spread
  const hasNext = remaining > 0

  const flip = () => {
    if (isFlipping || !hasNext) return
    setIsFlipping(true)
    setTimeout(() => {
      setSpread(s => s + 1)
      setIsFlipping(false)
    }, 700)
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-100">
      <div className="[perspective:900px]">
        <div className="relative w-[520px] h-[340px] [transform-style:preserve-3d]">

          {/* Stacked page 2 — furthest back, visible when 2+ pages remain */}
          {remaining >= 2 && (
            <div
              className="absolute top-[8px] h-[324px] rounded-tr-2xl rounded-br-2xl"
              style={{
                right: '-8px',
                width: '268px',
                transformOrigin: 'left center',
                transform: 'rotateY(-30deg)',
                background: 'rgb(208,200,191)',
              }}
            />
          )}

          {/* Stacked page 1 — behind right page, visible when 1+ pages remain */}
          {remaining >= 1 && (
            <div
              className="absolute top-[4px] h-[332px] rounded-tr-2xl rounded-br-2xl"
              style={{
                right: '-4px',
                width: '264px',
                transformOrigin: 'left center',
                transform: 'rotateY(-30deg)',
                background: 'rgb(228,220,211)',
              }}
            />
          )}

          {/* Left page */}
          <div
            className="absolute left-0 top-0 w-[260px] h-[340px] rounded-tl-2xl rounded-bl-2xl [transform-style:preserve-3d]"
            style={{
              transformOrigin: 'right center',
              transform: 'rotateY(30deg)',
              background: 'white',
            }}
          >
            <div className="absolute left-0 top-2 w-[7px] h-[95%] origin-left [transform:rotateY(-90deg)] bg-[rgba(218,210,200,0.9)] rounded-tl-full rounded-bl-full" />
          </div>

          {/* Right page — flips left on click */}
          <div
            className="absolute right-0 top-0 w-[260px] h-[340px] rounded-tr-2xl rounded-br-2xl [transform-style:preserve-3d]"
            style={{
              transformOrigin: 'left center',
              transform: isFlipping ? 'rotateY(-180deg)' : 'rotateY(-30deg)',
              transition: isFlipping ? 'transform 0.7s ease-in-out' : 'none',
              background: 'white',
              cursor: hasNext ? 'pointer' : 'default',
            }}
            onClick={flip}
          >
            <div className="absolute right-0 top-2 w-[7px] h-[95%] origin-right [transform:rotateY(90deg)] bg-[rgba(218,210,200,0.9)] rounded-tr-full rounded-br-full" />
          </div>

          {/* Spine */}
          <div className="absolute left-1/2 top-0 w-[2px] h-[340px] [margin-left:-1px] bg-[rgba(148,135,120,0.3)] z-10" />

        </div>
      </div>
    </div>
  )
}

export default BookCardAnimation
