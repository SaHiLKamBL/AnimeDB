'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface AnimeEntry {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

interface recomobject {
  mal_id: string
  entry: AnimeEntry[] // ✅ this was missing
  content: string
  date: string
  user: {
    username: string
    url: string
  }
}

const Page = () => {
    let router=useRouter()

    let [recom, setrecom] = useState<recomobject[]>([])

    useEffect(() => {
        let fetchrecom = async () => {
            try {
                let res = await axios.get('https://api.jikan.moe/v4/recommendations/anime')
                setrecom(res.data.data)

            } catch (error) {
                toast.error("Error Fetching data")
                console.log(error)
            }
        }
        fetchrecom()
    }, [])

    return (
        <>
            <Navbar />

            {/* Page background */}
            <div className="w-full min-h-screen bg-gray-950 px-10 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                    {recom.map((item) => {
                        const anime = item.entry[0]; 
                        // {
                        //     data:[
                        //         entry:[
                        //             image:
                        //             title: 
                        //         ]
                        //       other:
                        //     ]
                                  // thast why for evry item we enter entry array
                        // }

                        return (
                            <div
                            onClick={()=>{router.push(`/detail/${anime.mal_id}`)}}
                               
                                className="bg-gray-950 text-white rounded-xl p-4 border border-gray-800 shadow-lg w-full max-w-xs mx-auto "
                            >
                                
                                <img
                                    src={anime.images?.jpg?.image_url || '/fallback.jpg'}
                                    alt={anime.title}
                                    className="rounded-lg w-full h-auto object-cover"
                                />

                                <h2 className="mt-4 text-xl font-bold">{anime.title}</h2>

                                <div className="flex items-center gap-3 mt-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${item.user.username}`}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="text-lg font-medium text-gray-300">
                                        {item.user.username}
                                    </span>
                                </div>

                                <p className="mt-3 text-gray-400">{item.content}</p>
                            </div>
                        );
                    })}

                </div>

            </div>
        </>
    )
}

export default Page
