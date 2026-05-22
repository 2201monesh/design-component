'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const tabs = ['Bookmarks', 'Videos', 'Articles', 'Likes']

const TwitterTabsSwitchAnimation = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between w-[350px]'>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={`relative py-3 px-2 text-sm font-medium transition-colors duration-200 cursor-pointer
                ${active === i ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <span className='relative flex items-center gap-1'>
                {tab}
                {tab === 'Bookmarks' && (
                  <motion.span
                    animate={{ width: active === i ? 13 : 0 }}
                    transition={{ duration: 0.2, ease: 'linear' }}
                    className='overflow-hidden flex items-center'
                  >
                    <IoIosArrowDown size={13} className='shrink-0' />
                  </motion.span>
                )}
                {active === i && (
                  <motion.span
                    layoutId='underline'
                    className='absolute -bottom-1 left-0 w-full h-[2px] bg-neutral-900 rounded-full'
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className=' pt-6'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full mr-4 bg-neutral-300'></div>
              <div>
                <div className='flex items-center'>
                  <p className='text-sm mr-1'>Monesh Goyal</p>
                  <RiVerifiedBadgeFill className='mr-1 text-blue-500' />
                  <p className='text-neutral-500 text-xs mr-2'>@moneshgoyal</p>
                  <p className='text-xs text-neutral-500'>5h</p>
                </div>
                <p className='text-[12px] text-neutral-500'>Replying to <span className='text-yellow-400'>@tonystark</span></p>
              </div>
            </div>
            <div><HiOutlineDotsHorizontal className='cursor-pointer' /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwitterTabsSwitchAnimation;
