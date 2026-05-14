'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'

const tabs = ['Bookmarks', 'Videos', 'Articles', 'Likes']

const TwitterTabsSwitchAnimation = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex items-center'>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer
              ${active === i ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <span className='relative flex items-center gap-1'>
              {tab}
              {tab === 'Bookmarks' && (
                <span className='w-[13px] overflow-hidden flex items-center'>
                  <AnimatePresence>
                    {active === i && (
                      <motion.span
                        key='arrow'
                        initial={{ x: 14, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -14, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'linear' }}
                        className='flex items-center'
                      >
                        <IoIosArrowDown size={13} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
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
    </div>
  )
}

export default TwitterTabsSwitchAnimation;
