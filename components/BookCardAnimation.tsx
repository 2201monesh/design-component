"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const TOTAL_SPREADS = 4

const BookCardAnimation = () => {
  const [spread, setSpread] = useState(0)
  const [stackSpread, setStackSpread] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isFlippingBack, setIsFlippingBack] = useState(false)

  const isAnimating = isFlipping || isFlippingBack
  const hasNext = spread < TOTAL_SPREADS - 1
  const hasPrev = spread > 0
  const stackRemaining = TOTAL_SPREADS - 1 - stackSpread

  const flip = () => {
    if (isAnimating || !hasNext) return
    setSpread(s => s + 1)
    setIsFlipping(true)
  }

  const flipBack = () => {
    if (isAnimating || !hasPrev) return
    setSpread(s => s - 1)
    setIsFlippingBack(true)
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-100">
      <div className="[perspective:900px]">
        <div className="relative w-[520px] h-[340px] [transform-style:preserve-3d]">

          {/* Right stacked page 2 — furthest back */}
          {stackRemaining >= 2 && (
            <div
              className="absolute top-[8px] h-[324px] rounded-tr-2xl rounded-br-2xl"
              style={{
                right: '-12px',
                width: '272px',
                transformOrigin: 'left center',
                transform: 'rotateY(-30deg)',
                background: 'rgb(208,200,191)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Right stacked page 1 */}
          {stackRemaining >= 1 && (
            <div
              className="absolute top-[4px] h-[332px] rounded-tr-2xl rounded-br-2xl"
              style={{
                right: '-6px',
                width: '266px',
                transformOrigin: 'left center',
                transform: 'rotateY(-30deg)',
                background: 'rgb(228,220,211)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Left stacked page 2 — furthest back */}
          {stackSpread >= 2 && (
            <div
              className="absolute top-[8px] h-[324px] rounded-tl-2xl rounded-bl-2xl"
              style={{
                left: '-12px',
                width: '272px',
                transformOrigin: 'right center',
                transform: 'rotateY(30deg)',
                background: 'rgb(208,200,191)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Left stacked page 1 */}
          {stackSpread >= 1 && (
            <div
              className="absolute top-[4px] h-[332px] rounded-tl-2xl rounded-bl-2xl"
              style={{
                left: '-6px',
                width: '266px',
                transformOrigin: 'right center',
                transform: 'rotateY(30deg)',
                background: 'rgb(228,220,211)',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Base left page — always at rest */}
          <div
            className="absolute left-0 top-0 w-[260px] h-[340px] rounded-tl-2xl rounded-bl-2xl [transform-style:preserve-3d]"
            style={{
              transformOrigin: 'right center',
              transform: 'rotateY(30deg)',
              background: 'white',
              cursor: hasPrev && !isAnimating ? 'pointer' : 'default',
            }}
            onClick={flipBack}
          >
            <div className="absolute left-0 top-2 w-[7px] h-[95%] origin-left [transform:rotateY(-90deg)] bg-[rgba(218,210,200,0.9)] rounded-tl-full rounded-bl-full" />
          </div>

          {/* Base right page — always at rest */}
          <div
            className="absolute right-0 top-0 w-[260px] h-[340px] rounded-tr-2xl rounded-br-2xl [transform-style:preserve-3d]"
            style={{
              transformOrigin: 'left center',
              transform: 'rotateY(-30deg)',
              background: 'white',
              cursor: hasNext && !isAnimating ? 'pointer' : 'default',
            }}
            onClick={flip}
          >
            <div className="absolute right-0 top-2 w-[7px] h-[95%] origin-right [transform:rotateY(90deg)] bg-[rgba(218,210,200,0.9)] rounded-tr-full rounded-br-full" />
          </div>

          {/* Forward flip overlay — sweeps right page left, updates stack on complete */}
          {isFlipping && (
            <motion.div
              className="absolute right-0 top-0 w-[260px] h-[340px] rounded-tr-2xl rounded-br-2xl [transform-style:preserve-3d]"
              style={{
                transformOrigin: 'left center',
                background: 'white',
                pointerEvents: 'none',
              }}
              initial={{ rotateY: -30 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              onAnimationComplete={() => {
                setStackSpread(s => s + 1)
                setIsFlipping(false)
              }}
            >
              <div className="absolute right-0 top-2 w-[7px] h-[95%] origin-right [transform:rotateY(90deg)] bg-[rgba(218,210,200,0.9)] rounded-tr-full rounded-br-full" />
            </motion.div>
          )}

          {/* Backward flip overlay — sweeps left page right, updates stack on complete */}
          {isFlippingBack && (
            <motion.div
              className="absolute left-0 top-0 w-[260px] h-[340px] rounded-tl-2xl rounded-bl-2xl [transform-style:preserve-3d]"
              style={{
                transformOrigin: 'right center',
                background: 'white',
                pointerEvents: 'none',
              }}
              initial={{ rotateY: 30 }}
              animate={{ rotateY: 180 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              onAnimationComplete={() => {
                setStackSpread(s => s - 1)
                setIsFlippingBack(false)
              }}
            >
              <div className="absolute left-0 top-2 w-[7px] h-[95%] origin-left [transform:rotateY(-90deg)] bg-[rgba(218,210,200,0.9)] rounded-tl-full rounded-bl-full" />
            </motion.div>
          )}

          {/* Spine */}
          <div className="absolute left-1/2 top-0 w-[2px] h-[340px] [margin-left:-1px] bg-[rgba(148,135,120,0.3)] z-10" />

        </div>
      </div>
    </div>
  )
}

export default BookCardAnimation
