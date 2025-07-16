'use client'

import React, { useEffect, useState } from 'react'
import { useDebounce } from '../types/Debounce'
import Navbar from '@/components/ui/Navbar'
import Datacard from '@/components/ui/Datacard'
import axios from 'axios'

interface GenresObject {
  name: string
}

interface AnimeData {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
    }
  }
  title_english: string
  episodes: number
  status: string
  score: number
  scored_by: number
  rank: number
  genres: GenresObject[]
}

const Page = () => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [anime, setAnime] = useState<AnimeData[]>([])
  

  useEffect(() => {
    const fetchAnime = async () => {
      if (!debouncedSearch) {
        setAnime([]) // clear if empty
        return
      }

      try {
        setLoading(true)
        const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${debouncedSearch}`)
        setAnime(res.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [debouncedSearch])

  return (
    <div className="w-full bg-gray-950 min-h-screen">
      <Navbar />
      <div className="w-full flex items-center justify-center my-10">
        <input
          className="w-1/3 h-10 rounded-2xl px-4 border-2 border-[#f26168] text-xl placeholder:text-gray-600 focus:outline-none text-white"
          placeholder="Search for anime !!!"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="text-center text-white">Loading...</p>}

      {anime.length > 0 ? (
        <div className="w-full grid grid-cols-4 gap-5 px-10">
          {anime.map((item) => (
            <Datacard
              key={item.mal_id}
              id={item.mal_id}
              image={item.images.jpg.image_url}
              title={item.title_english}
              episodes={item.episodes || 0}
              status={item.status || 'Unknown'}
              score={item.score || 0}
              scored_by={item.scored_by || 0}
              rank={item.rank || 0}
              genres={item.genres.map((g) => g.name)}
            />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-white">No Results</p>
      )}
    </div>
  )
}

export default Page
