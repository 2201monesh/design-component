import React from 'react'

const BookCardAnimation = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-100">
      <div className="[perspective:900px]">
        <div className="relative w-[520px] h-[340px] [transform-style:preserve-3d]">

          {/* Left page */}
          <div className="absolute left-0 top-0 w-[260px] h-[340px] origin-right [transform:rotateY(30deg)] bg-white rounded-tl-2xl rounded-bl-2xl" />

          {/* Right page */}
          <div className="absolute right-0 top-0 w-[260px] h-[340px] origin-left [transform:rotateY(-30deg)] bg-white rounded-tr-2xl rounded-br-2xl" />

          {/* Spine — very subtle */}
          <div className="absolute left-1/2 top-0 w-px h-[340px] [margin-left:-0.5px] bg-[rgba(160,150,140,0.25)] z-10" />

        </div>
      </div>
    </div>
  )
}

export default BookCardAnimation
