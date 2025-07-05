'use client'
import { useEffect, useState } from 'react'
import {toast} from 'sonner'
import axios from 'axios'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Bannerui from './Bannerui'

interface TitleObject {
  type: string
  title: string
}
interface GenresObject {
  name: string
}
interface bannerdata {
  mal_id: string,
  images: {
    jpg: {
      large_image_url: string
    }
  },
  titles: TitleObject[],
  genres: GenresObject[],
  url: string,
   score:string,
  episodes:number,
  year:string,
  background:string
}


const Banner = () => {
  const [Data, setData] = useState<bannerdata[]>([])

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get('https://api.jikan.moe/v4/top/anime?limit=10')
        setData(res.data.data)
      } catch (error) {
        toast.error("Error to fetch Data")
        console.log(error)
      }
    }
    fetchdata()
  }, [])

  return (
    <div className="w-full max-w-screen m-10 flex items-center justify-center overflow-x-hidden mb-10"> 
      <Carousel className="w-[80vw] h-[80vh]">
        <CarouselContent>
          {Data.map((item) => {
            const title =
              item.titles.find((t) => t.type === 'English')?.title ||
              item.titles.find((t) => t.type === 'Default')?.title ||
              item.titles[0]?.title ||
              "Unknown Title"
            
            return (
              <CarouselItem key={item.mal_id} className='w-1/2 h-[80vh]  flex justify-center items-center font-medium text-2xl text-white'>
                <Bannerui 
                  image={item.images.jpg.large_image_url} 
                  title={title} 
                  genres={item.genres} 
                  url={item.url} 
                  score={item.score}
                  episodes={item.episodes}
                  year={item.year}
                  background={item.background}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Banner