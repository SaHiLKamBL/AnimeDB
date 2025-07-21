'use client';
import React from 'react';
import { useEffect,useRef } from 'react';
import { useRouter } from 'next/navigation';

interface DatacardProps {
  id: number;
  image: string;
  title: string;
  episodes: number;
  status: string;
  score: number;
  scored_by: number;
  rank: number;
  genres: string[];
}

const Datacard: React.FC<DatacardProps> = ({
  id,
  image,
  title,
  episodes,
  status,
  score,
  scored_by,
  rank,
  genres,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const reset = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', reset);

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', reset);
    };
  }, []);
  const router=useRouter()
  const detail=()=>{
     router.push(`/detail/${id}`)
  }

  return (
   <div
  className='tilt-card w-full max-w-[21.52vw] h-[31.15vh] text-white px-2 border border-[#f26168] rounded-2xl flex justify-evenly gap-5 items-center'
  ref={cardRef} onClick={detail}
>
   <img
        src={image}
        alt={title}
        className='w-[12.375vw] h-[29.44vh] object-cover rounded-2xl'
      />

      <div className='w-[12.375vw] h-[30.15vh] flex flex-col gap-4 items-start'>
        <div className='w-fit px-3 h-[4.91vh] border border-[#f26168] rounded-2xl flex justify-center items-center text-white text-sm'>
          {status}
        </div>

        <p className='text-sm'>{episodes} Episodes</p>

        <div className='text-2xl font-semibold text-white my-1 line-clamp-2'>
          {title}
        </div>

        <div className='w-full flex items-center justify-start gap-5 mt-1'>
          <div className='flex items-center flex-col'>
            <div className='flex gap-2 items-center text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='21'
                height='21'
                fill='none'
                stroke='#dbe6ff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-star'
              >
                <path d='M11.5 2.3a.5.5 0 0 1 .9 0l2.3 4.7a2 2 0 0 0 1.6 1.2l5.2.8a.5.5 0 0 1 .3.9l-3.7 3.6a2 2 0 0 0-.6 1.9l.9 5.1a.5.5 0 0 1-.8.6l-4.6-2.4a2 2 0 0 0-2 0l-4.6 2.4a.5.5 0 0 1-.8-.6l.9-5.1a2 2 0 0 0-.6-1.9L2.2 9a.5.5 0 0 1 .3-.9l5.2-.8a2 2 0 0 0 1.6-1.2z' />
              </svg>
              <p className='text-md'>{score.toFixed(2)}</p>
            </div>
            <p className='text-xs text-white'>{scored_by} Users</p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='flex items-center text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='none'
                stroke='#dbe6ff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-hash'
              >
                <line x1='4' x2='20' y1='9' y2='9' />
                <line x1='4' x2='20' y1='15' y2='15' />
                <line x1='10' x2='8' y1='3' y2='21' />
                <line x1='16' x2='14' y1='3' y2='21' />
              </svg>
              <p className='text-md ml-1'>{rank}</p>
            </div>
            <p className='text-xs text-white'>Ranking</p>
          </div>
        </div>

        <div className='w-full flex flex-wrap gap-2 mt-2'>
          {genres.slice(0, 2).map((genre, idx) => (
            <div
              key={idx}
              className='px-2 h-8 flex items-center justify-center bg-red-500 text-sm rounded-lg border border-gray-700'
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Datacard;
