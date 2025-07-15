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
          <div className="w-36 h-36 absolute rounded-full border-4 border-white bg-gray-800 overflow-hidden top-24 ">
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
            <h1 className='text-5xl font-semibold text-white '>KaizokuDex</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-28">
          <h1 className="text-4xl font-semibold text-white">{user.username}</h1>
          <h3 className="text-2xl font-semibold text-gray-400">{user.email}</h3>
        </div>
        {user.favouriteGenres?.length ? (
          <div className='w-full flex flex-col items-center my-10'>
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
        ) : null}

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
                <p className="text-lg text-white">{anime}</p>
              ))}
            </div>
              ) : null}
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


// <div className="w-full bg-gray-950 h-[120vh]">
//         <div className="w-full h-40  bg-red-700 flex justify-center items-end relative">

//           <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-800 overflow-hidden translate-y-1/2">
//             {user.image ? (
//               // Use Next.js Image component for optimization
//               <Image
//                 src={user.image}
//                 alt="Profile"
//                 width={128}
//                 height={128}
//                 className="w-full h-full object-cover"
//                 priority
//               />
//             ) : (
//               // Fallback avatar
//               <div className="w-full h-full flex items-center justify-center bg-amber-400">
//                 <span className="text-2xl font-bold text-gray-800">
//                   {user.username.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="flex flex-col justify-center items-center mt-28">
//           <h1 className="text-3xl font-semibold text-white">{user.username}</h1>
//           <h3 className="text-xl font-semibold text-gray-400">{user.email}</h3>
//         </div>

//         {/* Favourite Genres */}
//         {user.favouriteGenres?.length ? (
//           <div className="w-full flex justify-center items-center my-14">
//             <div className="flex gap-10 items-center">
//               <h1 className="text-3xl text-white font-semibold">Favourite Genres:</h1>
//               <ul className="flex gap-2">
//                 {user.favouriteGenres.map((genre, index) => (
//                   <li
//                     key={index}
//                     className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl"
//                   >
//                     {genre}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ) : null}

//         {/* About Me */}
//         {user.aboutme && (
//           <div className="w-full flex flex-col items-center gap-5">
//             <h1 className="text-3xl font-semibold text-purple-500">About me</h1>
//             <div className="w-1/2 text-2xl text-gray-200 font-semibold text-center">
//               {user.aboutme}
//             </div>
//           </div>
//         )}

//         {/* Favourite Anime */}
//         {user.favouriteAnime?.length ? (
//           <div className="w-full flex flex-col items-center my-14 gap-10">
//             <h1 className="text-3xl text-white font-semibold">Favourite Anime</h1>
//             <ul className="flex gap-2">
//               {user.favouriteAnime.map((anime, index) => (
//                 <li
//                   key={index}
//                   className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl"
//                 >
//                   {anime}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : null}
//         <div className='w-full h-20 bg-gray-950 flex justify-center items-center my-5'>
//           <Link href='/editprofile'>
//           <div className="px-5 py-2 text-white bg-purple-500 text-2xl font-semibold rounded-2xl">
//             Edit Profile
//           </div>
//           </Link>
//         </div>
//       </div>