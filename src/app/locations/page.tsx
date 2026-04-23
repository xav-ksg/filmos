import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LocationsMap from '@/components/LocationsMap'

const categoryStyles: Record<string, string> = {
  natural: 'bg-emerald-900/60 text-emerald-200',
  pastoral: 'bg-amber-900/60 text-amber-200',
  built: 'bg-slate-800/60 text-slate-200',
}

export default async function LocationsPage() {
  const supabase = await createClient()

  const { data: locations } = await supabase
    .from('locations')
    .select('slug, name, category, summary, latitude, longitude')
    .eq('published', true)
    .order('name')

  const rows = locations ?? []

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Filming Locations
          </h1>
          <p className="mt-2 text-lg text-neutral-400">
            Yosemite and the Sierra foothills
          </p>
        </header>

        <div className="mb-12">
          <LocationsMap
            locations={rows.map((l) => ({
              slug: l.slug,
              name: l.name,
              category: l.category,
              latitude: l.latitude,
              longitude: l.longitude,
            }))}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 p-6 transition hover:border-neutral-600"
            >
              <span
                className={`self-start rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${
                  categoryStyles[loc.category] ??
                  'bg-neutral-800 text-neutral-300'
                }`}
              >
                {loc.category}
              </span>
              <h2 className="mt-4 text-2xl font-semibold">{loc.name}</h2>
              <p className="mt-3 text-sm text-neutral-400">{loc.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
