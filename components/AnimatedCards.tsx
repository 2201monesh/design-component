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
            skeleton: <div className='w-full h-50 rounded-2xl overflow-hidden'>
                <svg className='w-full h-full' viewBox='0 0 320 200' preserveAspectRatio='xMidYMid slice'>
                    {Array.from({length: 25}).map((_, i) => {
                        const col = i % 5;
                        const row = Math.floor(i / 5);
                        const cx = 32 + col * 62 + (i % 3) * 8 - 8;
                        const cy = 20 + row * 38 + (i % 4) * 6 - 6;
                        const r = 7 + (i % 5) * 4;
                        return (
                            <circle key={i} cx={cx} cy={cy} r={r} stroke="white" strokeWidth="0.8" fill="none"
                                className='ring-circle'
                                style={{animationDuration: `${2.5 + (i % 5) * 0.45}s`, animationDelay: `${-(i * 0.35)}s`}}
                            />
                        );
                    })}
                </svg>
            </div>,
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
            skeleton: <div className='w-full h-50 rounded-2xl overflow-hidden p-2 flex flex-col gap-[2px]'>
                {Array.from({length: 9}).map((_, r) => (
                    <div key={r} className='flex gap-[2px]'>
                        {Array.from({length: 14}).map((_, c) => (
                            <div
                                key={c}
                                className='github-square flex-1'
                                style={{height: 16, backgroundColor: '#524736', animationDelay: `${(c * 0.15 + (r * 0.6 % 2)).toFixed(2)}s`}}
                            />
                        ))}
                    </div>
                ))}
            </div>,
            className: "bg-stone-200 [&_h2]:text-[#524736] [&_p]:text-[#524736]/60",
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
           skeleton: <div className='w-full h-50 rounded-2xl overflow-hidden'>
                <svg className='w-full h-full' viewBox='0 0 320 200' preserveAspectRatio='xMidYMid slice'>
                    {[0,1,2,3,4,5,6,7,8].map((i) => (
                        <g key={i} transform={`translate(0, ${12 + i * 22})`}>
                            <path
                                d="M -80 0 Q -60 -14 -40 0 Q -20 14 0 0 Q 20 -14 40 0 Q 60 14 80 0 Q 100 -14 120 0 Q 140 14 160 0 Q 180 -14 200 0 Q 220 14 240 0 Q 260 -14 280 0 Q 300 14 320 0 Q 340 -14 360 0 Q 380 14 400 0"
                                stroke="white"
                                strokeWidth="0.8"
                                fill="none"
                                strokeOpacity={0.15 + (i % 3) * 0.2}
                                className='wave-line'
                                style={{animationDuration: `${2 + (i % 4) * 0.4}s`, animationDelay: `${-(i * 0.3)}s`}}
                            />
                        </g>
                    ))}
                </svg>
            </div>,
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
            skeleton: <div className='w-full h-50 rounded-2xl overflow-hidden'>
                <svg className='w-full h-full' viewBox='0 0 320 200' preserveAspectRatio='xMidYMid slice'>
                    {Array.from({length: 14}).map((_, i) => {
                        const x = 15 + (i % 5) * 62 + (i % 3) * 18;
                        const y = 10 + Math.floor(i / 5) * 65 + (i % 4) * 12;
                        const len = 18 + (i % 4) * 7;
                        return (
                            <line key={i}
                                x1={x} y1={y} x2={x + len} y2={y + len}
                                stroke="#004d00" strokeWidth="1.2" strokeLinecap="round"
                                className='shoot-star'
                                style={{animationDuration: `${2.2 + (i % 5) * 0.45}s`, animationDelay: `${-(i * 0.55).toFixed(2)}s`}}
                            />
                        );
                    })}
                </svg>
            </div>,
            className: "bg-[#53f399] [&_h2]:text-[#004d00] [&_p]:text-[#004d00]/60",
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
            skeleton: <div className='w-full h-50 rounded-2xl overflow-hidden'>
                <svg className='w-full h-full' viewBox='0 0 320 200' preserveAspectRatio='xMidYMid slice'>
                    {[
                        {x1: 0,   x2: 320, opacity: 0.35, width: 0.7},
                        {x1: 40,  x2: 280, opacity: 0.2,  width: 0.5},
                        {x1: 0,   x2: 200, opacity: 0.3,  width: 0.6},
                        {x1: 80,  x2: 320, opacity: 0.15, width: 0.5},
                        {x1: 0,   x2: 320, opacity: 0.25, width: 0.7},
                        {x1: 20,  x2: 240, opacity: 0.2,  width: 0.5},
                        {x1: 0,   x2: 320, opacity: 0.3,  width: 0.6},
                    ].map((line, i) => (
                        <line key={i}
                            x1={line.x1} y1={100} x2={line.x2} y2={100}
                            stroke="white" strokeWidth={line.width} strokeOpacity={line.opacity}
                            className='scan-line'
                            style={{animationDuration: '4s', animationDelay: `${-(i * (4 / 7)).toFixed(2)}s`}}
                        />
                    ))}
                </svg>
            </div>,
            className: "bg-neutral-800",
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
                className={cn('w-80 p-5 rounded-3xl absolute inset-0 flex flex-col justify-between items-start overflow-hidden cursor-pointer', card.className)}>
                    {card.skeleton}
                    <div>
                      <motion.h2 layoutId={card.title + "title"} className='text-4xl max-w-40 text-white font-signika font-bold text-left'>{card.title}</motion.h2>
                    <AnimatePresence mode='popLayout'>
                      {isCurrentActive(card) && (<motion.p
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