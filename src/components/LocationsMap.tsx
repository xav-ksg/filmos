'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Map, Marker, Popup } from 'react-map-gl/mapbox'
import type { Database } from '@/lib/supabase/database.types'

type LocationRow = Database['public']['Tables']['locations']['Row']

export type LocationMapPoint = Pick<
  LocationRow,
  'slug' | 'name' | 'category' | 'latitude' | 'longitude'
>

type PlottablePoint = {
  slug: string
  name: string
  category: string
  latitude: number
  longitude: number
}

const categoryColors: Record<string, string> = {
  natural: '#10b981',
  pastoral: '#f59e0b',
  built: '#94a3b8',
}

export default function LocationsMap({
  locations,
}: {
  locations: LocationMapPoint[]
}) {
  const router = useRouter()
  const [hovered, setHovered] = useState<PlottablePoint | null>(null)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const points = useMemo<PlottablePoint[]>(
    () =>
      locations.flatMap((l) =>
        l.latitude != null && l.longitude != null
          ? [
              {
                slug: l.slug,
                name: l.name,
                category: l.category,
                latitude: l.latitude,
                longitude: l.longitude,
              },
            ]
          : [],
      ),
    [locations],
  )

  const initialCenter = useMemo(() => {
    if (points.length === 0) {
      return { longitude: -119.9667, latitude: 37.4827 }
    }
    const lat = points.reduce((s, p) => s + p.latitude, 0) / points.length
    const lng = points.reduce((s, p) => s + p.longitude, 0) / points.length
    return { longitude: lng, latitude: lat }
  }, [points])

  if (!token) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-sm text-neutral-400 md:h-[500px]">
        Map unavailable: Mapbox token missing
      </div>
    )
  }

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg md:h-[500px]">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: initialCenter.longitude,
          latitude: initialCenter.latitude,
          zoom: 9,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        {points.map((p) => (
          <Marker
            key={p.slug}
            longitude={p.longitude}
            latitude={p.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              router.push(`/locations/${p.slug}`)
            }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={p.name}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              className="h-4 w-4 cursor-pointer rounded-full border-2 border-white shadow-lg transition hover:scale-125"
              style={{
                backgroundColor: categoryColors[p.category] ?? '#94a3b8',
              }}
            />
          </Marker>
        ))}
        {hovered && (
          <Popup
            longitude={hovered.longitude}
            latitude={hovered.latitude}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            offset={12}
          >
            <span className="text-sm font-medium text-neutral-900">
              {hovered.name}
            </span>
          </Popup>
        )}
      </Map>
    </div>
  )
}
