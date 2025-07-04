import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Banner = () => {
  return (
    <div className="w-full max-w-screen m-10 flex items-center justify-center overflow-x-hidden mb-10"> 
      <Carousel className="w-[80vw] h-[60vh]">
        <CarouselContent>
          <CarouselItem className='w-1/2 h-[60vh] border-2 border-gray-800 flex justify-center items-center font-medium text-2xl text-white'>
            1
          </CarouselItem>
          <CarouselItem className='w-1/2 h-[60vh] border-2 border-gray-800 flex justify-center items-center font-medium text-2xl text-white'>
            2
          </CarouselItem>
          <CarouselItem className='w-1/2 h-[60vh] border-2 border-gray-800 flex justify-center items-center font-medium text-2xl text-white'>
            3
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Banner