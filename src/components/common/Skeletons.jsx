export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="skeleton h-3 w-3/4" />
      <div className="skeleton h-3 w-1/3" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-3" style={{ width: `${100 - i * 15}%` }} />
      ))}
    </div>
  )
}
