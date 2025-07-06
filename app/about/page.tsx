'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';

const Page = () => {
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
              
               <div className="relative z-50">  
                    <Navbar />
                </div>



            
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: "url('/aboutbbg.jpg')" }}
                />

                {/* Optional dark overlay for readability */}
                <div className="absolute inset-0 bg-white/30 z-10 pointer-events-none" />

                <section className="relative z-20 flex justify-start items-center top-24 left-10 px-3 ">
                    <div className="w-6xl ">
                        <h1 className="text-8xl  font-extrabold text-gray-900 drop-shadow">
                            About KaizokuDex
                        </h1>
                        <br />
                        <br />

                        <p className="mt-4 text-3xl text-gray-700 font-medium">
                           At KaizokuDex, we’re not just another anime database—we’re your ultimate anime soulmate. Born from a love of all things anime and powered by cutting-edge AI, we’re here to help you discover, track, and fall in love with shows that actually match your vibe.  
                             </p> 
                              <p className="mt-4 text-3xl text-gray-700 font-medium">
                          Anime is more than entertainment—it’s emotion, nostalgia, and community. We’re here to make your anime journey smarter, smoother, and way more fun. Whether you’re a seasoned otaku or a curious newbie, KaizokuDex is your first mate on this voyage.   </p> 

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