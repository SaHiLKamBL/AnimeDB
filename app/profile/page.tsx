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
      <div className="w-full bg-gray-950 h-[120vh]">
        <div className="w-full h-60 bg-purple-700 flex justify-center items-end relative">

          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-800 overflow-hidden translate-y-1/2">
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
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center items-center mt-28">
          <h1 className="text-3xl font-semibold text-white">{user.username}</h1>
          <h3 className="text-xl font-semibold text-gray-400">{user.email}</h3>
        </div>

        {/* Favourite Genres */}
        {user.favouriteGenres?.length ? (
          <div className="w-full flex justify-center items-center my-14">
            <div className="flex gap-10 items-center">
              <h1 className="text-3xl text-white font-semibold">Favourite Genres:</h1>
              <ul className="flex gap-2">
                {user.favouriteGenres.map((genre, index) => (
                  <li
                    key={index}
                    className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {/* About Me */}
        {user.aboutme && (
          <div className="w-full flex flex-col items-center gap-5">
            <h1 className="text-3xl font-semibold text-purple-500">About me</h1>
            <div className="w-1/2 text-2xl text-gray-200 font-semibold text-center">
              {user.aboutme}
            </div>
          </div>
        )}

        {/* Favourite Anime */}
        {user.favouriteAnime?.length ? (
          <div className="w-full flex flex-col items-center my-14 gap-10">
            <h1 className="text-3xl text-white font-semibold">Favourite Anime</h1>
            <ul className="flex gap-2">
              {user.favouriteAnime.map((anime, index) => (
                <li
                  key={index}
                  className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl"
                >
                  {anime}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className='w-full h-20 bg-gray-950 flex justify-center items-center my-5'>
          <Link href='/editprofile'>
          <div className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl">
            Edit Profile
          </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ProfilePage