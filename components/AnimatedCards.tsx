"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, spring } from 'framer-motion'
import {cn} from "@/lib/utils"

type card = {
    title: string;
    description: string;
    skeleton: React.ReactNode;
    className: string;
    config: {
        y: number;
        x: number;
        rotate: number;
        zIndex: number;
    }
}

const AnimatedCards = () => {

    const cards = [
        {
            title: "Working Knowledge",
            description: "Practical skills and insights gained through hands-on experience that drive real-world problem solving.",
            skeleton: <div className='w-full h-50 rounded-lg bg-gradient-to-r from-orange-600 to-orange-600/60'></div>,
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
            skeleton: <div className='w-full h-50 rounded-lg bg-gradient-to-r from-neutral-300 to-neutral-300/60'></div>,
            className: "bg-stone-200 [&_h2]:text-black",
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
           skeleton: <div className='w-full h-50 rounded-lg bg-gradient-to-r from-blue-600 to-blue-600/60'></div>,
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
            skeleton: <div className='w-full h-50 rounded-lg bg-gradient-to-r from-purple-600 to-purple-600/60'></div>,
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
            skeleton: <div className='w-full h-50 rounded-lg bg-gradient-to-r from-rose-600 to-rose-600/60'></div>,
            className: "bg-rose-500",
            config: {
                y: 20,
                x: 720,
                zIndex: 7,
                rotate: -5
            }
        }
    ]

    const [active, setActive] = useState<card | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOtsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setActive(null);
            }
        }
        document.addEventListener("mousedown", handleOtsideClick);
        return () => {
           document.removeEventListener("mousedown", handleOtsideClick);
        }
    }, [])

    const isAnyCardActive = () => {
        return active?.title
    }

    const isCurrentActive = (card: card) => {
        return active?.title === card.title;
    }

  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <div ref={ref} className='max-w-5xl mx-auto w-full h-160 relative'>
            {cards.map((card, index) => <motion.div key={card.title}>
                <motion.button 
                onClick={() => setActive(card)}
                initial={{
                    y: 400,
                    x: 0,
                    scale: 0,
                    filter: "blur(10px)"
                }}
                animate={{
                    y: isCurrentActive(card) ? 0 : (isAnyCardActive() ? 400 : card.config.y),
                    x: isCurrentActive(card) ? 320 : (isAnyCardActive() ? card.config.x * 0.6 + 200 : card.config.x),
                    rotate: isCurrentActive(card) ? 0 : (isAnyCardActive() ? card.config.rotate * 0.2 : card.config.rotate),
                    scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.7 : 1),
                    width: isCurrentActive(card) ? 400 : 321,
                    height: isCurrentActive(card) ? 500 : 400,
                    filter: "blur(0px)"
                }} 
                whileHover={{
                    scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.7 : 1.05)
                }}
                transition={{
                    type: spring,
                    stiffness: 100,
                    damping: 15
                }}
                className={cn('w-80 p-8 rounded-2xl absolute inset-0 flex flex-col justify-between items-start overflow-hidden cursor-pointer', card.className)}>
                    {card.skeleton}
                    <div>
                      <motion.h2 layoutId={card.title + "title"} className='text-2xl max-w-40 text-white font-signika font-bold text-left'>{card.title}</motion.h2>
                    <AnimatePresence mode='popLayout'>
                      {isAnyCardActive() && (<motion.p
                       layoutId={card.title + "description"}
                       initial={{opacity: 0, x: 20, y:20, height: 0}}
                       animate={{opacity: 1, x: 0, y:0, height: 100}}
                       exit={{opacity: 0, x: 40, y:40, height: 0}}
                       className='text-white/80 text-lg mt-3 text-left'>
                        {card.description}
                        </motion.p>
                       )}
                     </AnimatePresence>
                    </div>
                </motion.button>
            </motion.div>)}
        </div>
    </div>
  )
}

export default AnimatedCards