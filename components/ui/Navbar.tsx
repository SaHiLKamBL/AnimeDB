import React from 'react'
import SearchBar from './Search'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = () => {

    return (
        <>
            <div className='w-full h-20 flex justify-evenly items-center bg-gray-900 backdrop-blur-md text-white border-gray-800 border-2 fixed top-0 left-0'>
                <h1 className='text-4xl font-bold'>KaizokuDex</h1>
                <div className='text-2xl font-medium text-white flex justify-evenly items-center gap-10 w-1/2'>
                    <h1>AI</h1>
                    <h1>Character</h1>
                    <h1>News</h1>
                    <h1>About</h1>
                    <h1>Recommdation</h1>
                </div>
                <Avatar className='border-[1px] border-white w-13 h-13'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Ani</AvatarFallback>
                </Avatar>

            </div>
        </>
    )
}

export default Navbar
