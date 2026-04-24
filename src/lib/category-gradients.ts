type CategoryKey = 'natural' | 'pastoral' | 'built'

export const categoryGradients: Record<CategoryKey, string> = {
  natural: 'bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600',
  pastoral: 'bg-gradient-to-br from-amber-900 via-orange-700 to-yellow-600',
  built: 'bg-gradient-to-br from-slate-800 via-slate-600 to-zinc-500',
}

const fallbackGradient =
  'bg-gradient-to-br from-slate-800 via-slate-600 to-slate-500'

function isCategoryKey(value: string): value is CategoryKey {
  return value === 'natural' || value === 'pastoral' || value === 'built'
}

export function getCategoryGradient(category: string): string {
  return isCategoryKey(category) ? categoryGradients[category] : fallbackGradient
}
