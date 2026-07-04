import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section-pad mx-auto max-w-lg py-36 flex flex-col items-center text-center gap-4">
      <p className="font-display text-8xl font-semibold text-ink-200 dark:text-ink-800 select-none">404</p>
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">Page not found</h1>
      <p className="text-ink-500">Looks like this design got lost in the wash.</p>
      <Link to="/" className="btn-primary mt-4">Go back home</Link>
    </div>
  )
}
