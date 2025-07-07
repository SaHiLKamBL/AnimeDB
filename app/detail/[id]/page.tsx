'use client'
import Navbar from '@/components/ui/Navbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReviewSection from '@/components/ui/Review'

interface TitleObject {
  type: string
  title: string
}

interface GenresObject {
  name: string
}

interface Namer {
  name: string
}

interface StreamObject {
  name: string
  url: string
}

interface AniData {
  mal_id: number
  url: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  titles: TitleObject[]
  episodes: number
  status: string
  score: number
  scored_by: number
  rank: number
  genres: GenresObject[]
  synopsis: string
  studios: Namer[]
  producers: Namer[]
  licensors: Namer[]
  streaming: StreamObject[]
  favorites: number
  duration: string
}

const AnimeDetailPage = () => {
  const [anime, setAnime] = useState<AniData | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true)
        const id = params.id
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        setAnime(response.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimeData()
  }, [params.id])

  if (loading) return <div className="text-blue-100">Loading...</div>
  if (!anime) return <div className="text-blue-100">No anime data found</div>

  const title =
    anime.titles.find((t) => t.type === 'English')?.title ||
    anime.titles.find((t) => t.type === 'Default')?.title ||
    anime.titles[0]?.title ||
    "Unknown Title"

  return (
    <>
      <Navbar />
      <div className='w-full bg-gray-950 p-10 overflow-hidden'>
        <div className='w-[80vw] flex gap-5'>
          <div className='w-80 h-[50vh] rounded-2xl overflow-hidden'>
            <img 
              src={anime.images.jpg.large_image_url} 
              alt={title}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='w-[60vw] flex flex-col items-start gap-2'>
            <div className='w-full flex items-center justify-between'>
              <h1 className='text-5xl font-semibold text-cyan-200 my-1'>{title}</h1>
              <div className='w-fit px-3 h-[4.91vh] border border-gray-700 rounded-2xl flex justify-center items-center font-medium text-orange-200 text-lg'>
                {anime.status}
              </div>
            </div>

            <div className='flex items-center justify-around w-[18vw] my-5'>
              <div className='flex gap-1'>
                <img src="/icons8-star-30.png" alt="rate" />
                <h1 className='text-2xl text-blue-100 font-medium'>{anime.score}</h1>
              </div>

              <div className='flex gap-1'>
                <h1 className='text-2xl text-blue-100 font-medium'>{anime.episodes}</h1>
                <h1 className='text-2xl text-blue-100 font-medium'>Episodes</h1>
              </div>

              <div className='flex gap-1'>
                <img src="/icons8-heart-30.png" alt="rate" />
                <h1 className='text-2xl text-blue-100 font-medium'>{anime.favorites}</h1>
              </div>
            </div>

            <div className='w-full flex justify-start gap-5 items-center'>
              <h1 className='text-3xl text-blue-100 font-semibold'>Duration:</h1>
              <h1 className='text-3xl text-blue-100 font-medium'>{anime.duration}</h1>
            </div>

            <div className='w-[60vw] flex justify-start gap-5'>
              <h1 className='text-3xl text-blue-100 font-semibold'>Description:</h1>
              <p className='text-xl text-blue-100 font-medium'>{anime.synopsis}</p>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* Genres */}
        <div className='w-full h-15 flex justify-start gap-5 items-center'>
          {anime.genres.slice(0, 5).map((genre, idx) => (
            <div
              key={idx}
              className='px-4 text-2xl font-medium w-fit py-2 bg-gray-800 rounded-lg text-blue-100 border border-gray-700'
            >
              {genre.name}
            </div>
          ))}
        </div>

        {/* Studios, Licensors, Producers */}
       <div className='w-[60vw] gap-5 flex flex-col'>
  {/* Studios */}
  <div className='w-full flex flex-wrap items-center gap-5 my-2'>
    <h1 className='text-3xl text-blue-100 font-semibold min-w-max'>Studio:</h1>
    <div className='flex flex-wrap gap-3 items-center'>
      {anime.studios.length > 0 ? (
        anime.studios.map((studio) => (
          <Link key={studio.name} href='/url' className='hover:opacity-80 transition-opacity'>
            <div className='px-4 py-1 bg-gray-800 rounded-lg text-blue-100 border border-gray-700 text-2xl font-medium'>
              {studio.name}
            </div>
          </Link>
        ))
      ) : (
        <span className='text-2xl text-blue-100 font-medium'>N/A</span>
      )}
    </div>
  </div>

  {/* Licensors */}
  <div className='w-full flex flex-wrap items-center gap-5 my-5'>
    <h1 className='text-3xl text-blue-100 font-semibold min-w-max'>Licensors:</h1>
    <div className='flex flex-wrap gap-3 items-center'>
      {anime.licensors.length > 0 ? (
        anime.licensors.map((licensor) => (
          <Link key={licensor.name} href='/url' className='hover:opacity-80 transition-opacity'>
            <div className='px-4 py-1 bg-gray-800 rounded-lg text-blue-100 border border-gray-700 text-2xl font-medium'>
              {licensor.name}
            </div>
          </Link>
        ))
      ) : (
        <span className='text-2xl text-blue-100 font-medium'>N/A</span>
      )}
    </div>
  </div>

  {/* Producers */}
  <div className='w-full flex flex-wrap items-center gap-5 my-5'>
    <h1 className='text-3xl text-blue-100 font-semibold min-w-max'>Producers:</h1>
    <div className='flex flex-wrap gap-3 items-center'>
      {anime.producers.length > 0 ? (
        anime.producers.map((producer) => (
          <Link key={producer.name} href='/url' className='hover:opacity-80 transition-opacity'>
            <div className='px-4 py-1 bg-gray-800 rounded-lg text-blue-100 border border-gray-700 text-2xl font-medium'>
              {producer.name}
            </div>
          </Link>
        ))
      ) : (
        <span className='text-2xl text-blue-100 font-medium'>N/A</span>
      )}
    </div>
  </div>
</div>

        {/* Streaming Platforms */}
        <div className="flex flex-col gap-4 my-5">
          <h2 className="text-3xl font-semibold text-blue-100">Streaming On:</h2>
          <div className="flex flex-wrap gap-3">
            {anime.streaming.map((stream) => (
              <Link 
                key={stream.name} 
                href={stream.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="px-4 text-2xl font-medium w-fit py-2 bg-gray-800 rounded-lg text-blue-100 border border-gray-700 hover:bg-gray-700 transition-colors">
                  {stream.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
              <div className='w-full  flex justify-center items-center'>
                        <ReviewSection name={anime.mal_id}/>
              </div>
      
      </div>
    </>
  )
}

export default AnimeDetailPage