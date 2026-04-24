import Link from 'next/link'

export default function SiteNav() {
  return (
    <nav className="border-b border-neutral-900 bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight hover:text-neutral-200"
        >
          FilmOS
        </Link>
        <div className="flex gap-6 text-sm text-neutral-400">
          <Link href="/locations" className="hover:text-white">
            Locations
          </Link>
          <Link href="/permits" className="hover:text-white">
            Permits
          </Link>
          <Link href="/plan-your-production" className="hover:text-white">
            Plan Your Production
          </Link>
        </div>
      </div>
    </nav>
  )
}
