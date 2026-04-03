'use client'
import React, { useRef, useState, useEffect } from 'react'

const NavBarScrollAnimation = () => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const [atLeft, setAtLeft] = useState(true)
  const [atRight, setAtRight] = useState(false)

  useEffect(() => {
    const el = navbarRef.current
    if (!el) return

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      setAtLeft(scrollLeft === 0)
      setAtRight(scrollLeft + clientWidth >= scrollWidth - 1)
    }

    checkScroll()
    el.addEventListener('scroll', checkScroll)
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const cardStyle = {
    borderTopLeftRadius: atRight ? '0' : '0.75rem',
    borderTopRightRadius: atLeft ? '0' : '0.75rem',
    borderBottomLeftRadius: '0.75rem',
    borderBottomRightRadius: '0.75rem',
    transition: 'border-radius 0.2s ease',
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
        <div ref={navbarRef} className='w-140 h-10 navbar overflow-x-scroll no-scrollbar'>
            <div className='w-236 h-full flex items-center justify-between bg-white'>
                <div className='w-96 h-full flex items-center justify-center bg-neutral-100 rounded-br-xl'>
                    <div className='first-scroll w-132 h-full flex overflow-x-scroll no-scrollbar'>
                      <NavbarActionBox image="https://github.com/shadcn.png" text='new component for sidebar' />
                      <NavbarActionBox image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/500px-Slack_icon_2019.svg.png" text='Monesh (DM) - 28 new messages' />
                      <NavbarActionBox image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" text='how to center a div in more' />
                    </div>
                </div>
                <div className='w-44 h-full bg-neutral-100'>
                  <div className='w-44 h-full rounded-t-xl bg-white'></div>
                </div>
                <div className='w-96 h-full flex items-center justify-center rounded-bl-xl bg-neutral-100'>
                    <div className='first-scroll w-132 h-full flex overflow-x-scroll no-scrollbar'>
                      <NavbarActionBox image="https://img.freepik.com/premium-vector/twitter-new-x-logo-design-vector_1340851-70.jpg?semt=ais_incoming&w=740&q=80" text='define on X: "Smooth UX"' />
                      <NavbarActionBox image="https://images.icon-icons.com/2642/PNG/512/google_mail_gmail_logo_icon_159346.png" text='Inbox (6,829) - goyalmonesh' />
                      <NavbarActionBox image="https://static.vecteezy.com/system/resources/thumbnails/018/930/572/small_2x/youtube-logo-youtube-icon-transparent-free-png.png" text='(159) build strong motion' />
                    </div>
                </div>
            </div>
        </div>
        <div className='card w-140 h-100 border' style={cardStyle}>

        </div>
    </div>
  )
}

export default NavBarScrollAnimation;

const NavbarActionBox = ({ image, text }: { image?: string, text?: string }) => {
    return (
        <div className='w-44 h-full rounded-lg shrink-0 flex items-center justify-between px-1.5'>
            <div className='flex items-center min-w-0'>
                <img src={image} className='mr-2 w-5 h-5 rounded-full shrink-0 flex items-center justify-center'></img>
                <span className='text-sm truncate'>{text}</span>
            </div>
            {/* <span>x</span> */}
        </div>
    )
}
