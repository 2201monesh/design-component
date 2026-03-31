'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import GreptileImage from "../public/greptile-color.png"
import GrokImage from "../public/figma-color.png"
import SlackImage from "../public/slack.png"
import ElevenLabsImage from "../public/perplexity-color.png"
import CursorImage from "../public/meta-color.png"

const SelectCardsAnimation = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-[30%] h-[65%] border flex flex-col items-center justify-center bg-[#fcfcfc] gap-y-4 overflow-hidden'>
            <div
                className='relative overflow-hidden'
                style={{
                    width: '432px',
                    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
            >
                <div className='flex gap-2' style={{ animation: 'marquee 8s linear infinite', width: 'max-content' }}>
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                </div>
            </div>

            <SecondRow />

            <div
                className='relative overflow-hidden'
                style={{
                    width: '432px',
                    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
            >
                <div className='flex gap-2' style={{ animation: 'marquee 8s linear infinite', width: 'max-content' }}>
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                    <Box /><Box /><Box /><Box /><Box /><Box /><Box /><Box />
                </div>
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

const SecondRow = () => {
    const [selected, setSelected] = useState<Set<number>>(new Set())

    const toggle = (i: number) =>
        setSelected(prev => {
            const next = new Set(prev)
            next.has(i) ? next.delete(i) : next.add(i)
            return next
        })

    return (
        <div className='flex gap-2'>
            {secondRowImages.map(({ src, alt }, i) => (
                <div
                    key={i}
                    onClick={() => toggle(i)}
                    className={`relative w-20 h-20 border rounded-2xl flex items-center justify-center shrink-0 bg-white cursor-pointer transition-colors duration-200 ${selected.has(i) ? 'border-green-500' : 'border-neutral-300'}`}
                >
                    <Image src={src} alt={alt} width={32} height={32} className='object-contain' />
                    {selected.has(i) && (
                        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center animate-tick'>
                            <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
                                <path d='M2 5.5L4.5 8L9 3' stroke='white' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </div>
                    )}
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
