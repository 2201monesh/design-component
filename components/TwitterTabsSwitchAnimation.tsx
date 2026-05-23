'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IconMessage, IconRepeat, IconHeart, IconChartBar, IconBookmark, IconUpload, IconRosetteDiscountCheckFilled } from "@tabler/icons-react";

const tabs = ['Bookmarks', 'Videos', 'Articles', 'Likes']

const TwitterTabsSwitchAnimation = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col h-[400px]'>
        <div className='flex items-center justify-start w-[350px]'>
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
                          initial={{ x: -14, opacity: 0, scale: 0 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ x: -14, opacity: 0, scale: 0 }}
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
                    className='absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400 rounded-full'
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className='overflow-hidden flex-1 w-[350px]'>
          <motion.div
            animate={{ x: active * -350 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='flex'
          >
            {/* Bookmarks panel */}
            <div className='w-[350px] shrink-0 pt-6'>
              <div className='flex items-start'>
                <img src='https://i.pinimg.com/736x/3d/36/c2/3d36c23f2c42fcc5991c5abb80ee579c.jpg' alt='moneshgoyal' className='w-10 h-10 rounded-full mr-4 shrink-0 object-cover bg-neutral-300' />
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <p className='text-sm mr-1'>Monesh Goyal</p>
                      <IconRosetteDiscountCheckFilled size={15} className='mr-1 text-blue-500' />
                      <p className='text-neutral-500 text-xs mr-2'>@moneshgoyal</p>
                      <p className='text-xs text-neutral-500'>5h</p>
                    </div>
                    <HiOutlineDotsHorizontal className='cursor-pointer' />
                  </div>
                  <p className='text-[12px] text-neutral-500 mb-2'>Replying to <span className='text-yellow-400'>@benjitaylor</span></p>
                  <p className='text-sm leading-5 tracking-normal'>Framer Motion makes UI animations feel effortless - just describe the state and let it handle the rest.</p>
                  <p className='text-sm leading-5 tracking-normal mt-3'>The tab switcher with the sliding underline and arrow reveal is a great example of how small motion details elevate the whole experience.</p>
                  <p className='text-sm leading-5 tracking-normal mt-3'>Subtle is always better.</p>
                  <p className='text-sm text-yellow-400 mt-3 cursor-pointer'>show more</p>
                  <div className='flex items-center justify-between mt-3 text-neutral-500'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconMessage size={16} stroke={1.5} />
                      <span className='text-xs'>8</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconRepeat size={16} stroke={1.5} />
                      <span className='text-xs'>7</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconHeart size={16} stroke={1.5} />
                      <span className='text-xs'>267</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconChartBar size={16} stroke={1.5} />
                      <span className='text-xs'>12K</span>
                    </div>
                    <div>
                      <IconBookmark size={16} stroke={1.5} className='text-blue-500 cursor-pointer' fill='currentColor' />
                    </div>
                    <div>
                      <IconUpload size={16} stroke={1.5} className='cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Videos panel */}
            <div className='w-[350px] shrink-0 pt-6'>
              <div className='flex items-start'>
                <img src='https://i.pinimg.com/736x/1f/d0/26/1fd026649d01411791060693175166f9.jpg' alt='leotopez' className='w-10 h-10 rounded-full mr-4 shrink-0 object-cover bg-neutral-300' />
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <p className='text-sm mr-1'>Leo Topez</p>
                      <IconRosetteDiscountCheckFilled size={15} className='mr-1 text-blue-500' />
                      <p className='text-neutral-500 text-xs mr-2'>@leotopez</p>
                      <p className='text-xs text-neutral-500'>5h</p>
                    </div>
                    <HiOutlineDotsHorizontal className='cursor-pointer' />
                  </div>
                  <p className='text-[12px] text-neutral-500 mb-2'>Replying to <span className='text-yellow-400'>@yashsehgaldev</span></p>
                  <p className='text-sm leading-5 tracking-normal'>Finally shipped the 60fps scroll linked scrubber. Here is a 12s screen capture - no cuts, no speed ramp - just the interaction.</p>
                  <p className='text-sm leading-5 tracking-normal mt-3 text-blue-500'>animations.dev/clips/transitions-v1</p>
                </div>
              </div>
            </div>
            {/* Articles panel (empty) */}
            <div className='w-[350px] shrink-0 pt-6'>
              <div className='flex items-start'>
                <img src='https://i.pinimg.com/1200x/25/ae/cb/25aecb24e0da22d3e1f07a7ed8f8d5f9.jpg' alt='moneshgoyal' className='w-10 h-10 rounded-full mr-4 shrink-0 object-cover bg-neutral-300' />
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <p className='text-sm mr-1'>Suri Yaku</p>
                      <IconRosetteDiscountCheckFilled size={15} className='mr-1 text-blue-500' />
                      <p className='text-neutral-500 text-xs mr-2'>@yakusuri</p>
                      <p className='text-xs text-neutral-500'>7h</p>
                    </div>
                    <HiOutlineDotsHorizontal className='cursor-pointer' />
                  </div>
                  <p className='text-sm leading-5 tracking-normal mt-4'>Just published a deep dive on design systems — why most teams build them too early, and what to do instead.</p>
                  <div className='mt-3 rounded-xl border border-neutral-200 overflow-hidden'>
                    <img src='https://i.pinimg.com/736x/4b/82/a1/4b82a1019e25d32a95210ee208429fe6.jpg' alt='article preview' className='w-full h-28 object-cover' />
                    <div className='px-3 py-2'>
                      <p className='text-xs font-semibold text-neutral-800 leading-4'>Design Systems Are Overrated (Until They&apos;re Not)</p>
                      <p className='text-[11px] text-neutral-400 mt-0.5'>yakusuri.dev · 6 min read</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-3 text-neutral-500'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconMessage size={16} stroke={1.5} />
                      <span className='text-xs'>16</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconRepeat size={16} stroke={1.5} />
                      <span className='text-xs'>77</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconHeart size={16} stroke={1.5} />
                      <span className='text-xs'>895</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                      <IconChartBar size={16} stroke={1.5} />
                      <span className='text-xs'>47K</span>
                    </div>
                    <div>
                      <IconBookmark size={16} stroke={1.5} className='text-blue-500 cursor-pointer' fill='currentColor' />
                    </div>
                    <div>
                      <IconUpload size={16} stroke={1.5} className='cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Likes panel (empty) */}
            <div className='w-[350px] shrink-0' />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TwitterTabsSwitchAnimation;
