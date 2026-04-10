'use client'
import React, { useState, useEffect } from 'react'

type ClickPhase = null | 'right' | 'center' | 'returning-flip' | 'returning-pre-right' | 'returning-right' | 'returning-back'

const FolderCardAnimation = () => {
  const [hovered, setHovered] = useState(false)
  const [clickPhase, setClickPhase] = useState<ClickPhase>(null)
  const [centerSettled, setCenterSettled] = useState(false)

  const handleClick = () => {
    if (clickPhase === 'center') {
      setCenterSettled(false)
      setClickPhase('returning-flip')
      return
    }
    if (clickPhase !== null) return
    setClickPhase('right')
  }

  // Forward: after slide-right pause, start fly-in
  useEffect(() => {
    if (clickPhase === 'right') {
      const timer = setTimeout(() => setClickPhase('center'), 480)
      return () => clearTimeout(timer)
    }
  }, [clickPhase])

  // Return step 1.5: one double-RAF after flip ends to commit translateX(0) before transitioning
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
    if (clickPhase === 'center') {
      setCenterSettled(true)
    }
    // Return step 1 done: flip complete → commit translateX(0) explicitly for one frame
    // before starting the slide-right transition (avoids instant-jump bug)
    if (clickPhase === 'returning-flip') {
      setClickPhase('returning-pre-right')
    }
  }

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Return step 3 done: slide-back complete → reset everything
    if (e.propertyName === 'transform' && clickPhase === 'returning-back') {
      setClickPhase(null)
    }
  }

  const whiteCardStyle = (() => {
    if (clickPhase === 'right') {
      return {
        transform: 'translateX(280px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
        transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s ease-out',
        boxShadow: 'none',
        zIndex: 2,
      }
    }
    if (clickPhase === 'center') {
      if (centerSettled) {
        return {
          transform: 'translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg)',
          transition: 'transform 0.35s ease-out, box-shadow 0.4s ease-out',
          boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
          zIndex: 20,
        }
      }
      return {
        animation: 'cardFlyIn 0.9s linear forwards',
        zIndex: 20,
      }
    }
    // Return step 1: flip card back from 180° → 0° in place
    if (clickPhase === 'returning-flip') {
      return {
        animation: 'cardFlipBack 0.55s ease-in-out forwards',
        zIndex: 20,
      }
    }
    // Return step 1.5: explicit translateX(0) with no transition — gives browser a paint frame
    if (clickPhase === 'returning-pre-right') {
      return {
        transform: 'translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg)',
        zIndex: 20,
      }
    }
    // Return step 2: slide right (transition starts from current pos = translateX 0)
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

  // Folder opens on hover (no click) and also during the return slide-right phase
  const folderOpen = (hovered && !clickPhase) || clickPhase === 'returning-right'

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-neutral-300'>
      <style>{`
        @keyframes cardFlyIn {
          0% {
            transform: translateX(280px) rotateZ(3deg) perspective(700px) rotateY(0deg);
            box-shadow: 4px 6px 14px rgba(0,0,0,0.10);
            animation-timing-function: ease-in;
          }
          50% {
            transform: translateX(24px) rotateZ(-3deg) perspective(700px) rotateY(90deg);
            box-shadow: 10px 18px 38px rgba(0,0,0,0.22);
            animation-timing-function: ease-out;
          }
          100% {
            transform: translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg);
            box-shadow: 0 10px 32px rgba(0,0,0,0.15);
          }
        }
        @keyframes cardFlipBack {
          0% {
            transform: translateX(0px) rotateZ(-5deg) perspective(700px) rotateY(180deg);
            box-shadow: 0 10px 32px rgba(0,0,0,0.15);
          }
          100% {
            transform: translateX(0px) rotateZ(3deg) perspective(700px) rotateY(0deg);
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
                opacity: hovered || clickPhase === 'right' || clickPhase === 'returning-right' ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              do not open
            </p>
          </div>

          {/* Back face — pre-rotated 180° so it shows when card lands at 180° */}
          <div
            className='absolute inset-0 rounded-xl bg-white overflow-hidden'
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          />
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
