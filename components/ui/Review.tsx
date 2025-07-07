'use client'
import { useState } from 'react'

const ReviewSection = () => {
  const [showReviews, setShowReviews] = useState(false)

  return (
    <div className="mt-6">
      {/* Review Button */}
      <button
        onClick={() => setShowReviews(!showReviews)}
        className="px-4 text-2xl font-medium w-fit py-2 bg-gray-800 rounded-lg text-orange-200 border border-gray-700"
      >
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>

      {/* Review Panel (appears when button is clicked) */}
      {showReviews && (
        <div className="mt-4 space-y-4">
          {/* Individual Review */}
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-start gap-3">
              {/* Profile Picture */}
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
                <span>U</span>
              </div>
              
              {/* User Info and Review */}
              <div>
                <div className="font-semibold text-blue-100">Username123</div>
                <p className="mt-1 text-gray-300">
                  This anime was absolutely amazing! The character development was
                  on point and the animation quality was stunning.
                </p>
                <div className="mt-2 text-sm text-gray-400">2 days ago</div>
              </div>
            </div>
          </div>

          {/* Second Review Example */}
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                <span>A</span>
              </div>
              <div>
                <div className="font-semibold text-blue-100">AnimeFan42</div>
                <p className="mt-1 text-gray-300">
                  The plot twists were unexpected but made perfect sense in the
                  end. Can't wait for season 2!
                </p>
                <div className="mt-2 text-sm text-gray-400">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewSection