import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import SomeoneImage from "../public/someone-text.png"
import Image from 'next/image';
import { LuInbox, LuSend, LuFile, LuCircleAlert, LuStar, LuTrash2 } from "react-icons/lu";

const EmailProductDesign = () => {
  return (
    <div className='bg-[#ebebeb] h-full w-full flex items-center justify-center font-[var(--font-inter)]'>
      <div className='w-180 h-110 bg-white rounded-tl-4xl'>
        <div className='header w-full h-[18%] flex items-center pl-4'>
          {/* <p className='text-[40px] mr-6'>someone</p> */}
          <Image src={SomeoneImage} alt='text' className='mr-5' />
          <div className='h-9 rounded-full bg-[#f7f7f7] flex items-center p-[3px] mr-6'>
            <div className='bg-white h-full px-5 rounded-full flex items-center justify-center text-[13px] font-medium tracking-tight'>Email</div>
            <div className='px-5 flex items-center justify-center text-[13px] text-[#9a9a9a]'>Profile</div>
          </div>
          <div className='bg-[#f7f7f7] w-100 h-9 rounded-l-full flex items-center pl-6'>
            <IoSearchOutline className='mr-2 text-[#7e7e7e]' />
            <span className='text-[#7e7e7e]'>Search</span>
          </div>
        </div>
        <div className='w-full h-[82%] flex'>
          <div className='w-[46%] px-7 flex flex-col'>
            <div className='w-full h-12 rounded-full bg-[#f9f9f9] flex items-center justify-between px-4'>
              <LuInbox size={18} />
              <LuSend size={18} />
              <LuFile size={18} />
              <LuCircleAlert size={18} />
              <LuStar size={18} />
              <LuTrash2 size={18} />
            </div>
            <div className='mt-5 w-full px-4 overflow-y-hidden'>
              <TextTemplate heading="Arc Studio" date="Today" subHeading="Your website draft is ready" para="We've uploaded the first pass of the homepage. Would love your feedback on the remaining set..." />
              <TextTemplate heading="Stripe" date="Tomorrow" subHeading="Your payout has been processed" para="A transfer of $2,480.00 has been sent to your bank account. It should arrive within 1-2 busin..." />
              <TextTemplate heading="Github" date="Yesterday" subHeading="Security alert for one of your repositories" para="We detected  a dependency with a known vulnerability. Review the alert to keep you..." />
              <TextTemplate heading="Notion" date="Yesterday" subHeading='You were mentioned in "Product Roadmap"' para="We've uploaded the first pass of the homepage. Would love your feedback on lay..." />
            </div>
          </div>
          <div className='border-2 rounded-tl-2xl border-[#f1f1f1] w-[54%]'></div>
        </div>
      </div>
    </div>
  )
}

export default EmailProductDesign;

const TextTemplate = ({heading, date, subHeading, para}) => {
  return(
    <div className='flex flex-col mb-4'>
      <div className='flex items-center justify-between'>
        <p className='text-[13px] font-semibold mb-0.5'>{heading}</p>
        <p className='text-[11px] text-[#9a9a9a]'>{date}</p>
      </div>
      <p className='text-[12px] font-medium text-[#222]'>{subHeading}</p>
      <p className='text-[11px] text-[#9a9a9a] leading-relaxed'>{para}</p>
    </div>
  )
}

