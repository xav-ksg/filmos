import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCategoryGradient } from '@/lib/category-gradients'

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: location } = await supabase
    .from('locations')
    .select(
      'slug, name, category, summary, body, latitude, longitude, access_notes, permit_notes',
    )
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (!location) notFound()

  const paragraphs = (location.body ?? '').split(/\n{2,}/).filter(Boolean)

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div
        className={`relative h-64 md:h-80 ${getCategoryGradient(location.category)}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="inline-block rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            {location.category}
          </span>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            {location.name}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/locations"
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← Back to all locations
        </Link>

        <p className="mt-8 text-lg text-neutral-300">{location.summary}</p>

        <article className="mt-10 space-y-6 text-base leading-relaxed text-neutral-200">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Access
            </h2>
            <p className="mt-2 text-sm text-neutral-200">
              {location.access_notes}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Permits
            </h2>
            <p className="mt-2 text-sm text-neutral-200">
              {location.permit_notes}
            </p>
          </div>
        </section>

        <p className="mt-12 text-xs text-neutral-500">
          {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
        </p>
      </div>
    </main>
  )
}
