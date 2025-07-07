'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
  name: number
}

interface UserObject {
  username: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

interface Review {
  date: string
  review: string
  is_spoiler: boolean
  user: UserObject
}

const ReviewSection: React.FC<Props> = ({ name }) => {
  const [showReviews, setShowReviews] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    async function fetchReviewData() {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${name}/reviews`)
        setReviews(res.data.data)
      } catch (error) {
        toast.error('Error Fetching Reviews')
        console.error(error)
      }
    }

    fetchReviewData()
  }, [name])

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowReviews(!showReviews)}
        className="px-4 text-2xl font-medium w-fit py-2 bg-gray-800 rounded-lg text-orange-200 border border-gray-700"
      >
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>

      {showReviews && (
        <div className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-start gap-3">
                <img
                  src={review.user?.images.jpg.image_url || '/default-avatar.png'}
                  alt="user-avatar"
                  className="w-10 h-10 rounded-full bg-gray-600"
                />

                <div>
                  <div className="font-semibold text-blue-100">
                    {review.user?.username || 'Anonymous'}
                  </div>
                  <p className="mt-1 text-gray-300">
                    {review.review}
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewSection
