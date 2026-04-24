import Link from 'next/link'

// Transition placeholders — replace at Tourism Bureau handover.
// Target values: filmcommission@yosemite.com / (209) 347-1789.
const CONTACT_EMAIL_PLACEHOLDER = '[PLACEHOLDER — will be filmcommission@yosemite.com at handover]'
const CONTACT_PHONE_PLACEHOLDER = '[PLACEHOLDER — will be (209) 347-1789 at handover]'

export default function MariposaCountyPermitPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/permits"
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← Back to permits
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Filming in Mariposa County
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            No permit required for most productions on private land or public
            areas.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">When no permit is required</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>• Filming on private property with owner permission</li>
            <li>
              • Public areas without road closures, public-property
              encroachment, or large gatherings
            </li>
            <li>
              • Small crews, hand-carried equipment, no exclusive site use
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">When a permit IS required</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>• Road closures for production use</li>
            <li>• Encroachment onto public property</li>
            <li>• Large gatherings affecting public use</li>
            <li>
              • Activities requiring law enforcement or fire coordination
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            For these cases, the Film Commission coordinates directly with
            Mariposa County and the relevant agencies on your behalf.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">State-level considerations</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              • CA State Highways / Caltrans: separate permit required (12+
              business days advance)
            </li>
            <li>• California State Parks nearby: separate process</li>
            <li>
              • California Film Commission (film.ca.gov) coordinates
              state-property permits
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">What YFC provides</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              • Location scouting across Mariposa County: Yosemite Valley,
              Merced River, Hornitos, Mariposa downtown, Stockton Creek
              Preserve, and more (see{' '}
              <Link
                href="/locations"
                className="underline underline-offset-4 hover:text-white"
              >
                /locations
              </Link>
              )
            </li>
            <li>
              • Introductions to ranches, historic sites, and private
              landowners
            </li>
            <li>• County agency liaison for permit-requiring activities</li>
            <li>
              • Vendor coordination (lodging, catering, equipment, crew) via
              local network
            </li>
            <li>
              • Base camp logistics in Mariposa for Yosemite-bound productions
              (significantly lower cost than in-park staging)
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Key contacts</h2>
          <dl className="mt-4 space-y-4 text-base text-neutral-200">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Mariposa County Film Commission (YFC)
              </dt>
              <dd className="mt-1 text-neutral-300">
                {CONTACT_EMAIL_PLACEHOLDER} | {CONTACT_PHONE_PLACEHOLDER}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Mariposa County government (road/encroachment questions)
              </dt>
              <dd className="mt-1 text-neutral-300">
                info@mariposacounty.org | (209) 966-3222
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  )
}
