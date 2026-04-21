import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import SomeoneImage from "../public/someone-text.png"
import Image from 'next/image';
import { LuInbox } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci";
import { PiWarningCircle } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const EmailProductDesign = () => {
  return (
    <div className='bg-[#ebebeb] h-full w-full flex items-center justify-center'>
      <div className='w-180 h-110 bg-white rounded-tl-4xl'>
        <div className='header w-full h-[18%] flex items-center pl-4'>
          {/* <p className='text-[40px] mr-6'>someone</p> */}
          <Image src={SomeoneImage} alt='text' className='mr-5' />
          <div className='w-40 h-10 mt-1 rounded-full bg-[#f7f7f7] flex items-center mr-6'>
            <div className='bg-white h-[35px] w-20 rounded-full flex items-center justify-center ml-[3.5px] text-sm'>Email</div>
            <div className='w-25 flex items-center justify-center text-sm'>Profile</div>
          </div>
          <div className='bg-[#f7f7f7] w-100 h-10 mt-1 rounded-l-full flex items-center pl-6'>
            <IoSearchOutline className='mr-2 text-[#7e7e7e]' />
            <span className='text-[#7e7e7e]'>Search</span>
          </div>
        </div>
        <div className='w-full h-[82%] flex'>
          <div className='w-[46%] px-7 flex flex-col'>
            <div className='w-full h-12 rounded-full bg-[#f9f9f9] flex items-center justify-between px-4'>
              <LuInbox size={22} />
              <VscSend size={22} />
              <CiFileOn size={22} />
              <PiWarningCircle size={22} />
              <CiStar size={26} />
              <AiOutlineDelete size={22} />
            </div>
            <div className='mt-5 w-full px-4 overflow-y-hidden'>
              <TextTemplate heading="Arc Studio" date="Today" subHeading="Your website draft is ready" para="We've uploaded the first pass of the homepage. Would love your feedback on..." />
              <TextTemplate heading="Stripe" date="Tomorrow" subHeading="Your payout has been processed" para="A transfer of $2,480.00 has been sent to your bank account. It should arrive within 1-2 b..." />
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
    <div className='flex flex-col mb-6'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold'>{heading}</p>
        <p className='text-xs'>{date}</p>
      </div>
      <p className='text-xs'>{subHeading}</p>
      <p className='text-xs'>{para}</p>
    </div>
  )
}

