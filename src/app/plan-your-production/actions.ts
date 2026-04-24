'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'

type IntakeInsert = Database['public']['Tables']['intake_submissions']['Insert']

const YFC_TENANT_ID = 'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type IntakeFormState = { error: string | null }

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function optionalString(formData: FormData, key: string): string | null {
  const value = getString(formData, key)
  return value === '' ? null : value
}

function optionalNumber(formData: FormData, key: string): number | null {
  const value = getString(formData, key)
  if (value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export async function submitIntake(
  _prevState: IntakeFormState,
  formData: FormData,
): Promise<IntakeFormState> {
  const contact_name = getString(formData, 'contact_name')
  const contact_email = getString(formData, 'contact_email')
  const project_title = getString(formData, 'project_title')

  if (!contact_name || !contact_email || !project_title) {
    return { error: 'Please provide your name, email, and a project title.' }
  }
  if (!EMAIL_RE.test(contact_email)) {
    return { error: 'Please enter a valid email address.' }
  }

  const payload: IntakeInsert = {
    tenant_id: YFC_TENANT_ID,
    status: 'new',
    contact_name,
    contact_email,
    project_title,
    contact_phone: optionalString(formData, 'contact_phone'),
    company: optionalString(formData, 'company'),
    project_type: optionalString(formData, 'project_type'),
    start_date: optionalString(formData, 'start_date'),
    end_date: optionalString(formData, 'end_date'),
    crew_size: optionalNumber(formData, 'crew_size'),
    budget_range: optionalString(formData, 'budget_range'),
    locations_of_interest: optionalString(formData, 'locations_of_interest'),
    message: optionalString(formData, 'message'),
    source: optionalString(formData, 'source') ?? 'web_form_v1',
  }

  const supabase = await createClient()
  const { error } = await supabase.from('intake_submissions').insert(payload)

  if (error) {
    return {
      error: `We couldn't save your submission. Please try again, or email us directly. (${error.message})`,
    }
  }

  redirect('/plan-your-production/thank-you')
}
