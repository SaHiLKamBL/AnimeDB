'use client'
import { useEffect } from 'react'
import React from 'react'

const Datacard = () => {
  
  return (
    <>
      <div className='w-[21.52vw] h-[31.15vh] text-blue-100 px-2 border-[1px] border-gray-700 rounded-2xl flex justify-evenly gap-5 items-center'>
        <div className='w-[12.375vw] h-[29.44vh] rounded-2xl bg-black'>h</div>

        <div className='w-[12.375vw] h-[30.15vh] flex flex-col gap-1 items-start'>
          <div className='w-[7.52vw] h-[4.91vh] border-[1px] border-gray-700 rounded-2xl flex justify-center items-center text-orange-200'> Currently airing</div>
          <p className='text-blue-100'>6 episode</p>
          <div className='text-2xl font-normal text-blue-100 my-5'>Takopii no Genzai</div>

          <div className='w-full flex items-center justify-start gap-5 '>
            <div className='  flex  items-center flex-col'>
              <div className='text-blue-100  flex gap-2 items-center m-0' >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dbe6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                <p className='text-2xl'>9.43</p>
              </div>
              <p className='text-blue-200 m-0'>62134 Users</p>
            </div>

            <div className='  flex  items-center justify-center flex-col'>
              <div className='text-blue-100  flex justify-center items-center m-0' >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dbe6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-hash-icon lucide-hash"><line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" /></svg>
                <p className='text-2xl'>24</p>
              </div>
              <p className='text-blue-200 m-0'>Ranking</p>
            </div>
          </div>
          <div className='w-full flex justify-start items-center gap-3 mt-2 text-blue-100'>
            <div className='w-16 rounded-lg h-10 flex justify-center items-center bg-gray-700 border-[1px] border-gray-700'> Action</div>
 <div className='w-20 rounded-lg h-10 flex justify-center items-center bg-gray-700 border-[1px] border-gray-700'>Comedy</div>

          </div>
        </div>
      </div>
      
      


    </>
  )
}

export default Datacard
