"use client"

import React, { useState } from 'react'
import Image from "next/image"
import DiscordImage from "../public/discord.png"
import whiteDiscord from "../public/whiteDiscord.svg"
import { AiOutlineDelete } from "react-icons/ai";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { GoLink } from "react-icons/go";
import { LuRectangleHorizontal } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";

const ease = [0.25, 0.1, 0.25, 1] as const;

const DiscordAnimation = () => {
  const [hovered, setHovered] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#0f0f12]' style={{ fontFamily: "var(--font-geist-sans)" }}>
      <LayoutGroup>
      <motion.div
        className='relative'
        animate={{
          width: '24%',
          height: isSmall ? '19%' : '50%',
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card */}
        <motion.div
          className='w-full h-full relative z-10'
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.15, ease }}
        >
          <div className='w-full h-full'>
            {!isSmall ? <Box /> : <SmallBox />}
          </div>
        </motion.div>

        {/* Delete Icon — top right */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className='absolute -top-5 -right-5 z-20'
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              style={{ originX: 0, originY: 1 }}
              transition={{ duration: 0.12, ease }}
            >
              {/* <DeleteIcon /> */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copy Icon — left side, comes from behind */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className='absolute top-4 -left-12'
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48 }}
              transition={{ duration: 0.1, ease }}
            >
              {/* <CopyIcon /> */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Box — bottom center, comes from behind */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className='absolute -bottom-4 left-1/2 -translate-x-1/2 z-20'
              initial={{ opacity: 0, y: -48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -48 }}
              transition={{ duration: 0.1, ease }}
            >
              <NavigationBox isSmall={isSmall} onToggle={setIsSmall} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </LayoutGroup>
    </div>
  )
}

export default DiscordAnimation;

const Box = () => {
  return (
   <div className='w-full h-full rounded-3xl bg-[#16161c]'>
    <div className='h-[20%] flex items-center justify-between p-4'>
        <div className='flex items-center justify-center'>
            <div className='mr-3 w-11 bg-[#5a65ee] h-11 rounded-full flex items-center justify-center'>
            <Image src={whiteDiscord} alt="Discord" width={24} height={24} className='brightness-0 invert' />
            </div>
            <div>
                <p className='text-[#e2e2e9]'>Monesh</p>
                <p className='text-sm text-[#6b6b7a]'>100+ members</p>
            </div>
        </div>
        <div className='border border-[#2a2a38] w-20 h-8 rounded-3xl flex items-center justify-center cursor-pointer'>
            <Image src={DiscordImage} alt="Discord" width={22} height={22} className='mr-2' />
            <span className='text-[#e2e2e9]'>Join</span>
        </div>
    </div>
    <div className='h-[77%] m-1.5 rounded-2xl bg-[#1c1c24] overflow-y-scroll no-scrollbar'>
        <BoxRow image="https://galaxypfp.com/wp-content/uploads/2025/12/aesthetic-pfp-profile-icon-style-shark.jpg" name="Sam" status="online" id="one" />
        <BoxRow image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20CJX-wY1zOOsvFS96N6BD3oMUAwSenN9FQ&s" name="James" status="idle" id="two" />
        <BoxRow image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCT5bgvbosj5aanRMSH7-VgBjplXhoGgJu9A&s" name="Kate" status="away" id="three" />
        <BoxRow image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj73dY7H7h4P-wCGNuldBIjXflrs9-3v6QHQ&s" name="Tom" status="do not disturb" id="four" />
        <BoxRow image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlXKB01rLgvrUT1DFzo-84UereS2PCnNR3w&s" name="Max" status="online" id="five" />
        <BoxRow image="https://galaxypfp.com/wp-content/uploads/2025/12/aesthetic-digital-icon-pfp-profile-art.jpg" name="Bill" status="online" id="six" />
    </div>
   </div>
  );
};

const SmallBox = () => {
  return (
   <div className='w-full h-full rounded-3xl bg-[#16161c]'>
    <div className='h-16 flex items-center justify-between p-4'>
        <div className='flex items-center justify-center'>
            <div className='mr-3 w-11 bg-[#5a65ee] h-11 rounded-full flex items-center justify-center'>
            <Image src={whiteDiscord} alt="Discord" width={24} height={24} className='brightness-0 invert' />
            </div>
            <div>
                <p className='text-[#e2e2e9]'>Monesh</p>
                <p className='text-sm text-[#6b6b7a]'>100+ members</p>
            </div>
        </div>
        <div className='border border-[#2a2a38] w-20 h-8 rounded-3xl flex items-center justify-center cursor-pointer'>
            <Image src={DiscordImage} alt="Discord" width={22} height={22} className='mr-2' />
            <span className='text-[#e2e2e9]'>Join</span>
        </div>
    </div>
    <div className='flex-1 m-1.5 rounded-2xl bg-[#1c1c24] flex items-center justify-center gap-2 py-3'>
       <motion.img layoutId='one' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://galaxypfp.com/wp-content/uploads/2025/12/aesthetic-pfp-profile-icon-style-shark.jpg" className='w-12 h-12 rounded-full' alt="" />
       <motion.img layoutId='two' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20CJX-wY1zOOsvFS96N6BD3oMUAwSenN9FQ&s" className='w-12 h-12 rounded-full' alt="" />
       <motion.img layoutId='three' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCT5bgvbosj5aanRMSH7-VgBjplXhoGgJu9A&s" className='w-12 h-12 rounded-full' alt="" />
       <motion.img layoutId='four' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj73dY7H7h4P-wCGNuldBIjXflrs9-3v6QHQ&s" className='w-12 h-12 rounded-full' alt="" />
       <motion.img layoutId='five' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlXKB01rLgvrUT1DFzo-84UereS2PCnNR3w&s" className='w-12 h-12 rounded-full' alt="" />
       <motion.img layoutId='six' transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} src="https://galaxypfp.com/wp-content/uploads/2025/12/aesthetic-digital-icon-pfp-profile-art.jpg" className='w-12 h-12 rounded-full' alt="" />
    </div>
   </div>
  );
};

const BoxRow = ({image, name, status, id}: {image: string, name: string, status: string, id: string}) => {
    return (
        <div className='w-full h-16 flex items-center px-3'>
            <motion.img layoutId={id} transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} src={image} alt="" className="mr-3 w-10 h-10 rounded-full object-cover" />
            <div>
                <p className='text-[#e2e2e9]'>{name}</p>
                <p className='text-[#6b6b7a]'>{status}</p>
            </div>
        </div>
    )
}

// const DeleteIcon = () => {
//     return(
//         <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow cursor-pointer'>
//             <AiOutlineDelete size={22} className='text-red-500' />
//         </div>
//     )
// }

const CopyIcon = () => {
    return(
        <div className='w-10 h-10 bg-[#1e1e28] border border-[#2a2a38] rounded-full flex items-center justify-center shadow cursor-pointer'>
            <GoLink size={22} className='text-[#e2e2e9]' />
        </div>
    )
}

const NavigationBox = ({ isSmall, onToggle }: { isSmall: boolean, onToggle: (v: boolean) => void }) => {
    return(
        <div className='h-10 bg-[#1e1e28] border border-[#2a2a38] rounded-full flex items-center justify-center shadow-lg px-3 gap-2'>
            <button
                onClick={() => onToggle(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer ${!isSmall ? 'bg-[#2e2e3a]' : 'hover:bg-[#252530]'}`}
            >
                <BiRectangle size={20} className={!isSmall ? 'text-[#e2e2e9]' : 'text-[#6b6b7a]'} />
            </button>
            <button
                onClick={() => onToggle(true)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer ${isSmall ? 'bg-[#2e2e3a]' : 'hover:bg-[#252530]'}`}
            >
                <LuRectangleHorizontal size={20} className={isSmall ? 'text-[#e2e2e9]' : 'text-[#6b6b7a]'} />
            </button>
        </div>
    )
}
