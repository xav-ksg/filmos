import Link from 'next/link'

type FeeRow = { crew: string; rate: string }

const filmingFees: FeeRow[] = [
  { crew: '1–2 people, camera & tripod only', rate: '$0/day' },
  { crew: '1–10 people', rate: '$150/day' },
  { crew: '11–30 people', rate: '$250/day' },
  { crew: '31–49 people', rate: '$500/day' },
  { crew: 'Over 50 people', rate: '$750/day' },
]

const stillPhotoFees: FeeRow[] = [
  { crew: '1–10 people', rate: '$50/day' },
  { crew: '11–30 people', rate: '$150/day' },
  { crew: 'Over 30 people', rate: '$250/day' },
]

function FeeTable({ title, rows }: { title: string; rows: FeeRow[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        {title}
      </h3>
      <table className="mt-3 w-full border-separate border-spacing-0 text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.crew}>
              <td className="border-b border-neutral-800 py-2 pr-4 text-neutral-200">
                {row.crew}
              </td>
              <td className="border-b border-neutral-800 py-2 text-right font-medium text-white">
                {row.rate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function YosemitePermitPage() {
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
            Filming in Yosemite National Park
          </h1>
          <p className="mt-4 text-lg text-neutral-300">
            Federal NPS permits, fees, and restrictions.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">When no permit is required</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>• Crews of 8 or fewer</li>
            <li>• Hand-carried equipment only</li>
            <li>• Open public areas</li>
            <li>• No adverse impact on resources or visitors</li>
            <li>• No exclusive site use</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">When a permit IS required</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>• Crews of 9+</li>
            <li>
              • Non-hand-carried equipment (dollies, generators, vehicles)
            </li>
            <li>
              • Wilderness areas (always requires a permit regardless of crew
              size)
            </li>
            <li>• Exclusive site use</li>
            <li>
              • Any activity potentially disturbing visitors or resources
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Fees</h2>

          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Application processing fee
              </h3>
              <ul className="mt-3 space-y-2 text-base text-neutral-200">
                <li>
                  • <span className="font-medium text-white">$200</span> —
                  minimal oversight (small crew, camera &amp; tripod,
                  non-wilderness, public areas)
                </li>
                <li>
                  • <span className="font-medium text-white">$300</span> —
                  greater oversight (crews of 3+, sound recording, interviews,
                  wilderness, vehicles, props/lights)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Monitoring
              </h3>
              <ul className="mt-3 space-y-2 text-base text-neutral-200">
                <li>
                  •{' '}
                  <span className="font-medium text-white">$500/day</span> flat
                  rate (4–11 hours)
                </li>
                <li>
                  •{' '}
                  <span className="font-medium text-white">$50/hour</span> for
                  each hour beyond 11
                </li>
              </ul>
            </div>

            <FeeTable
              title="Location fees by crew size — filming"
              rows={filmingFees}
            />

            <FeeTable
              title="Location fees by crew size — still photography"
              rows={stillPhotoFees}
            />

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Cancellation
              </h3>
              <p className="mt-3 text-base text-neutral-200">
                Minimum $100 per scheduled monitor.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Restrictions and disqualifiers
          </h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              • Weekends and holidays: still photography permits are NOT
              issued
            </li>
            <li>
              • Wilderness areas: no structures, motor vehicles, generators,
              mechanical transport, motorized equipment, motorboats, or
              aircraft landings
            </li>
            <li>
              • Tioga Road and Glacier Point Road are closed in winter,
              typically reopening in June
            </li>
            <li>
              • Aerial photography and drones: extremely restricted, rarely
              approved
            </li>
            <li>
              • Night filming with artificial lighting in wilderness:
              prohibited
            </li>
            <li>
              • Peregrine falcon nesting areas: air and ground restrictions
              apply
            </li>
            <li>
              • Wild animals captured elsewhere: prohibited, even if trained
            </li>
            <li>
              • Digging, cutting brush, or moving natural features: prohibited
              without environmental review
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Insurance and bond</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>• Minimum $1M liability insurance issued by a US company</li>
            <li>• United States named as &quot;additional insured&quot;</li>
            <li>
              • Refundable damage bond may be required for high-impact
              projects
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Application timeline</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              • <span className="font-medium text-white">Standard:</span>{' '}
              30-day minimum processing
            </li>
            <li>
              •{' '}
              <span className="font-medium text-white">
                Environmental, cultural, or tribal consultation review:
              </span>{' '}
              90-day minimum
            </li>
            <li>
              • NPS Film Permit Coordinator: (209) 379-1858
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">How to apply</h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              •{' '}
              <span className="font-medium text-white">Short form</span> —
              still photography and small crews [PLACEHOLDER: NPS Short Form
              PDF]
            </li>
            <li>
              •{' '}
              <span className="font-medium text-white">Long form</span> —
              filming and complex projects [PLACEHOLDER: NPS Long Form PDF]
            </li>
            <li>
              • Payment: check or money order only (no credit cards), payable
              to &quot;National Park Service&quot;
            </li>
          </ul>

          <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm text-neutral-300">
            <p className="font-semibold uppercase tracking-wide text-neutral-400">
              Mail to
            </p>
            <address className="mt-2 not-italic leading-relaxed">
              Attn: Catherine Carlisle-McMullen
              <br />
              Special Park Uses / Still Photography and Weddings
              <br />
              Yosemite National Park, National Park Service
              <br />
              P.O. Box 700
              <br />
              El Portal, CA 95318
            </address>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            How YFC supports Yosemite productions
          </h2>
          <ul className="mt-4 space-y-2 text-base text-neutral-200">
            <li>
              • Pre-application consultation on project feasibility and
              scoping
            </li>
            <li>• NPS coordinator liaison and application prep</li>
            <li>
              • Base camp logistics in Mariposa (lower cost than in-park
              staging)
            </li>
            <li>
              • Crew transportation between Mariposa and Yosemite Valley,
              Wawona, and El Portal
            </li>
            <li>• Local vendor network for extended shoots</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
