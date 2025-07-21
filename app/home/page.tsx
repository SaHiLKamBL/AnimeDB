import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Banner from '@/components/ui/Banner'
import Cardsection from '@/components/ui/Cardsection'

const page = () => {
  return (
    <>
    <div className='w-full min-h-screen  bg-black overflow-y-clip overflow-x-clip'>
        <Navbar/> 
      <br />
      <br />
            <Banner/>
             <br />
             <br />
             <Cardsection/>

    </div>
    </>
  )
}

export default page
