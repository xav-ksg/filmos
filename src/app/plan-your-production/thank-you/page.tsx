import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Thanks — we&apos;re on it.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-neutral-300">
          We&apos;ve received your submission and will follow up within two
          business days at the email you provided. In the meantime, browse our{' '}
          <Link
            href="/locations"
            className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
          >
            location library
          </Link>{' '}
          or review the{' '}
          <Link
            href="/permits"
            className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
          >
            permit process
          </Link>
          .
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm text-neutral-400 hover:text-white"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  )
}
