import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import SomeoneImage from "../public/someone-text.png"
import Image from 'next/image';
import { LuInbox, LuSend, LuFile, LuCircleAlert, LuStar, LuTrash2 } from "react-icons/lu";
import { RiNotionFill } from "react-icons/ri";

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
            <IoSearchOutline className='mr-2 text-[#7e7e7e]' size={16} />
            <span className='text-[#7e7e7e] text-[13px]'>Search</span>
          </div>
        </div>
        <div className='w-full h-[82%] flex'>
          <div className='w-[46%] px-7 flex flex-col'>
            <div className='w-full h-12 rounded-full bg-[#f9f9f9] flex items-center justify-between px-4'>
              <LuInbox size={18} className='text-[#7e7e7e]' />
              <LuSend size={18} className='text-[#7e7e7e]' />
              <LuFile size={18} className='text-[#7e7e7e]' />
              <LuCircleAlert size={18} className='text-[#7e7e7e]' />
              <LuStar size={18} className='text-[#7e7e7e]' />
              <LuTrash2 size={18} className='text-[#7e7e7e]' />
            </div>
            <div className='mt-5 w-full px-4 overflow-y-hidden'>
              <TextTemplate heading="Arc Studio" date="Today" subHeading="Your website draft is ready" para="We've uploaded the first pass of the home page. Would love your feedback on the rem..." />
              <TextTemplate heading="Stripe" date="Tomorrow" subHeading="Your payout has been processed" para="A transfer of $2,480.00 has been sent to your bank account. It should arrive within 1-2 bu..." />
              <TextTemplate heading="Notion" date="Yesterday" subHeading='You were mentioned in "Product 2026"' para="@emir added a comment asking for your input on Q2 priorities." />
              <TextTemplate heading="Github" date="Yesterday" subHeading="Security alert for one of your repositories" para="We detected  a dependency with a known vulnerability. Review the alert to keep you..." />
            </div>
          </div>
          <div className='border-2 rounded-tl-2xl border-[#f1f1f1] w-[54%]'>
            <div className='w-full h-16 border-b-2 border-[#f1f1f1] flex items-center px-4'>
              <div className='w-10 h-10 rounded-full bg-[#f7f7f7] flex items-center justify-center mr-4'>
                <RiNotionFill size={26} />
              </div>
              <div className=''>
                <div className='flex items-center'>
                  <p className='text-[14px] font-semibold mr-2'>Notion</p>
                  <p className='text-[13px] text-[#7e7e7e]'>Yesterday</p>
                </div>
                <div className='text-[13px] font-medium'>You were mentioned in "Product 2026"</div>
              </div>
            </div>
            <div className='w-full h-18'>
                <RiNotionFill size={38} className='ml-8 mt-5' />
            </div>
            <div className='pl-8 w-full'>
              <p className='text-[14px] mb-4'>Hi Emir,</p>
              <p className='text-[14px] mb-4'>You were mentioned by Alex in the page Product 2026</p>
              <div className='border-l-4 h-8 w-full italic text-[#7e7e7e] pl-2 flex items-center text-[14px] mb-4'>"Can you review the email service scope and confirm</div>
              <p className='text-[14px] mb-4'>The comment is on the Q1 Deliverables section and may</p>
              <p className='text-[14px]'>Open the page to reply or resolve the comment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailProductDesign;

const TextTemplate = ({heading, date, subHeading, para}) => {
  return(
    <div className='flex flex-col pb-4 mb-4 border-b border-[#f0f0f0] last:border-b-0 last:mb-0 last:pb-0'>
      <div className='flex items-center justify-between mb-1'>
        <p className='text-[13px] font-semibold text-[#111]'>{heading}</p>
        <p className='text-[11px] text-[#9a9a9a]'>{date}</p>
      </div>
      <p className='text-[12px] font-medium text-[#333] mb-0.5'>{subHeading}</p>
      <p className='text-[11px] text-[#9a9a9a] leading-relaxed'>{para}</p>
    </div>
  )
}

