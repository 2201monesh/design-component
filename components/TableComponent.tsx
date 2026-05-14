import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

const TableComponent = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='border w-[70%] h-[85%] rounded-lg border-[#e0e0e0]'>
            <div className='w-full h-[7%] flex items-center justify-between px-2.5'>
                <div className='border outline-none rounded-md border-[#e0e0e0] h-[25px] text-sm w-[200px] flex items-center'>
                    <IoSearchOutline className='text-[#888888] w-[15%] mb-0.5' />
                    <input type="text" className='outline-none w-[85%] flex items-center' placeholder='Search' />
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center border px-1.5 py-1 rounded-md border-[#e0e0e0] mr-2 cursor-pointer'>
                        <LuLink className='mr-1.5 text-[#979797]' size={12} />
                        <p className='text-xs mr-1 text-neutral-700'>URL type</p>
                        <IoIosArrowDown className='text-[#979797]' size={14} />
                    </div>
                    <div className='border rounded-md border-[#e0e0e0] px-1.5 py-1 cursor-pointer'>
                        <FiUpload className='text-neutral-700' size={14} />
                    </div>
                </div>
            </div>
            <div className='h-10 border-b border-[#e0e0e0] bg-[#f8f8f8] table-col-div flex items-center px-3'>
                <span className='text-xs text-[#888888] w-8 shrink-0'>#</span>
                <span className='text-xs text-[#888888] flex-[3]'>URLs</span>
                <span className='text-xs text-[#888888] flex-1'>URL Type</span>
                <span className='text-xs text-[#888888] flex-1'>Mentioned</span>
                <span className='text-xs text-[#888888] flex-1'>Used Total</span>
                <span className='text-xs text-[#888888] flex-1'>First Seen</span>
                <span className='text-xs text-[#888888] flex-1'>Last Seen</span>
                <span className='text-xs text-[#888888] flex-1'>Updated</span>
                <span className='text-xs text-[#888888] flex-1'>Total</span>
            </div>
        </div>
    </div>
  )
}

export default TableComponent;