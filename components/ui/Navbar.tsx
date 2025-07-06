'use client'
import React from 'react'
import SearchBar from './Search'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'


const Navbar = () => {

    return (
        <>
            <div className='w-full h-20 flex justify-evenly items-center bg-gray-950  text-white border-gray-800 border-2 '>
                <h1 onClick={()=>{window.location.href='/home'}} className='text-4xl font-bold cursor-pointer'>KaizokuDex</h1>
                <div className='text-2xl font-medium text-white flex justify-evenly items-center gap-10 w-1/2'>
                    <h1 className='cursor-pointer'>AI</h1>
                    <h1 className='cursor-pointer'>Search</h1>
                    <h1 className='cursor-pointer'>News</h1>
                <h1 className='cursor-pointer' onClick={()=>{window.location.href='/about'}}>About</h1>
                    <h1 className='cursor-pointer'>Recommdation</h1>
                </div>
                <Avatar className='border-[1px] border-white w-13 h-13 cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Ani</AvatarFallback>
                </Avatar>

            </div>
        </>
    )
}

export default Navbar
