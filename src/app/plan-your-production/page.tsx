import IntakeForm from './IntakeForm'

export default function PlanYourProductionPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Plan Your Production
          </h1>
          <p className="mt-2 text-lg text-neutral-400">
            Tell us about your project — we&apos;ll follow up within two
            business days.
          </p>
        </header>

        <p className="mt-8 text-base leading-relaxed text-neutral-300">
          The Mariposa County Film Commission coordinates location scouting,
          permits, vendor connections, and base camp logistics for productions
          in Mariposa County and Yosemite National Park. Use this form to get
          started. Everything below is optional except name, email, and project
          title — tell us what you know, and we&apos;ll fill in the gaps
          together.
        </p>

        <IntakeForm />
      </div>
    </main>
  )
}
