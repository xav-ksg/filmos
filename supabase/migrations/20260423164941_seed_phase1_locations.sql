-- Seed: four reference locations for the YFC tenant (Phase 1).
-- All published=true so they appear on the public site. Idempotent via
-- ON CONFLICT (tenant_id, slug) — safe to re-run.

INSERT INTO public.locations (
  tenant_id, slug, name, category, summary, body,
  latitude, longitude, access_notes, permit_notes, published
) VALUES
-- (a) Stockton Creek Preserve
(
  'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1',
  'stockton-creek',
  'Stockton Creek Preserve',
  'natural',
  'A 400-acre open-space preserve on the edge of Mariposa with 6 miles of trails, oak woodland, seasonal creek, and dramatic Sierra foothill views. Reference location for Phase 1.',
  $$Stockton Creek Preserve sits directly south of the town of Mariposa, protecting 400 acres of blue oak woodland, grassy ridgelines, and a seasonal creek that runs heaviest from late winter through spring. Six miles of maintained trail wind from the Highway 140 trailhead up to the flume bench and the upper ridge, giving small- to medium-sized crews a full range of Sierra foothill terrain within a 10-minute drive of downtown.

The preserve's upper trails trace the alignment of a 19th-century water flume that once served Mariposa's Gold Rush-era mining operations — weathered concrete and rock masonry remain in situ along the route, a rare combination of industrial-historical structure and natural setting. The land was acquired by Sierra Foothill Conservancy in partnership with the Town of Mariposa and is now managed for habitat preservation and public access.

For productions, Stockton Creek offers cinematic flexibility: creek-adjacent forest and water features on the lower trails, open ridgeline vistas and golden-hour backlight on the upper sections, and the Flume Trail as a distinctive hybrid of terrain types. Trail width limits large vehicles, so the preserve is best matched to crews of up to 40 people using hand-carry equipment or small off-road transport. GeoJSON trail overlays are available from Mariposa County GIS for scout planning.$$,
  37.4827,
  -119.9667,
  'Open dawn to dusk. Parking lot at trailhead off Highway 140. Gated access for production vehicles with advance arrangement.',
  'Managed by Sierra Foothill Conservancy. Film permits required; contact YFC for coordination. Minimum 2-week advance notice.',
  true
),
-- (b) Merced River
(
  'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1',
  'merced-river',
  'Merced River',
  'natural',
  'Wild and Scenic River flowing from Yosemite through the Sierra Nevada foothills. Whitewater rapids in spring, calm swimming holes in summer, dramatic canyon scenery year-round.',
  $$The Merced River drops from Yosemite's high country through a forty-mile Wild and Scenic corridor on its way to the San Joaquin Valley, carving a dramatic granite canyon along Highway 140 between El Portal and Briceburg. The corridor offers productions one of the most accessible combinations of serious river geography, riparian forest, and canyon vistas in the Sierra — much of it visible from a paved two-lane highway that doubles as a natural camera path.

Shooting windows vary sharply by season. Spring (April through June) brings Class III–IV whitewater and peak flows from high-country snowmelt — strong for chase, rescue, and whitewater sequences. Midsummer settles into calm swimming holes and slow-water scenes with dramatic rock exposures. Late summer and fall offer low, clear water and warm canyon light; winter flows are quiet but scenes are often framed by fog and low sun. Named access points — Briceburg, Indian Flat, Red Bud, and the El Portal gateway — each carry their own crew-capacity and access profile; YFC can match the right access point to a given shoot.

Permitting is two-track. The river itself and its immediate riparian zone sit on federal land managed by the Bureau of Land Management, requiring BLM permits and, for larger operations, environmental review tied to the Wild and Scenic designation. Shore, roadside, and staging operations fall under Mariposa County and Caltrans jurisdiction. YFC coordinates across both tracks and can pre-screen productions for feasibility before formal applications go in.$$,
  37.6772,
  -119.9203,
  'Multiple access points along Highway 140 between Mariposa and El Portal. Federal land (BLM) requires coordination.',
  'Two-track permit process — Mariposa County permits for shore/road, BLM permits for river and riparian zones. Wild and Scenic designation adds environmental review.',
  true
),
-- (c) Hornitos
(
  'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1',
  'hornitos',
  'Hornitos',
  'pastoral',
  'Unincorporated ranching community founded 1850, preserved historic district with original adobes, ranch lands, and oak-studded pastoral vistas. Under 100 residents.',
  $$Hornitos was founded in 1850 by Mexican miners displaced from nearby Quartzburg during the Gold Rush. Today it survives as an unincorporated ranching community of fewer than 100 residents, with a preserved central plaza, the 1862 St. Catherine's Church on the hillside above town, original adobe ruins, and the masonry shells of several Gold Rush-era commercial buildings. The surrounding country is working cattle land — rolling, oak-studded pasture that shifts from emerald green in spring to gold for most of the year.

For period productions, Hornitos is a rare asset: the visual clutter of modern signage, utility hardware, and contemporary construction is minimal, the plaza's geometry is authentic to the 1850s, and the pastoral vistas around the town read equally as 19th-century California, Mexican-era Alta California, or generalized American West. The afternoon light on the hillside church and the long golden hour in the pastures are recognized by working DPs as exceptional.

Production coordination is meaningfully different from the town of Mariposa. Most of the land around Hornitos is privately held by a small number of ranching families; YFC maintains direct relationships with the key landowners and can broker introductions and access. Expect longer lead times than for public-land shoots, and plan for genuine partnership with the community — Hornitos residents are protective of the town's character and will engage closely with any production.$$,
  37.5022,
  -120.2450,
  'Off Highway 49 via Hornitos Road. Mostly private ranch land around the town center — coordinate with individual landowners via YFC.',
  'Mariposa County private-land track applies. YFC maintains relationships with key Hornitos landowners; introductions available.',
  true
),
-- (d) Mariposa Downtown Historic District
(
  'a1f05e1c-5f5e-4a5a-9e3a-f1f51ff0f0f1',
  'mariposa-downtown',
  'Mariposa Downtown Historic District',
  'built',
  $$The county seat's historic Main Street — 1850s storefronts, the oldest operating courthouse west of the Rockies, period architecture, working businesses. Walking-scale historic core.$$,
  $$Mariposa's downtown historic district is anchored by the Mariposa County Courthouse, built in 1854 and designated a California State Landmark — the oldest operating courthouse west of the Rockies and, together with the adjacent 1858 jail, the visual spine of the town. Main Street runs four blocks of mixed 1850s–early 20th century commercial architecture: wood-frame false-front stores, brick Italianate facades, a Carnegie-era library, and the Mariposa Museum and History Center in a preserved period building.

Production logistics are unusually friendly for a historic district. Main Street is accessible directly from Highway 140, curbside parking runs the full length of the district, and a municipal lot a block off Main absorbs crew vehicles. Merchant cooperation is high — many Main Street businesses have hosted productions before and are accustomed to short-term closures, signage changes, and early-morning load-ins. County and municipal permit processes are coordinated through a single YFC-managed workflow.

The district serves productions across a wide range of periods and genres. Westerns and Gold Rush-era dramas find ready-made streetscapes with minimal set dressing. Early-20th-century and mid-century period work benefits from the intact commercial facades and the courthouse's continuous operating history. Contemporary small-town productions — indie features, episodic television, commercial work — use the district as-is. Interior access to the courthouse requires separate coordination with the California State Parks and the county; YFC handles that paperwork on behalf of approved productions.$$,
  37.4847,
  -119.9664,
  'Main Street accessible off Highway 140. Curbside parking; municipal lot one block off Main. Business cooperation strong.',
  'County + municipal permits. Courthouse interior requires separate state-level coordination (it''s a California State Landmark). YFC handles the paperwork.',
  true
)
ON CONFLICT (tenant_id, slug) DO NOTHING;
