'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const tabs = ['Bookmarks', 'Videos', 'Articles', 'Likes']

const TwitterTabsSwitchAnimation = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col h-[300px]'>
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
                    <AnimatePresence>
                      {active === i && (
                        <motion.span
                          key='arrow'
                          initial={{ x: -14, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -14, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'linear' }}
                          className='flex items-center shrink-0'
                        >
                          <IoIosArrowDown size={13} />
                        </motion.span>
                      )}
                    </AnimatePresence>
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
        {active === 0 && (
          <div className='pt-6 w-[350px]'>
            <div className='flex items-start'>
              <img src='https://i.pinimg.com/736x/3d/36/c2/3d36c23f2c42fcc5991c5abb80ee579c.jpg' alt='moneshgoyal' className='w-10 h-10 rounded-full mr-4 shrink-0 object-cover bg-neutral-300' />
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <p className='text-sm mr-1'>Monesh Goyal</p>
                    <RiVerifiedBadgeFill className='mr-1 text-blue-500' />
                    <p className='text-neutral-500 text-xs mr-2'>@moneshgoyal</p>
                    <p className='text-xs text-neutral-500'>5h</p>
                  </div>
                  <HiOutlineDotsHorizontal className='cursor-pointer' />
                </div>
                <p className='text-[12px] text-neutral-500 mb-2'>Replying to <span className='text-yellow-400'>@tonystark</span></p>
                <p className='text-sm leading-5 tracking-normal'>Framer Motion makes UI animations feel effortless - just describe the state and let it handle the rest.</p>
                <p className='text-sm leading-5 tracking-normal mt-3'>The tab switcher with the sliding underline and arrow reveal is a great example of how small motion details elevate the whole experience.</p>
                <p className='text-sm leading-5 tracking-normal mt-3'>Subtle is always better.</p>
              </div>
            </div>
          </div>
        )}
        {active === 1 && (
          <div className='pt-6 w-[350px]'>
            <div className='flex items-start'>
              <img src='https://i.pinimg.com/736x/1f/d0/26/1fd026649d01411791060693175166f9.jpg' alt='moneshgoyal' className='w-10 h-10 rounded-full mr-4 shrink-0 object-cover bg-neutral-300' />
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <p className='text-sm mr-1'>Leo Topez</p>
                    <RiVerifiedBadgeFill className='mr-1 text-blue-500' />
                    <p className='text-neutral-500 text-xs mr-2'>@leotopez</p>
                    <p className='text-xs text-neutral-500'>5h</p>
                  </div>
                  <HiOutlineDotsHorizontal className='cursor-pointer' />
                </div>
                <p className='text-[12px] text-neutral-500 mb-2'>Replying to <span className='text-yellow-400'>@rohitk23</span></p>
                <p className='text-sm leading-5 tracking-normal'>Finally shipped the 60fps scroll linked scrubber. Here is a 12s screen capture - no cuts, no speed ramp - just the interaction.</p>
                <p className='text-sm leading-5 tracking-normal mt-3 text-blue-500'>animations.dev/clips/transitions-v1</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwitterTabsSwitchAnimation;
