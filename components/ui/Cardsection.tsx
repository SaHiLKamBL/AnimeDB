'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import Datacard from './Datacard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import Loader from './Loader'

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
  const [page, setPage] = useState(1)

  const fetchData = async (pageNumber: number) => {
    try {
      setLoading(true)
      const res = await axios.get(`https://api.jikan.moe/v4/anime?page=${pageNumber}`)
      console.log('Fetched Data:', res.data.data)
      setAnidata(res.data.data)
    } catch (error) {
      toast.error('Error Fetching Data')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
  <div className="px-5 pb-10">
    
    {/* ✅ Show loader above the grid */}
    {loading && <Loader />}

    {/* ✅ Show cards only if not loading */}
    {!loading && (
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {Anidata.length === 0 ? (
          <p className="text-white">No data available.</p>
        ) : (
          Anidata.map((anime) => {
            const title =
              anime.titles.find((t) => t.type === 'English')?.title ||
              anime.titles.find((t) => t.type === 'Default')?.title ||
              anime.titles[0]?.title ||
              "Unknown Title"

            return (
              <Datacard
                key={anime.mal_id}
                id={anime.mal_id}
                image={anime.images.jpg.image_url}
                title={title}
                episodes={anime.episodes || 0}
                status={anime.status || "Unknown"}
                score={anime.score || 0}
                scored_by={anime.scored_by || 0}
                rank={anime.rank || 0}
                genres={anime.genres.map((g) => g.name)}
              />
            )
          })
        )}
      </div>
    )}

    {/* ✅ Pagination (also only shown when not loading) */}
    {!loading && (
      <div className="flex justify-center my-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={() => setPage((prev) => prev + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )}
  </div>
)
}

export default Cardsection
