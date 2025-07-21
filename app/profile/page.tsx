'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import { useSession } from 'next-auth/react'
import { IUser } from '@/model/User'
import Image from 'next/image'
import Link from 'next/link'

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session?.user?.email) return

        const response = await fetch(`/api/users?email=${session.user.email}`)
        if (!response.ok) throw new Error('Failed to fetch user')

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [session])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="w-full bg-gray-950 min-h-screen flex justify-center items-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="w-full bg-gray-950 min-h-screen  flex justify-center items-center">
          <div className="text-white text-2xl">User not found</div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='w-full h-screen bg-black pt-10'>
        <div className='w-full bg-red-600/50  relative h-40 flex justify-center gap-20 '>
          <div className="w-36 h-36 absolute rounded-full border-4 border-white hover:border-[#f26168] bg-gray-800 overflow-hidden top-24 ">
            {user.image ? (
              // Use Next.js Image component for optimization
              <Image
                src={user.image}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              // Fallback avatar
              <div className="w-full h-full flex items-center justify-center bg-amber-400">
                <span className="text-2xl font-bold text-gray-800">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className='w-full flex justify-end items-center px-20'>
            <h1 className='text-5xl font-semibold text-white '>Kaizoku</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-28">
          <h1 className="text-4xl font-semibold text-white">{user.username}</h1>
          <h3 className="text-2xl font-semibold text-gray-400">{user.email}</h3>
        </div>
        {user.favouriteGenres?.length ? (
          <div className='w-full flex gap-5 justify-center items-center my-10'>
            <h1 className='text-5xl text-white font-semibold mb-6'>Favourite Genres:</h1>

            <div className='w-[30vw]'>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.favouriteGenres.map((genre, index) => (
                  <li
                    key={index}
                    className="px-5 py-2 text-white bg-red-500 text-2xl font-semibold rounded-2xl text-center"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : 
        
        <div className='w-full flex gap-5 justify-center items-center my-10'>
            <h1 className='text-5xl text-white font-semibold mb-6'>Favourite Genres:</h1>

            <div className='w-[30vw]'>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">

                  <li
                    
                    className="px-5 py-2 text-white bg-red-500 text-2xl font-semibold rounded-2xl text-center"
                  >
              No Details                 </li>
                
              </ul>
            </div>
          </div>
        
        }

        <div className="w-full   bg-[#2b2929] rounded-2xl p-8 flex flex-col relative overflow-hidden backdrop-blur-lg">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center border-b border-white pb-2">
            About me
          </h2>

          {/* About me text */}
          {user.aboutme && (
            <p className="text-lg md:text-xl text-white mb-4 text-center">
              Hi I am <span className="font-semibold">{user.aboutme}</span>
            </p>
          )}

          {/* Favourite Anime */}
          {user.favouriteAnime?.length ? (
            <div className="text-center mt-4">
              <p className="text-xl text-white font-semibold">Favourite Anime</p>
              {user.favouriteAnime.map((anime, index) => (
                <p key={index} className="text-lg text-white">{anime}</p>
              ))}
            </div>
          ) : 
          <div className="text-center mt-4">
              <p className="text-xl text-white font-semibold">Favourite Anime</p>
              
                <p className="text-lg text-white">No Details</p>
          </div>
          
          }




          <div className="flex justify-end mt-6">
            <Link href='/editprofile'>
              <button className="px-5 py-2 text-white bg-red-500 hover:bg-red-700 text-2xl font-semibold rounded-2xl text-center">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>






      </div>

    </>
  )
}

export default ProfilePage

