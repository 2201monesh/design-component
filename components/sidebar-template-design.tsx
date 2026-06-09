import { MdKeyboardArrowDown } from "react-icons/md";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { LuBrain, LuSearch } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { PiArrowsClockwise } from "react-icons/pi";
import { LuCopy } from "react-icons/lu"
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const SidebarTemplateDesign = () => {
  return (
    <div className='w-190 h-140 flex items-end outer-div border-l border-l-neutral-200' style={{ backgroundImage: "url('https://i.pinimg.com/736x/a4/8d/40/a48d40b86c7bc07e316fb5dcf67c5338.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='w-170 h-120 rounded-tr-3xl bg-[#ECECEE] flex font-sans'>
            <div className='w-[45%] h-full rounded-tr-3xl bg-[#FFFFFF] overflow-hidden'>
                <div className='h-16 border-b border-b-neutral-200 flex items-center justify-end px-6'>
                    <div className='border border-neutral-200 divide-x divide-neutral-200 flex items-center rounded-lg text-sm cursor-pointer'>
                        <button className="pl-3.5 pr-3 py-1 cursor-pointer">Save as</button>
                        <button className="pl-1.5 pr-2 py-1 cursor-pointer"><MdKeyboardArrowDown size={18} /></button>
                    </div>
                </div>
                <div className="mt-8 text-div">
                    <h1 className="text-lg">Memorandum</h1>
                    <div className="-ml-12 mt-4 space-y-4 px-6">
                        <p className="text-xs text-neutral-500 leading-5">speed up diligence and cut down on manual review cycles, ensuring faster and more stable detection running in test environments with improved coverage across all systems.</p>
                        <p className="text-xs text-neutral-500 leading-5">s, expected to unlock end-to-end tracking of turnaround times and reduced duplication of effort with concise</p>
                        <p className="text-xs text-neutral-500 leading-5">enabling faster adoption across investment, legal, and ops teams.</p>
                        <p className="text-xs text-neutral-500 leading-5">panel to support fast adoptions and streamline the approval process for all major transactions requiring board review and legal sign-off.</p>
                    </div>
                </div>
            </div>
            <div className="w-[55%] h-full">
                <div className='h-16 w-full border-b border-b-neutral-200 flex items-center px-6 justify-between'>
                    <div className="flex items-center">
                        <div className="mr-2 w-9 h-9 rounded-full" style={{ backgroundImage: "url('https://i.pinimg.com/736x/70/78/34/7078347685f24bf530c26835e549e776.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className="flex flex-col">
                            <p className="text-sm">Project Breeze Aquisition</p>
                            <p className="text-xs text-neutral-500">Updated 2 mins ago</p>
                        </div>
                    </div>
                    <TbLayoutSidebarFilled size={18} className="text-neutral-500 cursor-pointer" />
                </div>
                <div className="mt-4 px-6 w-full">
                    <div className="w-full rounded-lg h-9 bg-[#00000005] border border-[#00000015] flex items-center px-3">
                        <p className="text-xs">Does this contract require board approval?</p>
                    </div>
                </div>
                <div className="px-6 mt-4 flex items-start gap-2">
                    <LuBrain className="text-neutral-500" />
                    <p className="text-xs text-neutral-500">Thinking through the process to find board approval requirements</p>
                </div>
                <div className="px-6 mt-4 flex items-start gap-2">
                    <LuSearch className="text-neutral-500" size={14} />
                    <div className="">
                        <p className="text-xs text-neutral-500">Searching for mentions of board approval</p>
                        <span className="text-[10px] px-2 py-1 bg-[#E5E5E7] rounded text-neutral-500">Section 4.2 - Board Approval Requirements</span>
                    </div>
                </div>
                <div className="pr-6 pl-12 mt-4 flex items-start gap-2">
                    <p className="text-xs text-neutral-500">Found details regarding board approval for the process of deal aquisition.</p>
                </div>
                <div className="pr-6 pl-12 mt-2 flex flex-col items-start gap-2">
                    <p className="text-[10px] text-neutral-500">All contracts, agreements or commitments entered into by the Company that exceed a total value of $100,000,000  or have a term of two(2) years or longer shall require prior approval by the Board of Directors. <br /> Management may negotiate such agreements in principle.</p>
                </div>
                <div className="px-6 mt-4">
                    <p className="text-xs">Based on Secton 4.2 of the project Briefs Aquisition Deal.</p>
                </div>
                <div className="px-6 mt-2 flex gap-3">
                    <FiUpload className="text-neutral-500 cursor-pointer" size={12} />
                    <PiArrowsClockwise className="text-neutral-500 cursor-pointer" size={12} />
                    <LuCopy className="text-neutral-500 cursor-pointer" size={12} />
                    <HiOutlineDotsHorizontal className="text-neutral-500 cursor-pointer" size={12} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SidebarTemplateDesign;