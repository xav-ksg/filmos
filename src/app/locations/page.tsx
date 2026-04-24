import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LocationsMap from '@/components/LocationsMap'
import { getCategoryGradient } from '@/lib/category-gradients'

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
              className="group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition-all hover:border-neutral-600 hover:ring-white/10"
            >
              <article>
                <div
                  className={`relative h-40 ${getCategoryGradient(loc.category)}`}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                    {loc.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold">{loc.name}</h2>
                  <p className="mt-3 text-sm text-neutral-400">{loc.summary}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
