import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import SomeoneImage from "../public/someone-text.png"
import Image from 'next/image';


const EmailProductDesign = () => {
  return (
    <div className='bg-[#ebebeb] h-full w-full flex items-center justify-center'>
      <div className='w-180 h-110 bg-white rounded-tl-4xl'>
        <div className='header w-full h-[18%] flex items-center pl-6'>
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
          <div className='w-[46%] px-9'>
            <p>hello</p>
          </div>
          <div className='border w-[54%]'>hiii</div>
        </div>
      </div>
    </div>
  )
}

export default EmailProductDesign

