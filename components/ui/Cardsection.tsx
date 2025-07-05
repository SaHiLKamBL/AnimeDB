'use client'

import React, { useState, useEffect } from 'react'
import Datacard from './Datacard'
import axios from 'axios'
import { toast } from 'sonner'

interface TitleObject {
  type: string
  title: string
}

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
  titles: TitleObject[]
  episodes: number
  status: string
  score: number
  scored_by: number
  rank: number
  genres: GenresObject[]
}

const Cardsection = () => {
  const [Anidata, setAnidata] = useState<AnimeData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://api.jikan.moe/v4/anime')
        setAnidata(res.data.data)
      } catch (error) {
        toast.error('Error Fetching Data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchdata()
  }, [])

  return (
    <div className='w-full m-5 px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        Anidata.map((anime) => (
          <Datacard
  key={anime.mal_id}
  id={anime.mal_id}
  image={anime.images.jpg.image_url}
  title={
    anime.titles.find((t) => t.type === 'English')?.title ||
    anime.titles.find((t) => t.type === 'Default')?.title ||
    anime.titles[0]?.title
  }
  episodes={anime.episodes}
  status={anime.status}
  score={anime.score}
  scored_by={anime.scored_by}
  rank={anime.rank}
  genres={anime.genres.map((g) => g.name)} // This must be an array of strings
/>

        ))
      )}
    </div>
  )
}

export default Cardsection
