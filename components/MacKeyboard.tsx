"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  TbBrightnessDown, TbBrightnessUp, TbLayoutGrid, TbApps,
  TbSunLow, TbSun, TbPlayerSkipBack, TbPlayerPlay,
  TbPlayerSkipForward, TbVolumeOff, TbVolume, TbVolume2,
  TbFingerprint, TbCommand, TbArrowLeft, TbArrowRight,
  TbArrowUp, TbArrowDown, TbChevronUp,
} from 'react-icons/tb'

// ─── audio ─────────────────────────────────────────────────────────────────────
let audioCtx: AudioContext | null = null

function playKeyClick() {
  if (typeof window === 'undefined') return
  if (!audioCtx) audioCtx = new AudioContext()
  const ctx = audioCtx
  const t = ctx.currentTime

  // ── layer 1: pitched body (scissor-switch "thock") ──────────────────────────
  // A sine wave that sweeps quickly from ~220 Hz down to ~55 Hz mimics the
  // physical resonance of a key bottom-out on a membrane/scissor mechanism.
  const body = ctx.createOscillator()
  const bodyEnv = ctx.createGain()
  body.type = 'sine'
  body.frequency.setValueAtTime(220, t)
  body.frequency.exponentialRampToValueAtTime(55, t + 0.028)
  bodyEnv.gain.setValueAtTime(0.52, t)
  bodyEnv.gain.exponentialRampToValueAtTime(0.0001, t + 0.048)
  body.connect(bodyEnv)
  bodyEnv.connect(ctx.destination)
  body.start(t)
  body.stop(t + 0.055)

  // ── layer 2: attack transient (the crisp "click" at initial contact) ────────
  // A very short noise burst (6 ms) high-passed above 3 kHz gives the
  // sharp leading edge without sounding harsh.
  const atkFrames = Math.floor(ctx.sampleRate * 0.006)
  const atkBuf = ctx.createBuffer(1, atkFrames, ctx.sampleRate)
  const atkData = atkBuf.getChannelData(0)
  for (let i = 0; i < atkFrames; i++) {
    atkData[i] = (Math.random() * 2 - 1) * (1 - i / atkFrames)
  }
  const atk = ctx.createBufferSource()
  atk.buffer = atkBuf
  const hpf = ctx.createBiquadFilter()
  hpf.type = 'highpass'
  hpf.frequency.value = 3500
  const atkGain = ctx.createGain()
  atkGain.gain.value = 0.22
  atk.connect(hpf)
  hpf.connect(atkGain)
  atkGain.connect(ctx.destination)
  atk.start(t)
}

// ─── dimensions ────────────────────────────────────────────────────────────────
const K = 38
const G = 4

// ─── shadow ────────────────────────────────────────────────────────────────────
const KEY_SHADOW =
  'inset 0 -2px 0 rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.82), 0 1px 2px rgba(0,0,0,0.13)'
const KEY_SHADOW_PRESSED =
  'inset 0 -1px 0 rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.55), 0 0 1px rgba(0,0,0,0.08)'

// ─── context ───────────────────────────────────────────────────────────────────
const PressedKeysCtx = createContext<Set<string>>(new Set())

// ─── base key ──────────────────────────────────────────────────────────────────
type KeyProps = {
  children?: React.ReactNode
  w?: number
  h?: number
  className?: string
  extraRadius?: string
  keyCode?: string
}

const Key = ({ children, w = K, h = K, className = '', extraRadius = '', keyCode }: KeyProps) => {
  const pressedKeys = useContext(PressedKeysCtx)
  const isPressed = !!keyCode && pressedKeys.has(keyCode)

  return (
    <button
      className={`bg-white flex items-center justify-center select-none cursor-pointer
        rounded-[5px] transition-transform duration-75 ${extraRadius} ${className}`}
      style={{
        width: w,
        height: h,
        minWidth: w,
        boxShadow: isPressed ? KEY_SHADOW_PRESSED : KEY_SHADOW,
        transform: isPressed ? 'scale(0.98)' : undefined,
      }}
      onMouseDown={e => {
        e.currentTarget.style.boxShadow = KEY_SHADOW_PRESSED
        e.currentTarget.style.transform = 'scale(0.98)'
        playKeyClick()
      }}
      onMouseUp={e => {
        e.currentTarget.style.boxShadow = KEY_SHADOW
        e.currentTarget.style.transform = ''
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = KEY_SHADOW
        e.currentTarget.style.transform = ''
      }}
    >
      {children}
    </button>
  )
}

// ─── specialised key types ──────────────────────────────────────────────────────
const AlphaKey = ({ label, w = K, keyCode }: { label: string; w?: number; keyCode?: string }) => (
  <Key w={w} className="text-[13px] font-medium text-neutral-700" keyCode={keyCode}>
    {label}
  </Key>
)

const NumKey = ({ num, sym, w = K, keyCode }: { num: string; sym: string; w?: number; keyCode?: string }) => (
  <Key w={w} keyCode={keyCode}>
    <div className="flex flex-col items-center justify-center" style={{ gap: 1 }}>
      <span className="text-[10px] leading-none text-neutral-400 font-normal">{sym}</span>
      <span className="text-[12px] leading-none text-neutral-700 font-medium">{num}</span>
    </div>
  </Key>
)

const FnRow = ({ children, w, extraRadius = '', keyCode }: { children: React.ReactNode; w: number; extraRadius?: string; keyCode?: string }) => (
  <Key w={w} h={28} extraRadius={extraRadius} className="text-neutral-500" keyCode={keyCode}>
    {children}
  </Key>
)

const WideKey = ({
  children, w, h = K, extraRadius = '', className = '', keyCode,
}: { children: React.ReactNode; w: number; h?: number; extraRadius?: string; className?: string; keyCode?: string }) => (
  <Key w={w} h={h} extraRadius={extraRadius} className={className} keyCode={keyCode}>
    {children}
  </Key>
)

const ModifierKey = ({
  label, symbol, w, extraRadius = '', keyCode,
}: { label: string; symbol: React.ReactNode; w: number; extraRadius?: string; keyCode?: string }) => (
  <Key w={w} extraRadius={extraRadius} keyCode={keyCode}>
    <div className="flex flex-col items-center justify-center leading-none" style={{ gap: 2 }}>
      <span className="text-[8px] text-neutral-400">{label}</span>
      <span className="text-neutral-600">{symbol}</span>
    </div>
  </Key>
)

// ─── keyboard ──────────────────────────────────────────────────────────────────
export default function MacKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [typedText, setTypedText] = useState('')
  const [visible, setVisible] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetFade = () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    if (clearTimer.current) clearTimeout(clearTimer.current)
    setVisible(true)
    fadeTimer.current = setTimeout(() => {
      setVisible(false)
      clearTimer.current = setTimeout(() => setTypedText(''), 400)
    }, 1200)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
      setPressedKeys(prev => {
        if (prev.has(e.code)) return prev
        playKeyClick()
        return new Set(prev).add(e.code)
      })

      if (e.key === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1))
        resetFade()
      } else if (e.key.length === 1) {
        setTypedText(prev => prev + e.key)
        resetFade()
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => {
        const next = new Set(prev)
        next.delete(e.code)
        return next
      })
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <PressedKeysCtx.Provider value={pressedKeys}>
      <div className="flex flex-col items-center" style={{ gap: 28 }}>

      {/* ── typed text display ── */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence>
          {visible && typedText && (
            <motion.p
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl tracking-wide text-neutral-700 font-light"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {typedText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div
        className="rounded-2xl flex flex-col overflow-x-auto"
        style={{ backgroundColor: '#d1d1d6', padding: 12, gap: G }}
      >
        {/* ── fn / media row ── */}
        <div className="flex" style={{ gap: G }}>
          <FnRow w={K} extraRadius="rounded-tl-xl" keyCode="Escape">
            <span className="text-[10px] font-medium text-neutral-600">esc</span>
          </FnRow>

          {[
            { icon: <TbBrightnessDown size={14} />, code: 'F1' },
            { icon: <TbBrightnessUp size={14} />, code: 'F2' },
            { icon: <TbLayoutGrid size={14} />, code: 'F3' },
            { icon: <TbApps size={14} />, code: 'F4' },
          ].map(k => <FnRow key={k.code} w={K} keyCode={k.code}>{k.icon}</FnRow>)}

          <div style={{ width: 8 }} />

          {[
            { icon: <TbSunLow size={14} />, code: 'F5' },
            { icon: <TbSun size={14} />, code: 'F6' },
          ].map(k => <FnRow key={k.code} w={K} keyCode={k.code}>{k.icon}</FnRow>)}

          <div style={{ width: 8 }} />

          {[
            { icon: <TbPlayerSkipBack size={14} />, code: 'F7' },
            { icon: <TbPlayerPlay size={14} />, code: 'F8' },
            { icon: <TbPlayerSkipForward size={14} />, code: 'F9' },
          ].map(k => <FnRow key={k.code} w={K} keyCode={k.code}>{k.icon}</FnRow>)}

          <div style={{ width: 8 }} />

          {[
            { icon: <TbVolumeOff size={14} />, code: 'F10' },
            { icon: <TbVolume size={14} />, code: 'F11' },
            { icon: <TbVolume2 size={14} />, code: 'F12' },
          ].map(k => <FnRow key={k.code} w={K} keyCode={k.code}>{k.icon}</FnRow>)}

          <FnRow w={K} extraRadius="rounded-tr-xl">
            <TbFingerprint size={14} />
          </FnRow>
        </div>

        {/* ── number row ── */}
        <div className="flex" style={{ gap: G }}>
          <NumKey num="`"  sym="~" keyCode="Backquote" />
          <NumKey num="1"  sym="!" keyCode="Digit1" />
          <NumKey num="2"  sym="@" keyCode="Digit2" />
          <NumKey num="3"  sym="#" keyCode="Digit3" />
          <NumKey num="4"  sym="$" keyCode="Digit4" />
          <NumKey num="5"  sym="%" keyCode="Digit5" />
          <NumKey num="6"  sym="^" keyCode="Digit6" />
          <NumKey num="7"  sym="&" keyCode="Digit7" />
          <NumKey num="8"  sym="*" keyCode="Digit8" />
          <NumKey num="9"  sym="(" keyCode="Digit9" />
          <NumKey num="0"  sym=")" keyCode="Digit0" />
          <NumKey num="-"  sym="_" keyCode="Minus" />
          <NumKey num="="  sym="+" keyCode="Equal" />
          <WideKey w={78} className="text-[11px] font-medium text-neutral-600" keyCode="Backspace">delete</WideKey>
        </div>

        {/* ── QWERTY row ── */}
        <div className="flex" style={{ gap: G }}>
          <WideKey w={58} className="text-[11px] font-medium text-neutral-600" keyCode="Tab">tab</WideKey>
          {'QWERTYUIOP'.split('').map(l => <AlphaKey key={l} label={l} keyCode={`Key${l}`} />)}
          <NumKey num="["  sym="{" keyCode="BracketLeft" />
          <NumKey num="]"  sym="}" keyCode="BracketRight" />
          <NumKey num="\\" sym="|" w={58} keyCode="Backslash" />
        </div>

        {/* ── home row ── */}
        <div className="flex" style={{ gap: G }}>
          <WideKey w={70} className="text-[11px] font-medium text-neutral-600" keyCode="CapsLock">caps lock</WideKey>
          {'ASDFGHJKL'.split('').map(l => <AlphaKey key={l} label={l} keyCode={`Key${l}`} />)}
          <NumKey num=";"  sym=":" keyCode="Semicolon" />
          <NumKey num="'"  sym={'"'} keyCode="Quote" />
          <WideKey w={88} className="text-[11px] font-medium text-neutral-600" keyCode="Enter">return</WideKey>
        </div>

        {/* ── shift row ── */}
        <div className="flex" style={{ gap: G }}>
          <WideKey w={88} className="text-[11px] font-medium text-neutral-600" keyCode="ShiftLeft">shift</WideKey>
          {'ZXCVBNM'.split('').map(l => <AlphaKey key={l} label={l} keyCode={`Key${l}`} />)}
          <NumKey num="," sym="<" keyCode="Comma" />
          <NumKey num="." sym=">" keyCode="Period" />
          <NumKey num="/" sym="?" keyCode="Slash" />
          <WideKey w={112} className="text-[11px] font-medium text-neutral-600" keyCode="ShiftRight">shift</WideKey>
        </div>

        {/* ── bottom row ── */}
        <div className="flex" style={{ gap: G }}>
          <WideKey w={46} extraRadius="rounded-bl-xl" className="text-[10px] font-medium text-neutral-600" keyCode="Fn">fn</WideKey>
          <ModifierKey label="control" symbol={<TbChevronUp size={12} />}         w={46} keyCode="ControlLeft" />
          <ModifierKey label="option"  symbol={<span className="text-[13px] leading-none">⌥</span>} w={46} keyCode="AltLeft" />
          <ModifierKey label="command" symbol={<TbCommand size={13} />}            w={64} keyCode="MetaLeft" />

          <Key w={158} keyCode="Space" />

          <ModifierKey label="command" symbol={<TbCommand size={13} />}            w={64} keyCode="MetaRight" />
          <ModifierKey label="option"  symbol={<span className="text-[13px] leading-none">⌥</span>} w={46} keyCode="AltRight" />

          <Key w={K} className="text-neutral-500" keyCode="ArrowLeft"><TbArrowLeft size={15} /></Key>

          <div className="flex flex-col" style={{ gap: G }}>
            <Key w={K} h={(K - G) / 2} className="text-neutral-500" keyCode="ArrowUp"><TbArrowUp size={11} /></Key>
            <Key w={K} h={(K - G) / 2} className="text-neutral-500" keyCode="ArrowDown"><TbArrowDown size={11} /></Key>
          </div>

          <Key w={K} extraRadius="rounded-br-xl" className="text-neutral-500" keyCode="ArrowRight">
            <TbArrowRight size={15} />
          </Key>
        </div>
      </div>

      </div>
    </PressedKeysCtx.Provider>
  )
}
