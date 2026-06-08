import { MdKeyboardArrowDown } from "react-icons/md";

const SidebarTemplateDesign = () => {
  return (
    <div className='w-190 h-140 flex items-end outer-div border-l border-l-neutral-200' style={{ backgroundImage: "url('https://i.pinimg.com/736x/a4/8d/40/a48d40b86c7bc07e316fb5dcf67c5338.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='w-170 h-120 rounded-tr-3xl bg-[#ECECEE] flex font-sans'>
            <div className='w-[45%] h-full rounded-tr-3xl bg-[#FFFFFF]'>
                <div className='h-16 border-b border-b-neutral-200 flex items-center justify-end px-6'>
                    <div className='border border-neutral-200 flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg text-sm'>
                        <p className="text-sm">Save As</p>
                        <MdKeyboardArrowDown size={18} />
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-lg">Memorandum</p>
                    <p className="text-xs  mt-6 text-neutral-500">speed up dilligence and cut down on</p>
                    <p className="text-xs  mt-6 text-neutral-500">nd stable</p>
                    <p className="text-xs text-neutral-500">detection running in test enviornments with</p>
                    <p className="text-xs mt-4 text-neutral-500">s, expected to unlock end-to-end tracking of</p>
                    <p className="text-xs mt-4 text-neutral-500">turnaround times and reduced duplication of</p>
                    <p className="text-xs mt-6 text-neutral-500">s with concise, reliable summaries.</p>
                    <p className="text-xs text-neutral-500">ds  for cross-team inputs.</p>
                    <p className="text-xs text-neutral-500">mpliance and visibility.</p>
                    <p className="text-xs text-neutral-500">y and rollback for accuracy in diligence.</p>
                    <p className="text-xs mt-4 text-neutral-500">eams across investment, legal, and ops.</p>
                    <p className="text-xs mt-4 text-neutral-500">panel to support fast adoptions.</p>
                </div>
            </div>
            hello
        </div>
    </div>
  )
}

export default SidebarTemplateDesign;