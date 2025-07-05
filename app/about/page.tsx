'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';

const Page = () => {
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                {/* Navbar */}
                <Navbar />

                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: "url('/aboutbbg.jpg')" }}
                />

                {/* Optional dark overlay for readability */}
                <div className="absolute inset-0 bg-white/30 z-10" />

                <section className="relative z-20 flex justify-start items-center top-24 left-10 px-3 ">
                    <div className="w-6xl ">
                        <h1 className="text-8xl  font-extrabold text-gray-900 drop-shadow">
                            KaizokuDex
                        </h1>
                        <br />
                        <br />

                        <p className="mt-4 text-3xl text-gray-700 font-medium">
                            Built for anime lovers, powered by AI. KaizokuDex helps you discover, track, and explore anime that matches your mood, your taste, and your vibe. Smart search, curated watchlist.
                        </p> 

                    </div>
                </section> 
                
            </div>
        </>
    );
};

export default Page;


{/* <section className="relative z-20 flex justify-evenly items-center h-full px-3 md:px-16">
                    <div className="max-w-5xl h-full">
                        <h1 className="text-8xl md:text-6xl font-extrabold text-gray-900 drop-shadow">
                            KaizokuDex
                        </h1>

                        {/* <p className="mt-4 text-4xl md:text-xl text-gray-700 font-medium">
                            Built for anime lovers, powered by AI. KaizokuDex helps you discover, track, and explore anime that matches your mood, your taste, and your vibe. Smart search, curated watchlist, and GPT-powered suggestions — all in one place.
                        </p> 

                    </div>
                </section> */}