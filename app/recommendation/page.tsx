'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
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
    const router = useRouter()

    const [recom, setrecom] = useState<recomobject[]>([])

    useEffect(() => {
        const fetchrecom = async () => {
            try {
                const res = await axios.get('https://api.jikan.moe/v4/recommendations/anime')
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
            <div className="w-full  bg-gray-950 px-10 py-6">
                <div className="flex flex-col justify-evenly w-full gap-5">
                    {recom.map((item,index) => {
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
                            <div key={index}
                                onClick={() => { router.push(`/detail/${anime.mal_id}`) }}

                                className="w-full h-fit bg-black text-white rounded-xl p-4 border-2 border-[#f26168] shadow-lg gap-10  flex  justify-start items-center"
                            >

                                <img
                                    src={anime.images?.jpg?.image_url || '/fallback.jpg'}
                                    alt={anime.title}
                                    className="rounded-lg w-[15vw] h-[35vh]  object-cover"
                                />
                                <div className='w-[70vw] h-[35vh] flex flex-col justify-evenly items-start'>
                                    <h2 className="mt-4 text-4xl font-semibold text-white">{anime.title}</h2>
                             <div className='w-full'>
                                    <div className="flex items-center gap-3 mt-3">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${item.user.username}`}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="text-lg font-medium text-white">
                                            {item.user.username}
                                        </span>
                                    </div>

                                    <p className=" mt-2 text-gray-300">{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </>
    )
}

export default Page
