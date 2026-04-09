'use client'
import React, { useState } from 'react'

const FolderCardAnimation = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ perspective: '900px' }}
      className='w-screen h-screen flex items-center justify-center'
    >
      <div
        className='relative w-68 h-90 cursor-pointer'
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Back card — peeks from the right as cover opens */}
        <div className='absolute inset-0 m-auto w-68 h-90 rounded-xl bg-[#2c52a7]' />

        {/* Front cover — hinge on left, right side swings back slightly */}
        <div
          className='absolute inset-0 rounded-xl bg-[#2958c8] px-4 py-6 flex flex-col justify-end'
          style={{
            transformOrigin: 'left center',
            transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: hovered ? 'rotateY(-32deg)' : 'rotateY(0deg)',
          }}
        >
          <p className='uppercase text-sm text-white'>confidential files</p>
          <p className='text-white text-xs'>internal use only</p>
        </div>
      </div>
    </div>
  )
}

export default FolderCardAnimation;
