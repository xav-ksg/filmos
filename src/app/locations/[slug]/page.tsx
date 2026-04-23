import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const categoryStyles: Record<string, string> = {
  natural: 'bg-emerald-900/60 text-emerald-200',
  pastoral: 'bg-amber-900/60 text-amber-200',
  built: 'bg-slate-800/60 text-slate-200',
}

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
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/locations"
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← Back to all locations
        </Link>

        <header className="mt-8">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${
              categoryStyles[location.category] ??
              'bg-neutral-800 text-neutral-300'
            }`}
          >
            {location.category}
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {location.name}
          </h1>
          <p className="mt-4 text-lg text-neutral-300">{location.summary}</p>
        </header>

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
