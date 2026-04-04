"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {cn} from "@/lib/utils"

const AnimatedCards = () => {

    const cards = [
        {
            title: "Working Knowledge",
            description: "Practical skills and insights gained through hands-on experience that drive real-world problem solving.",
            skeleton: <></>,
            className: "bg-orange-500",
            config: {
                y: -20,
                x: 0,
                zIndex: 2,
                rotate: -15
            }
        },
        {
            title: "Practical Demonstration",
            description: "Step-by-step walkthrough that showcase techniques and best practices in action.",
            skeleton: <></>,
            className: "bg-stone-200",
            config: {
                y: 20,
                x: 180,
                zIndex: 3,
                rotate: 8
            }
        },
        {
            title: "Collaborate with AI",
            description: "Leverage artificial intelligence as a creative partner to enhance productivity and innovation",
            skeleton: <></>,
            className: "bg-blue-500",
            config: {
                y: -80,
                x: 360,
                zIndex: 5,
                rotate: -5
            }
        },
        {
            title: "Means & Methods",
            description: "Proven strategies and methadologies that streamline workflows and optimize outcomes.",
            skeleton: <></>,
            className: "bg-purple-500",
            config: {
                y: 20,
                x: 540,
                zIndex: 5,
                rotate: 12
            }
        },
        {
            title: "Interface Kit",
            description: "A comprehensive collection of UI components and patterns for building beautiful interfaces.",
            skeleton: <></>,
            className: "bg-rose-500",
            config: {
                y: 20,
                x: 720,
                zIndex: 7,
                rotate: -5
            }
        }
    ]

  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <div className='max-w-5xl mx-auto w-full h-160 relative'>
            {cards.map((card, index) => <motion.div key={card.title}>
                <motion.button animate={{
                    y: card.config.y,
                    x: card.config.x,
                    rotate: card.config.rotate,
                    scale: 1,
                    width: 320,
                    height: 400
                }} className={cn('w-80 p-8 rounded-2xl absolute inset-0 flex flex-col justify-between items-start overflow-hidden', card.className)}>
                    {card.skeleton}
                    <div>
                      <motion.h2 className='text-2xl font-bold text-left'>{card.title}</motion.h2>
                    </div>
                </motion.button>
            </motion.div>)}
        </div>
    </div>
  )
}

export default AnimatedCards