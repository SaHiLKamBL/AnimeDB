'use client';

import React, { useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Banneroot from '@/app/Banneroot';
import Link from 'next/link';

export default function Page() {
  const banners = [
    {
    text: "My blade shall sever all that stands in my way. To be flawless, to be eternal — that is what I crave, yet it devours me endlessly.",
    name: "Kokushibo",
    image: "/banner4.jpeg",
  },
     {
    text: "If you don’t take risks, you can’t create a future! I’ll surpass everyone and reach my dream, no matter what.",
    name: "Monkey D. Luffy",
    image: "/banner1.webp",
  },
    {
    text: "Those who turn their hands against their comrades are sure to die a terrible death. Be prepared to face the consequences of your actions — truth is just an illusion born from ignorance.",
    name: "Uchiha Itachi",
    image: "/banner2.jpg",
  },
    {
    text: "By experiencing both victory and defeat, running away and shedding tears, a man will become a man.",
    name: "Red-Haired Shanks",
    image: "/banner3.jpg",
  },
  ];

  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      interval: 4000,
      pauseOnHover: false,
      pagination: true,
    });

    splide.mount();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black pt-16 py-5 flex flex-col justify-between">
      <div className="w-full flex justify-end items-center h-8 px-20 mb-12">
        <h1 className="text-6xl font-bold text-white">KaizokuDex</h1>
      </div>

      <section className="splide w-full" aria-label="Banners">
        <div className="splide__track">
          <ul className="splide__list">
            {banners.map((banner, index) => (
              <li className="splide__slide" key={index}>
                <Banneroot
                  text={banner.text}
                  name={banner.name}
                  image={banner.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="w-full flex justify-end items-center px-10">
        <Link href='/login'>
        <div className="w-72 h-16 bg-red-600 text-white text-2xl font-semibold rounded-4xl flex items-center justify-center hover:bg-red-700">
          Explore Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f7f7f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
        </Link>
      </div>
    </div>
  );
}
