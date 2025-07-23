'use client'
import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { IUser } from '@/model/User'
import Image from 'next/image'

const Navbar = () => {
      const [user, setUser] = useState<IUser | null>(null)
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
          }
        }
    
        fetchUserData()
      }, [session])
    

    return (
        <>
            <div className='w-full h-20 flex justify-evenly items-center bg-black text-red-500 border-gray-800 border-2 '>
                <h1 onClick={()=>{window.location.href='/home'}} className='text-5xl font-bold tex cursor-pointer'>KaizokuDex</h1>
                <div className='text-2xl font-medium text-white flex justify-evenly items-center gap-10 w-1/2'>
                    <h1 onClick={()=>{window.location.href='/ai'}} className='cursor-pointer hover:text-red-500'>AskAI</h1>
                    <h1 onClick={()=>{window.location.href='/search'}} className='cursor-pointer hover:text-red-500'>Search</h1>
                      <h1 onClick={()=>{window.location.href='/recommendation'}} className='cursor-pointer hover:text-red-500'>Recommdation</h1>
                <h1 className='cursor-pointer hover:text-red-500' onClick={()=>{window.location.href='/about'}}>About</h1>
                
                
                  
                </div>
                
                  {
  user ? (
    user.image ? (
      <Link href='/profile'>
      <Image
        src={user.image}
        alt="Profile"
        width={28}
        height={28}
        className="w-16 h-16 object-cover rounded-full border-2 border-white hover:border-[#f26168]"
        priority
      /></Link>
    ) : (
      <Link href='/profile'>
      <div className="w-full h-full flex items-center justify-center bg-black">
        <span className="text-2xl font-bold text-red">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </div>
      </Link>
    )
  ) : (
    // Optional: fallback when user is null AND still loading
    <Avatar>
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  )
}


            </div>
        </>
    )
}

export default Navbar
