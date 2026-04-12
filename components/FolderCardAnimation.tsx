'use client'
import React, { useState, useEffect } from 'react'

type ClickPhase = null | 'flying' | 'center' | 'returning-flip' | 'returning-pre-right' | 'returning-right' | 'returning-back'

const FolderCardAnimation = () => {
  const [hovered, setHovered] = useState(false)
  const [clickPhase, setClickPhase] = useState<ClickPhase>(null)
  const [flyingElevated, setFlyingElevated] = useState(false)

  const handleClick = () => {
    if (clickPhase === 'center') {
      setClickPhase('returning-flip')
      return
    }
    if (clickPhase !== null) return
    setClickPhase('flying')
  }

  // Forward: elevate card above folder cover only after it has slid past the right edge (~32% of 1.2s)
  useEffect(() => {
    if (clickPhase !== 'flying') { setFlyingElevated(false); return }
    const timer = setTimeout(() => setFlyingElevated(true), 385)
    return () => clearTimeout(timer)
  }, [clickPhase])

  // Return step 1.5: double-RAF to commit translateX(0) before slide-right transition starts
  useEffect(() => {
    if (clickPhase === 'returning-pre-right') {
      let raf1: number, raf2: number
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setClickPhase('returning-right'))
      })
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
    }
  }, [clickPhase])

  // Return step 2 → 3: after card has slid right, slide it back left
  useEffect(() => {
    if (clickPhase === 'returning-right') {
      const timer = setTimeout(() => setClickPhase('returning-back'), 700)
      return () => clearTimeout(timer)
    }
  }, [clickPhase])

  const handleAnimationEnd = () => {
    if (clickPhase === 'flying') setClickPhase('center')
    if (clickPhase === 'returning-flip') setClickPhase('returning-pre-right')
  }

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform') return
    if (clickPhase === 'returning-back') setClickPhase(null)
  }

  const whiteCardStyle = (() => {
    // Forward: one seamless animation — slide right, wobble left, flip in
    // zIndex stays low until card clears the folder (flyingElevated), then promotes above it
    if (clickPhase === 'flying') {
      return {
        animation: 'cardFullFlyIn 1.2s forwards',
        zIndex: flyingElevated ? 20 : 2,
      }
    }
    // Settled after fly-in
    if (clickPhase === 'center') {
      return {
        transform: 'translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg) scale(1.04)',
        transition: 'transform 0.35s ease-out, box-shadow 0.4s ease-out',
        boxShadow: '0 10px 32px rgba(0,0,0,0.15), -5px -5px 14px rgba(0,0,0,0.18)',
        zIndex: 20,
      }
    }
    // Return step 1: flip back from 180° → 0°
    if (clickPhase === 'returning-flip') {
      return {
        animation: 'cardFlipBack 0.55s ease-in-out forwards',
        zIndex: 20,
      }
    }
    // Return step 1.5: commit translateX(0) with no transition (one paint frame)
    if (clickPhase === 'returning-pre-right') {
      return {
        transform: 'translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
        zIndex: 20,
      }
    }
    // Return step 2: slide right
    if (clickPhase === 'returning-right') {
      return {
        transform: 'translateX(280px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
        transition: 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: 'none',
        zIndex: 20,
      }
    }
    // Return step 3: slide back left into folder
    if (clickPhase === 'returning-back') {
      return {
        transform: 'translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
        transition: 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: 'none',
        zIndex: 2,
      }
    }
    return {
      transform: hovered
        ? 'translateX(38px) rotateZ(3deg) perspective(700px) rotateY(0deg)'
        : 'translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
      transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s ease-out',
      boxShadow: 'none',
      zIndex: 2,
    }
  })()

  const folderOpen = (hovered && !clickPhase) || clickPhase === 'returning-right' || clickPhase === 'returning-back'

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-neutral-200' style={{ fontFamily: 'var(--font-geist-mono)' }}>
      <style>{`
        @keyframes cardFullFlyIn {
          0% {
            transform: translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg) scale(1);
            box-shadow: none;
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          }
          32% {
            transform: translateX(280px) rotateZ(3deg) perspective(700px) rotateY(0deg) scale(1.04);
            box-shadow: 4px 6px 14px rgba(0,0,0,0.10);
            animation-timing-function: cubic-bezier(0.55, 0, 0.45, 1);
          }
          66% {
            transform: translateX(24px) rotateZ(-3deg) perspective(700px) rotateY(90deg) scale(1.06);
            box-shadow: 10px 18px 38px rgba(0,0,0,0.22);
            animation-timing-function: ease-out;
          }
          100% {
            transform: translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg) scale(1.04);
            box-shadow: 0 10px 32px rgba(0,0,0,0.15), -5px -5px 14px rgba(0,0,0,0.18);
          }
        }
        @keyframes textFlyVisible {
          0%   { opacity: 0; }
          5%   { opacity: 1; }
          26%  { opacity: 1; }
          32%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes cardFlipBack {
          0% {
            transform: translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg) scale(1.04);
            box-shadow: 0 10px 32px rgba(0,0,0,0.15), -5px -5px 14px rgba(0,0,0,0.18);
          }
          100% {
            transform: translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg) scale(1);
            box-shadow: none;
          }
        }
      `}</style>

      <div
        className='relative w-68 h-90 cursor-pointer'
        style={{ isolation: 'isolate' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Back card */}
        <div className='absolute inset-0 m-auto w-68 h-90 rounded-xl bg-[#2c52a7]' />

        {/* White card — preserve-3d so front/back faces work with backface-visibility */}
        <div
          className='absolute inset-0 m-auto w-64 h-78 rounded-xl'
          style={{ ...whiteCardStyle, transformStyle: 'preserve-3d' }}
          onAnimationEnd={handleAnimationEnd}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Front face — hidden when card flips past 90° */}
          <div
            className='absolute inset-0 rounded-xl bg-white overflow-hidden'
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p
              className='absolute top-5 right-3 text-xs uppercase tracking-widest'
              style={{
                writingMode: 'vertical-rl',
                textAlign: 'start',
                opacity: hovered || clickPhase !== null ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              do not open
            </p>
          </div>

          {/* Back face — pre-rotated 180° so it shows when card lands at 180° */}
          <div
            className='absolute inset-0 rounded-xl bg-white overflow-hidden flex flex-col'
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', padding: '28px 24px', gap: '16px' }}
          >
            <p className='text-[11px] uppercase tracking-widest text-black font-semibold'>classified</p>
            <p className='text-[9.5px] leading-relaxed text-black'>
              This document contains sensitive operational data. Access is restricted to authorised personnel only. Unauthorised disclosure is strictly prohibited.
            </p>
            <p className='text-[9.5px] leading-relaxed text-black'>
              All contents herein are protected under internal security protocol 7-C. Any reproduction or distribution without written consent will result in immediate disciplinary action.
            </p>
            {/* Mochi cat GIF — bottom right, white bg matches card */}
            <img
              src="https://media.tenor.com/TcMXxO_U0dgAAAAM/mochi-mochi-cat-peach.gif"
              alt="mochi cat"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 76,
                height: 76,
                objectFit: 'cover',
                borderBottomRightRadius: '0.75rem',
                filter: 'brightness(1.18)',
              }}
            />
          </div>
        </div>

        {/* Front cover — isolated perspective context */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, perspective: '900px' }}>
          <div
            className='absolute inset-0 rounded-xl bg-[#2958c8] px-4 py-6 flex flex-col justify-end'
            style={{
              transformOrigin: 'left center',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: folderOpen ? 'rotateY(-32deg)' : 'rotateY(0deg)',
            }}
          >
            <p className='uppercase text-sm text-white'>confidential files</p>
            <p className='text-white text-xs'>internal use only</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FolderCardAnimation;
