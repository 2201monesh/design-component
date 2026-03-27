'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 28 }

function CardOutline() {
  return (
    <motion.div
      layoutId="card-outline"
      transition={SPRING}
      className="absolute -inset-1.5 rounded-lg pointer-events-none"
    >
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />
    </motion.div>
  )
}

const HoverEffect = () => {
  const [hovered, setHovered] = useState<string>('outer')

  const bind = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered('outer'),
  })

  return (
    <div
      className="relative w-[25%] h-[50%] border rounded-lg border-neutral-200 flex flex-col p-8 gap-4"
      {...bind('outer')}
    >
      {hovered === 'outer' && <CardOutline />}

      <div
        className={`relative w-full h-[50%] border rounded-lg border-neutral-200 transition-colors duration-200 ${hovered === 'top' ? 'bg-blue-500/5' : ''}`}
        {...bind('top')}
      >
        {hovered === 'top' && <CardOutline />}
      </div>

      <div className="w-full h-[50%] flex gap-4">
        <div
          className={`relative w-[40%] border h-full rounded-lg border-neutral-200 transition-colors duration-200 ${hovered === 'bottom-left' ? 'bg-blue-500/5' : ''}`}
          {...bind('bottom-left')}
        >
          {hovered === 'bottom-left' && <CardOutline />}
        </div>
        <div
          className={`relative w-[60%] h-full border rounded-lg border-neutral-200 transition-colors duration-200 ${hovered === 'bottom-right' ? 'bg-blue-500/5' : ''}`}
          {...bind('bottom-right')}
        >
          {hovered === 'bottom-right' && <CardOutline />}
        </div>
      </div>
    </div>
  )
}

export default HoverEffect
