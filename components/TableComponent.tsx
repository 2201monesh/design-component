import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

const TableComponent = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='border w-[70%] h-[85%] rounded-lg border-[#e0e0e0]'>
            <div className='w-full h-[7%] border-b border-[#e0e0e0] flex items-center justify-between px-2.5'>
                <div className='border outline-none rounded-md border-[#e0e0e0] h-[25px] text-sm w-[200px] flex items-center'>
                    <IoSearchOutline className='text-[#888888] w-[15%] mb-0.5' />
                    <input type="text" className='outline-none w-[85%] flex items-center' placeholder='Search' />
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center border px-1.5 py-1 rounded-md border-[#e0e0e0] mr-2'>
                        <LuLink className='mr-1.5 text-[#979797]' size={12} />
                        <p className='text-xs mr-1 text-neutral-700'>URL type</p>
                        <IoIosArrowDown className='text-[#979797]' size={14} />
                    </div>
                    <div className='border rounded-md border-[#e0e0e0] px-1.5 py-1'>
                        <FiUpload className='text-neutral-700' size={14} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableComponent;