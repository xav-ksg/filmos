import Link from 'next/link'

// Transition placeholders — replace at Tourism Bureau handover.
// Target values: filmcommission@yosemite.com / (209) 347-1789.
const CONTACT_EMAIL_PLACEHOLDER = '[PLACEHOLDER — will be filmcommission@yosemite.com at handover]'
const CONTACT_PHONE_PLACEHOLDER = '[PLACEHOLDER — will be (209) 347-1789 at handover]'

export default function PermitsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Filming Permits in Mariposa County
          </h1>
          <p className="mt-2 text-lg text-neutral-400">
            Two tracks. One coordinated point of contact.
          </p>
        </header>

        <p className="max-w-3xl text-base leading-relaxed text-neutral-200">
          Mariposa County is a two-track region for filming. Most productions on
          private land or public areas don&apos;t require a county permit.
          Filming inside Yosemite National Park requires a federal NPS permit
          with distinct fees and restrictions. The Mariposa County Film
          Commission coordinates both tracks and supports productions from
          scouting through wrap.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/permits/mariposa-county"
            className="group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition-all hover:border-neutral-600 hover:ring-white/10"
          >
            <article>
              <div className="h-40 bg-gradient-to-br from-slate-800 via-slate-600 to-zinc-500" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold">Mariposa County</h2>
                <p className="mt-3 text-sm text-neutral-400">
                  Private land and most public areas. No permit required in
                  most cases.
                </p>
              </div>
            </article>
          </Link>

          <Link
            href="/permits/yosemite"
            className="group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition-all hover:border-neutral-600 hover:ring-white/10"
          >
            <article>
              <div className="h-40 bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold">
                  Yosemite National Park
                </h2>
                <p className="mt-3 text-sm text-neutral-400">
                  Federal NPS permits. $200–$300 application + $500/day
                  monitoring fee.
                </p>
              </div>
            </article>
          </Link>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold">We handle the coordination</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-200">
            The Mariposa County Film Commission is your single production point
            of contact across both tracks — from early scouting through wrap.
            Whether a shoot stays on private land, crosses into Yosemite, or
            does both in the same week, productions work with one team.
          </p>
          <ul className="mt-6 space-y-2 text-base text-neutral-200">
            <li>• Location scouting across the county and inside the park</li>
            <li>• County agency coordination for permit-requiring activities</li>
            <li>• NPS liaison for Yosemite applications and on-set monitoring</li>
            <li>• Vendor connections: crew, lodging, catering, equipment</li>
            <li>• Base camp logistics in Mariposa for Yosemite-bound productions</li>
          </ul>
        </section>

        <section className="mt-16 max-w-3xl rounded-lg border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Contact
          </h2>
          <p className="mt-3 text-lg font-semibold text-white">
            Mariposa County Film Commission
          </p>
          <dl className="mt-3 space-y-1 text-sm text-neutral-300">
            <div className="flex gap-2">
              <dt className="w-16 text-neutral-500">Email</dt>
              <dd>{CONTACT_EMAIL_PLACEHOLDER}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-neutral-500">Phone</dt>
              <dd>{CONTACT_PHONE_PLACEHOLDER}</dd>
            </div>
          </dl>
        </section>

        <p className="mt-16 max-w-3xl text-xs leading-relaxed text-neutral-500">
          The Mariposa County Film Commission is being established under the
          Yosemite Film Commission (YFC), with the founding support of the
          Yosemite Mariposa County Tourism Bureau.
        </p>
      </div>
    </main>
  )
}
