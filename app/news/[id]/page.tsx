'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Link from 'next/link'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import axios from 'axios'

interface newsprop {
  date: string
  title: string
  author_username: string
  author_url: string
  forum_url: string
  images: {
    jpg: {
      image_url: string
    }
  },
  comments: number
  excerpt: string
}

const Page = () => {
  const [anime, setanime] = useState<newsprop[]>([])
  const params = useParams()
  const animeid = params.id

  useEffect(() => {
    async function newsdata() {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${animeid}/news`)
        setanime(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        console.log(error)
        toast.error("Error fetching data")
      }
    }

    if (animeid) {
      newsdata()
    }

  }, [animeid])

  return (
    <>
      <Navbar />
      <div className='w-full min-h-screen bg-black p-10'>
        <div className='w-full grid grid-cols-3 gap-5'>
          {anime.map((item, index) => (
            <div key={index} className='w-[30vw] h-[60vh] border border-[#f26168] rounded-2xl flex gap-5 px-2 py-4'>
              {item.images?.jpg?.image_url ? (
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className='w-[14vw] h-[30vh] bg-white rounded-2xl object-cover'
                />
              ) : (
                <div className='w-[14vw] h-[30vh] bg-gray-800 rounded-2xl flex items-center justify-center text-white'>
                  No Image
                </div>
              )}

              <div className='w-[16vw] h-full flex flex-col items-start gap-2'>
                <div className='text-2xl font-medium text-white flex gap-2 items-center'>
                  <p className='text-red-500'>Date:</p>
                  <p>{item.date.split('T')[0]}</p>
                </div>

                <div className='text-2xl font-semibold text-white my-2 '>
                  {item.title}
                </div>

                <Link href={item.author_url}>
                  <div className='text-2xl font-semibold text-white my-1 line-clamp-1'>
                    <span className='text-red-500'>Reportby </span>: {item.author_username}
                  </div>
                </Link>

                <Link href={item.forum_url}>
                  <div className='text-2xl font-semibold text-red-500 line-clamp-1 hover:underline'>
                    Join Discussion
                  </div>
                </Link>

                <div className='text-2xl font-semibold text-white my-1 line-clamp-1'>
                  Comments : {item.comments}
                </div>

                <div className='w-full'>
                  <p className='text-2xl font-semibold text-red-500'>Headline: </p>
                  <p className='text-lg text-white'>{item.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page
