import TooltipWrapper from '@/lib/wrapper/tooltipWrapper/TooltipWrapper';
import useAppStore from '@/store';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const SidebarFooter = () => {
 
  return (
    <div className="flex flex-col h-full w-full">
     <div className="flex flex-col h-full w-full">
      <div className="py-1 px-3  h-96 ">
        {/* inbox section- start */}
        <div className="flex flex-col mb-4 ">
          {/* search - start */}
          <TooltipWrapper displayText="Add a Team" contentClassname="bg-black text-white"> 
          <div  onClick={() => setSelectedFunction("add-team")}
            className={`h-[34px] p-[2px] grid grid-cols-10 cursor-pointer text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50 `}>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span className=' text-[#002C54]/80 text-sm scale-85'>
              <FaPlus />
              </span>
              <span>Add a Team</span>
            </div>
            <div className=" col-span-1"></div>
          </div>
          </TooltipWrapper>
          {/* start -  end */}

        

        

          

          
        </div>
        {/* inbox section- end */}

      
      </div>
    </div>
    </div>
  )
}

export default SidebarFooter