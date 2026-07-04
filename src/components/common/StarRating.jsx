import { FiStar } from 'react-icons/fi'

export default function StarRating({ rating, reviews, size = 13 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <FiStar
            key={n}
            size={size}
            className={n <= Math.round(rating) ? 'fill-clay-400 text-clay-400' : 'text-ink-300 dark:text-ink-600'}
          />
        ))}
      </div>
      <span className="text-xs text-ink-500 dark:text-ink-400">
        {rating} {reviews !== undefined && `(${reviews})`}
      </span>
    </div>
  )
}
