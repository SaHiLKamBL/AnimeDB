import React from 'react';
import Link from 'next/link';

interface GenresObject {
  name: string
}
interface prop{
 image: string,
  title: string,
  genres: GenresObject[],
  url: string,
  score:string,
  episodes:number,
  year:string,
  background:string
}

const Bannerui: React.FC<prop> = ({image,title,genres,url,score,episodes,year,background}) => {
 
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-black">
   
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-full w-auto object-contain animate-fade-in"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-anime-banner.jpg'
          }}
        />
      </div>

   
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

   
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start space-y-6">
        
          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-none font-japanese">
            {title}
          </h1>
          
        
          <p className="text-2xl text-gray-300  ml-1">
           {background}
          </p>
          
      
          <div className="flex space-x-4 mt-8">
               <Link href={url}>
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all duration-300 hover:scale-105 shadow-lg">
              Watch Now
            </button>
          
        </Link>
           
          </div>
          
          {/* Additional info */}
          <div className="flex space-x-4 text-gray-300 mt-4">
            <span className="flex items-center">
              <StarIcon className="w-5 h-5 mr-1 text-yellow-400" />
              {score}
            </span>
            <span>{year}</span>
            <span>{episodes} Episodes</span>
          </div>
        </div>
      </div>
      

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5" />
    </div>
  )
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

  
  

export default Bannerui;
 
     
 {/* <Link href={url}>
        <div className='w-20 h-20 border-[1px] border-white flex justify-center items-center text-white bg-red-600'>
             WATCH NOW
        </div>
        </Link> */}


    //     <div className="relative z-20  px-4">
    //     <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
    //       {title}
    //     </h1>
    //     <p className="text-xl text-gray-300 mb-8">
    //       Top 10 Anime streaming on AnimeList.com
    //     </p>
    //     <Link href={url}>
    //     <div className='w-20 h-20 border-[1px] border-white flex justify-center items-center text-white bg-red-600'>
    //          WATCH NOW
    //     </div>
    //     </Link>
    //   </div>