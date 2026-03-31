'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import GreptileImage from "../public/greptile-color.png"
import GrokImage from "../public/figma-color.png"
import SlackImage from "../public/slack.png"
import ElevenLabsImage from "../public/perplexity-color.png"
import CursorImage from "../public/meta-color.png"

const marqueeStyle: React.CSSProperties = {
    width: '432px',
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
}

const SelectCardsAnimation = () => {
    const [selected, setSelected] = useState<Set<number>>(new Set())
    const [confirmed, setConfirmed] = useState(false)

    const toggle = (i: number) => {
        if (confirmed) return
        setSelected(prev => {
            const next = new Set(prev)
            next.has(i) ? next.delete(i) : next.add(i)
            return next
        })
    }

    useEffect(() => {
        if (!confirmed) return
        // morph: 0.25s + svg fade: 0.35s + wait: 0.3s ≈ 0.9s
        const timer = setTimeout(() => {
            setConfirmed(false)
            setSelected(new Set())
        }, 900)
        return () => clearTimeout(timer)
    }, [confirmed])

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-[30%] h-[65%] flex flex-col items-center justify-center bg-[#fcfcfc] gap-y-4 overflow-hidden'>
            <div className='relative overflow-hidden' style={marqueeStyle}>
                <div className='flex gap-2' style={{ animation: 'marquee 8s linear infinite', width: 'max-content' }}>
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                </div>
            </div>

            <SecondRow selected={selected} onToggle={toggle} />

            <div className='relative' style={{ width: '432px' }}>
                <div className='overflow-hidden' style={marqueeStyle}>
                    <div className='flex gap-2' style={{ animation: 'marquee 8s linear infinite', width: 'max-content' }}>
                        <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                        <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                    </div>
                </div>
                <AnimatePresence>
                    {selected.size >= 2 && (
                        <motion.div
                            key='overlay'
                            className='absolute inset-0 flex items-center justify-center'
                            exit={{ opacity: 0, scale: 0.85, transition: { ease: 'easeIn', duration: 0.2 } }}
                        >
                            {!confirmed ? (
                                <motion.button
                                    layoutId='confirm-shape'
                                    onClick={() => setConfirmed(true)}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.22, ease: 'easeIn' }}
                                    style={{ transformOrigin: 'bottom center', borderRadius: 9999 }}
                                    className='px-9 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium cursor-pointer'
                                >
                                    Confirm
                                </motion.button>
                            ) : (
                                <motion.div
                                    layoutId='confirm-shape'
                                    transition={{ layout: { ease: 'linear', duration: 0.25 } }}
                                    style={{ borderRadius: 9999 }}
                                    className='w-9 h-9 bg-blue-600 flex items-center justify-center'
                                >
                                    <motion.svg
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15, duration: 0.2, ease: 'easeOut' }}
                                        width='18' height='18' viewBox='0 0 18 18' fill='none'
                                    >
                                        <path d='M3.5 9L7.5 13L14.5 5' stroke='white' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
                                    </motion.svg>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            @keyframes tick-appear {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            .animate-tick {
                animation: tick-appear 0.28s ease forwards;
            }
            @keyframes confirm-appear {
                0%   { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            .animate-confirm {
                transform-origin: bottom center;
                animation: confirm-appear 0.22s ease-out forwards;
            }
        `}</style>
    </div>
  )
}

export default SelectCardsAnimation;

const secondRowImages = [
    { src: GreptileImage, alt: 'greptile' },
    { src: GrokImage,    alt: 'grok'     },
    { src: SlackImage,   alt: 'slack'    },
    { src: ElevenLabsImage, alt: 'elevenlabs' },
    { src: CursorImage,  alt: 'cursor'   },
]

const SecondRow = ({ selected, onToggle }: { selected: Set<number>; onToggle: (i: number) => void }) => {
    return (
        <div className='flex gap-2'>
            {secondRowImages.map(({ src, alt }, i) => (
                <div
                    key={i}
                    onClick={() => onToggle(i)}
                    className={`relative w-20 h-20 border rounded-2xl flex items-center justify-center shrink-0 bg-white cursor-pointer transition-colors duration-200 ${selected.has(i) ? 'border-green-500' : 'border-neutral-300'}`}
                >
                    <Image src={src} alt={alt} width={32} height={32} className='object-contain' />
                    <AnimatePresence>
                        {selected.has(i) && (
                            <motion.div
                                key='tick'
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } }}
                                exit={{ scale: 0, opacity: 0, transition: { ease: 'easeIn', duration: 0.18 } }}
                                className='absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center'
                            >
                                <svg width='9' height='9' viewBox='0 0 11 11' fill='none'>
                                    <path d='M2 5.5L4.5 8L9 3' stroke='white' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

const Box = ({ src, alt, dark }: { src?: any; alt?: string; dark?: boolean }) => {
    return(
        <div className={`w-20 h-20 border rounded-2xl flex items-center justify-center shrink-0 ${src ? 'border-neutral-300' : 'border-neutral-200'} ${dark ? 'bg-neutral-900' : 'bg-white'}`}>
            {src && <Image src={src} alt={alt ?? ''} width={44} height={44} className='object-contain' />}
        </div>
    )
}
