import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('name, slug, domain')
    .eq('slug', 'yfc')
    .limit(1)
    .maybeSingle()

  if (error || !tenant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <p className="text-lg">Tenant not found</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-white">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Welcome to {tenant.name}
      </h1>
      <p className="text-sm text-neutral-400">Tenant slug: {tenant.slug}</p>
      <p className="text-sm text-neutral-400">Domain: {tenant.domain}</p>
    </main>
  )
}
