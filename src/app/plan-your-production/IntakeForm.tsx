'use client'

import { useActionState } from 'react'
import { submitIntake, type IntakeFormState } from './actions'

const initialState: IntakeFormState = { error: null }

const inputClass =
  'w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none'
const labelClass = 'mb-1 block text-sm font-medium text-neutral-300'
const sectionHeadingClass =
  'mb-6 border-b border-neutral-800 pb-2 text-xl font-semibold'

function RequiredStar() {
  return <span className="ml-0.5 text-emerald-400">*</span>
}

export default function IntakeForm() {
  const [state, formAction, pending] = useActionState(submitIntake, initialState)

  return (
    <form action={formAction} className="mt-10 space-y-12">
      <input type="hidden" name="source" value="web_form_v1" />

      <section>
        <h2 className={sectionHeadingClass}>About you</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="contact_name" className={labelClass}>
              Full name<RequiredStar />
            </label>
            <input
              id="contact_name"
              name="contact_name"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact_email" className={labelClass}>
              Email<RequiredStar />
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact_phone" className={labelClass}>
              Phone
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className={sectionHeadingClass}>About your project</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="project_title" className={labelClass}>
              Project title<RequiredStar />
            </label>
            <input
              id="project_title"
              name="project_title"
              type="text"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="project_type" className={labelClass}>
              Project type
            </label>
            <select
              id="project_type"
              name="project_type"
              defaultValue=""
              className={inputClass}
            >
              <option value="">Select…</option>
              <option value="Feature Film">Feature Film</option>
              <option value="Commercial">Commercial</option>
              <option value="Documentary">Documentary</option>
              <option value="TV / Streaming Series">TV / Streaming Series</option>
              <option value="Music Video">Music Video</option>
              <option value="Photography / Stills">Photography / Stills</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="crew_size" className={labelClass}>
              Crew size
            </label>
            <input
              id="crew_size"
              name="crew_size"
              type="number"
              min={0}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="start_date" className={labelClass}>
              Start date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="end_date" className={labelClass}>
              End date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="budget_range" className={labelClass}>
              Budget range
            </label>
            <select
              id="budget_range"
              name="budget_range"
              defaultValue=""
              className={inputClass}
            >
              <option value="">Select…</option>
              <option value="Under $10K">Under $10K</option>
              <option value="$10K–$50K">$10K–$50K</option>
              <option value="$50K–$250K">$50K–$250K</option>
              <option value="$250K–$1M">$250K–$1M</option>
              <option value="Over $1M">Over $1M</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className={sectionHeadingClass}>Locations and details</h2>
        <div className="space-y-5">
          <div>
            <label htmlFor="locations_of_interest" className={labelClass}>
              Locations of interest
            </label>
            <textarea
              id="locations_of_interest"
              name="locations_of_interest"
              rows={3}
              placeholder="Which Mariposa County locations interest you? Or describe the look you're after."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              Anything else
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us anything else about your project — timeline, special requirements, what kind of support you're hoping for."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {state.error && (
        <div
          role="alert"
          className="rounded-md bg-red-950/30 px-4 py-3 text-sm text-red-400"
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {pending ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
