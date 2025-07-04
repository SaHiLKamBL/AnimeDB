import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Banner from '@/components/ui/Banner'
import SearchBar from '@/components/ui/Search'
import Cardsection from '@/components/ui/Cardsection'

const page = () => {
  return (
    <div className='w-full bg-gray-950   overflow-x-clip'>
        <Navbar/> 
      <br />
      <br />
            <Banner/>
             <SearchBar/>
             <br />
             <br />
             <Cardsection/>
         


        
    </div>
  )
}

export default page
