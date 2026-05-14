import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

const rows = [
  { url: 'https://app.octolane.com/dashboard', type: 'Internal', mentioned: 12, usedTotal: 45, firstSeen: 'Jan 12, 2024', lastSeen: 'May 10, 2025', updated: 'May 11, 2025', total: 57 },
  { url: 'https://docs.stripe.com/api/customers', type: 'External', mentioned: 8, usedTotal: 23, firstSeen: 'Feb 3, 2024', lastSeen: 'Apr 28, 2025', updated: 'May 1, 2025', total: 31 },
  { url: 'https://cdn.example.com/assets/logo.png', type: 'CDN', mentioned: 3, usedTotal: 102, firstSeen: 'Mar 15, 2024', lastSeen: 'May 9, 2025', updated: 'May 9, 2025', total: 105 },
  { url: 'https://api.github.com/repos/user/repo', type: 'API', mentioned: 21, usedTotal: 67, firstSeen: 'Nov 20, 2023', lastSeen: 'May 7, 2025', updated: 'May 8, 2025', total: 88 },
  { url: 'https://old.site.com/page', type: 'Redirect', mentioned: 5, usedTotal: 18, firstSeen: 'Jun 1, 2024', lastSeen: 'Mar 30, 2025', updated: 'Apr 2, 2025', total: 23 },
  { url: 'https://analytics.google.com/g/collect', type: 'API', mentioned: 0, usedTotal: 340, firstSeen: 'Sep 5, 2023', lastSeen: 'May 11, 2025', updated: 'May 11, 2025', total: 340 },
  { url: 'https://fonts.googleapis.com/css2?family=Inter', type: 'External', mentioned: 1, usedTotal: 89, firstSeen: 'Oct 12, 2023', lastSeen: 'May 10, 2025', updated: 'May 10, 2025', total: 90 },
  { url: 'https://app.octolane.com/dashboard', type: 'Internal', mentioned: 12, usedTotal: 45, firstSeen: 'Jan 12, 2024', lastSeen: 'May 10, 2025', updated: 'May 11, 2025', total: 57 },
  { url: 'https://docs.stripe.com/api/customers', type: 'External', mentioned: 8, usedTotal: 23, firstSeen: 'Feb 3, 2024', lastSeen: 'Apr 28, 2025', updated: 'May 1, 2025', total: 31 },
  { url: 'https://cdn.example.com/assets/logo.png', type: 'CDN', mentioned: 3, usedTotal: 102, firstSeen: 'Mar 15, 2024', lastSeen: 'May 9, 2025', updated: 'May 9, 2025', total: 105 },
  { url: 'https://api.github.com/repos/user/repo', type: 'API', mentioned: 21, usedTotal: 67, firstSeen: 'Nov 20, 2023', lastSeen: 'May 7, 2025', updated: 'May 8, 2025', total: 88 },
  { url: 'https://old.site.com/page', type: 'Redirect', mentioned: 5, usedTotal: 18, firstSeen: 'Jun 1, 2024', lastSeen: 'Mar 30, 2025', updated: 'Apr 2, 2025', total: 23 },
  { url: 'https://analytics.google.com/g/collect', type: 'API', mentioned: 0, usedTotal: 340, firstSeen: 'Sep 5, 2023', lastSeen: 'May 11, 2025', updated: 'May 11, 2025', total: 340 },
  { url: 'https://fonts.googleapis.com/css2?family=Inter', type: 'External', mentioned: 1, usedTotal: 89, firstSeen: 'Oct 12, 2023', lastSeen: 'May 10, 2025', updated: 'May 10, 2025', total: 90 },
]

const typeChip: Record<string, string> = {
  Internal: 'bg-blue-50 text-blue-600',
  External: 'bg-green-50 text-green-600',
  CDN: 'bg-teal-50 text-teal-600',
  API: 'bg-purple-50 text-purple-600',
  Redirect: 'bg-orange-50 text-orange-600',
}

const TableComponent = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='border w-[70%] h-[85%] rounded-lg border-[#e0e0e0] flex flex-col overflow-hidden'>
            <div className='w-full shrink-0 h-[7%] flex items-center justify-between px-2.5'>
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
            <div className='h-10 shrink-0 border-b border-[#e0e0e0] bg-[#f8f8f8] table-col-div grid grid-cols-[2rem_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center px-3'>
                <span className='text-xs text-[#888888]'>#</span>
                <span className='text-xs text-[#888888]'>URLs</span>
                <span className='text-xs text-[#888888]'>URL Type</span>
                <span className='text-xs text-[#888888]'>Mentioned</span>
                <span className='text-xs text-[#888888]'>Used Total</span>
                <span className='text-xs text-[#888888]'>First Seen</span>
                <span className='text-xs text-[#888888]'>Last Seen</span>
                <span className='text-xs text-[#888888]'>Updated</span>
                <span className='text-xs text-[#888888]'>Total</span>
            </div>
            <div className='flex-1 overflow-y-auto no-scrollbar'>
                {rows.map((row, i) => (
                    <div key={i} className='grid grid-cols-[2rem_3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center px-3 h-10 border-b border-[#f5f5f5]'>
                        <span className='text-xs text-neutral-400'>{i + 1}</span>
                        <span className='text-xs text-neutral-700 truncate pr-4'>{row.url}</span>
                        <span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeChip[row.type]}`}>{row.type}</span>
                        </span>
                        <span className='text-xs text-neutral-600'>{row.mentioned}</span>
                        <span className='text-xs text-neutral-600'>{row.usedTotal}</span>
                        <span className='text-xs text-neutral-500'>{row.firstSeen}</span>
                        <span className='text-xs text-neutral-500'>{row.lastSeen}</span>
                        <span className='text-xs text-neutral-500'>{row.updated}</span>
                        <span className='text-xs text-neutral-600'>{row.total}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TableComponent;
