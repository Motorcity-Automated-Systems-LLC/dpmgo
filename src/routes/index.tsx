import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ComponentType } from 'react';
import { ArrowDownRight, ArrowRight, ChevronDown, Clock3, Compass, ExternalLink, Layers3, LocateFixed, MapPin, Navigation2, Radio, Route as RouteIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { peopleMoverStations, nearbyRestaurants, sportsTeams, activities, type Station } from '@/data/transit';
import logo from '@/assets/dpm-go-logo.jpg.asset.json';

const diningImages = import.meta.glob<{ url: string }>('/src/assets/dining/*.asset.json', { eager: true, import: 'default' });
const diningImage = (id: string) => diningImages[`/src/assets/dining/${id}.jpg.asset.json`]?.url;

type MapProps = { peopleMover: boolean; qline: boolean; selectedId: string | null; onSelect: (id: string) => void; onReady?: (ready: boolean) => void; restaurantId?: string | null };
const eventLinks = [
  { label: 'Downtown Detroit events', source: 'Downtown Detroit Partnership', href: 'https://downtowndetroit.org/events/' },
  { label: 'What’s happening in Detroit', source: 'Visit Detroit', href: 'https://visitdetroit.com/events/' },
  { label: 'Tigers schedule', source: 'MLB', href: 'https://www.mlb.com/tigers/schedule' },
  { label: 'Lions schedule', source: 'NFL', href: 'https://www.detroitlions.com/schedule/' },
  { label: 'Pistons schedule', source: 'NBA', href: 'https://www.nba.com/pistons/schedule' },
  { label: 'Red Wings schedule', source: 'NHL', href: 'https://www.nhl.com/redwings/schedule' },
];

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'DPM - Go! | Detroit Transit Map' },
    { name: 'description', content: 'Explore Detroit People Mover stations and the QLINE corridor on an interactive downtown map.' },
    { property: 'og:title', content: 'DPM - Go! | Detroit Transit Map' },
    { property: 'og:description', content: 'Explore Detroit People Mover stations and the QLINE corridor on an interactive downtown map.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [MapComponent, setMapComponent] = useState<ComponentType<MapProps> | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [peopleMover, setPeopleMover] = useState(true);
  const [qline, setQline] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [stationListOpen, setStationListOpen] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [panel, setPanel] = useState<null | 'activities' | string>(null);
  const [legal, setLegal] = useState<'terms' | 'privacy' | null>(null);
  const [waking, setWaking] = useState(true);
  const selected = peopleMoverStations.find(station => station.id === selectedId) ?? null;
  const filtered = peopleMoverStations.filter(station => station.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { import('@/components/TransitMap').then(module => setMapComponent(() => module.default)); }, []);
  useEffect(() => {
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1450;
    const timer = window.setTimeout(() => setWaking(false), delay);
    return () => window.clearTimeout(timer);
  }, []);
  const openStation = (id: string) => {
    setRestaurantId(null);
    if (stationListOpen) {
      setStationListOpen(false);
      window.setTimeout(() => setSelectedId(id), 320);
    } else setSelectedId(id);
  };

  return (
    <main className="app-shell">
      <div className="map-plane" aria-hidden={!MapComponent}>
        <div className="map-placeholder" aria-hidden="true"><div className="map-placeholder-grid" /></div>
        {MapComponent && <MapComponent peopleMover={peopleMover} qline={qline} selectedId={selectedId} onSelect={openStation} onReady={setMapReady} restaurantId={restaurantId} />}
        <div className="map-vignette" />
      </div>
      <div className="interface-shell">
        <header className="topbar">
          <div className="brand-block">
            <img src={logo.url} alt="DPM - Go! logo" className="brand-logo" />
            <div><div className="brand-name">DPM <span>–</span> Go<span className="brand-bang">!</span></div><div className="brand-caption">MOTORCITY AUTOMATED SYSTEMS</div></div>
          </div>
          <div className="topbar-right">
            <div className="city-tag"><span className="signal-dot" /> DETROIT, MI <span className="tag-divider">/</span> TRANSIT NETWORK</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="hudOutline" size="hud" aria-label="Open Detroit events and sports links"><span className="desktop-label">EXPLORE DETROIT</span><span className="mobile-label">EVENTS</span><ChevronDown size={14}/></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="event-menu">
                <DropdownMenuLabel className="event-menu-heading">DETROIT SPORTS</DropdownMenuLabel>
                {sportsTeams.map((t, i) => <DropdownMenuItem key={t.id} onSelect={() => setPanel(t.id)} className="event-link"><span className="event-index">{String(i + 1).padStart(2, '0')}</span><span><strong>{t.team}</strong><small>{t.league} · {t.venue}</small></span><ArrowRight size={13} /></DropdownMenuItem>)}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setPanel('activities')} className="event-link"><span className="event-index">05</span><span><strong>Activities</strong><small>Public events in Downtown Detroit</small></span><ArrowRight size={13} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <section className="headline-area" aria-label="Transit overview">
          <div className="overline"><span className="overline-bar" /> DOWNTOWN DETROIT <span className="overline-slash">/</span> SYSTEM OVERVIEW</div>
          <h1>Move through<br/><em>the Motor City.</em></h1>
          <p>Two lines. One city. Find your next stop.</p>
          <div className="route-switches" role="group" aria-label="Map layers">
            <Button variant={peopleMover ? 'hudActive' : 'hudInactive'} size="route" aria-pressed={peopleMover} onClick={() => setPeopleMover(v => !v)}><span className="route-pill-dot" /> PEOPLE MOVER <span className="route-pill-state">{peopleMover ? 'ON' : 'OFF'}</span></Button>
            <Button variant={qline ? 'hudWarm' : 'hudInactive'} size="route" aria-pressed={qline} onClick={() => setQline(v => !v)}><span className="route-pill-dot" /> QLINE <span className="route-pill-state">{qline ? 'ON' : 'OFF'}</span></Button>
          </div>
        </section>

        <aside className="network-panel" aria-label="People Mover stations">
          <div className="panel-header"><div><div className="panel-kicker"><span className="signal-dot"/> NETWORK 01</div><h2>People Mover</h2><p>Downtown loop <span>·</span> 13 stations <span>·</span> 2.9 miles</p></div><RouteIcon size={20} className="panel-route-icon" /></div>
          <div className="panel-rule" />
          <div className="panel-section-title"><span>STATION DIRECTORY</span><span>01 — 13</span></div>
          <label className="station-search"><Search size={15}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a station" aria-label="Find a station"/><kbd>⌕</kbd></label>
          <div className="station-scroll">
            {filtered.length ? filtered.map((station, index) => <Button key={station.id} variant="station" size="station" onClick={() => openStation(station.id)} className={selectedId === station.id ? 'station-selected' : ''}><span className="station-number">{String(peopleMoverStations.indexOf(station) + 1).padStart(2, '0')}</span><span className="station-track"><span className="station-node"/></span><span className="station-name">{station.name}</span><ArrowRight size={14} className="station-arrow" /></Button>) : <div className="empty-search">No stations found.</div>}
          </div>
          <div className="panel-bottom"><span><span className="tiny-diamond" /> ROUTE VISUALIZATION</span><span>SIMULATED VEHICLE</span></div>
        </aside>

        <div className="map-overlay-info"><span className="map-crosshair">⊕</span><div><strong>DOWNTOWN DETROIT</strong><small>42.3314° N &nbsp; 83.0458° W</small></div></div>
        <div className="map-controls"><Button variant="mapControl" size="icon" title="Reset map view" aria-label="Reset map view" onClick={() => window.dispatchEvent(new CustomEvent('dpm-map-reset'))}><LocateFixed size={18}/></Button></div>
        <div className="map-legend"><span><i className="legend-line cyan-line" /> PEOPLE MOVER</span><span><i className="legend-line warm-line" /> QLINE</span><span><i className="legend-vehicle" /> SIMULATED VEHICLE</span></div>
        <div className="status-strip"><div><Radio size={14} /><strong>NETWORK VISUALIZATION</strong><span className="status-divider">/</span><span>{mapReady ? 'MAP ONLINE' : 'LOADING MAP'}</span></div><span>VEHICLE POSITIONS ARE SIMULATED · NOT LIVE ARRIVALS</span></div>
        <Button variant="mobileStations" className="mobile-station-trigger" onClick={() => setStationListOpen(true)}><Layers3 size={18}/> VIEW ALL 13 STATIONS <ArrowDownRight size={17}/></Button>
         <footer className="compliance-footer"><span className="footer-brand">MOTORCITY AUTOMATED SYSTEMS <span>·</span> DPM - Go! <span className="footer-end">Building Targeted Autonomous Solutions for Detroit</span></span><nav aria-label="Official and legal links"><a href="https://www.thepeoplemover.com/" target="_blank" rel="noopener noreferrer">Official People Mover <ExternalLink size={11}/></a><Button variant="link" onClick={() => setLegal('terms')}>Terms &amp; Conditions</Button><Button variant="link" onClick={() => setLegal('privacy')}>Privacy Policy</Button></nav></footer>
      </div>

      <Drawer open={stationListOpen} onOpenChange={setStationListOpen} shouldScaleBackground={false}>
        <DrawerContent className="station-drawer"><DrawerHeader><div className="drawer-eyebrow">PEOPLE MOVER / DIRECTORY</div><DrawerTitle>Choose a station</DrawerTitle><DrawerDescription>Downtown Detroit · 13 stops</DrawerDescription></DrawerHeader><div className="mobile-directory">{peopleMoverStations.map((station, index) => <Button key={station.id} variant="directory" onClick={() => openStation(station.id)}><span>{String(index + 1).padStart(2, '0')}</span>{station.name}<ArrowRight size={15}/></Button>)}</div></DrawerContent>
      </Drawer>

      <Drawer open={!!selected} onOpenChange={open => { if (!open) setSelectedId(null); }} shouldScaleBackground={false}>
        <DrawerContent className="detail-drawer">{selected && <StationDetails station={selected} restaurantId={restaurantId} onRestaurant={setRestaurantId} />}</DrawerContent>
      </Drawer>
      <Drawer open={!!panel} onOpenChange={open => { if (!open) setPanel(null); }} shouldScaleBackground={false}>
        <DrawerContent className="station-drawer">{panel && <InfoPanel panel={panel} />}</DrawerContent>
      </Drawer>
      <Dialog open={!!legal} onOpenChange={open => { if (!open) setLegal(null); }}>
        <DialogContent className="legal-dialog"><DialogHeader><DialogTitle>{legal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}</DialogTitle><DialogDescription>DPM - Go! · Motorcity Automated Systems, LLC</DialogDescription></DialogHeader>
          {legal === 'terms' ? <div className="legal-copy">
            <p>DPM - Go! is provided by Motorcity Automated Systems, LLC for general trip planning and informational use. Software developed by Detroit Core Automation, LLC, a subsidiary of Motorcity Automated Systems, LLC.</p>
            <h3>Transit information</h3><p>Map locations, walking distances, vehicle animations, business listings and any future schedules or arrivals may be approximate, delayed, incomplete or unavailable. Vehicle positions shown here are simulations, not live tracking. Neither company operates the Detroit People Mover or QLINE, and neither guarantees transit service, arrival times, accessibility, opening hours, or third-party data accuracy. Always confirm service and travel conditions with the transit operator before traveling. Neither company is responsible for missed connections, transit delays, interruptions or decisions made in reliance on this app.</p>
            <h3>Third-party services</h3><p>Links to restaurants, transit agencies, map providers and event listings lead to independent services. Their content, pricing, availability and privacy practices are outside our control. Use of this app is at your own risk. To the extent permitted by law, Motorcity Automated Systems, LLC and Detroit Core Automation, LLC disclaim warranties and liability for losses arising from the app or third-party content. Nothing here limits rights that cannot legally be excluded.</p>
          </div> : <div className="legal-copy">
            <p>Software developed by Detroit Core Automation, LLC, a subsidiary of Motorcity Automated Systems, LLC.</p>
            <h3>Information and services</h3><p>DPM - Go! does not require an account or ask for your name, email or precise device location. Station search, map selections and dining selections are handled in your browser and are not saved to an account. Our hosting infrastructure may process standard technical information such as IP address and request logs to deliver and secure the site.</p>
            <h3>External providers</h3><p>Mapbox supplies map imagery and may receive your IP address and map requests when the map loads. Restaurant and transit links open independent websites governed by their own privacy policies. We do not control their data practices. We do not sell personal information through this app.</p>
            <h3>Questions</h3><p>For privacy questions, contact Motorcity Automated Systems, LLC through its official business channels. This policy applies to the DPM - Go! app and may change as live integrations are added.</p>
          </div>}
        </DialogContent>
      </Dialog>
      {waking && <div className="wake-screen" aria-label="Loading DPM - Go!" role="status"><img src={logo.url} alt="DPM - Go!" className="wake-logo"/><span className="wake-progress" /></div>}
    </main>
  );
}

function InfoPanel({ panel }: { panel: string }) {
  if (panel === 'activities') return <><DrawerHeader><div className="drawer-eyebrow">DOWNTOWN DETROIT / PUBLIC ACTIVITIES</div><DrawerTitle>Activities</DrawerTitle><DrawerDescription>Downtown-only public spots · live event feed coming soon</DrawerDescription></DrawerHeader>
    <div className="restaurant-list info-list">{activities.map(a => <a key={a.name} href={a.href} target="_blank" rel="noopener noreferrer" className="restaurant-item"><span className="restaurant-icon"><MapPin size={17}/></span><span className="restaurant-main"><strong>{a.name}</strong><small>{a.note} · near {a.station}</small></span><ExternalLink size={15} className="restaurant-arrow" /></a>)}</div></>;
  const t = sportsTeams.find(x => x.id === panel);
  if (!t) return null;
  return <><DrawerHeader><div className="drawer-eyebrow">{t.league} / DETROIT SPORTS</div><DrawerTitle>{t.team}</DrawerTitle><DrawerDescription>{t.venue} · ride to {t.station}</DrawerDescription></DrawerHeader>
    <div className="info-list"><div className="detail-stats"><div><span>NEXT / RECENT GAME</span><strong className="arrival-unavailable">Live data coming soon</strong></div><div><span>VENUE</span><strong className="next-stop">{t.venue}</strong></div><div><span>NEAREST STOP</span><strong className="next-stop">{t.station}</strong></div></div>
    <Button variant="hudActive" asChild className="info-button"><a href={t.href} target="_blank" rel="noopener noreferrer">OFFICIAL SCHEDULE <ExternalLink size={13}/></a></Button></div></>;
}

function StationDetails({ station, restaurantId, onRestaurant }: { station: Station; restaurantId: string | null; onRestaurant: (id: string) => void }) {
  const nearby = nearbyRestaurants(station);
  const number = peopleMoverStations.indexOf(station) + 1;
  const next = peopleMoverStations[number % peopleMoverStations.length] ?? station;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.entrance[1]},${station.entrance[0]}`;
  // Straight-line distance from Campus Martius, adjusted for a typical street-grid walking route.
  const radians = Math.PI / 180;
  const latDifference = (station.entrance[1] - 42.3316) * radians;
  const lonDifference = (station.entrance[0] + 83.0466) * radians;
  const a = Math.sin(latDifference / 2) ** 2 + Math.cos(42.3316 * radians) * Math.cos(station.entrance[1] * radians) * Math.sin(lonDifference / 2) ** 2;
  const walkingMiles = 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3;
  const walkingMinutes = Math.max(1, Math.round(walkingMiles * 20));
  return <div className="detail-content">
    <DrawerHeader className="detail-heading"><div className="drawer-eyebrow"><span className="signal-dot" /> PEOPLE MOVER <span className="detail-divider">/</span> STATION {String(number).padStart(2, '0')}</div><DrawerTitle>{station.name}</DrawerTitle><DrawerDescription>{station.neighborhood}, Detroit</DrawerDescription></DrawerHeader>
    <div className="detail-stats"><div><span>WALK FROM CAMPUS MARTIUS*</span><strong>{walkingMinutes} <small>min · ~{walkingMiles.toFixed(1)} mi</small></strong></div><div><span>NEXT STOP</span><strong className="next-stop">{next.name}</strong></div><div><span>ARRIVALS</span><strong className="arrival-unavailable">Not available</strong></div></div>
    <div className="detail-body"><div className="detail-section-title"><span>NEAR THIS STATION</span><span>LOCAL SPOTS ↗</span></div><p className="detail-note">Tap a spot to pin it on the map. Distances are walking estimates from this station entrance, not routed directions; times and business hours vary.</p><div className="restaurant-list">{nearby.map(r => <div key={r.id} className={`restaurant-item ${restaurantId === r.id ? 'station-selected' : ''}`}><Button type="button" variant="ghost" className="restaurant-select" onClick={() => onRestaurant(r.id)} aria-label={`Show ${r.name} on map`}><span className="restaurant-thumb">{diningImage(r.id) ? <img src={diningImage(r.id)} alt={`Map thumbnail of ${r.name}`} loading="lazy" /> : <MapPin size={17}/>}</span><span className="restaurant-main"><strong>{r.name}</strong><small>{r.category} · {r.walkMiles.toFixed(2)} mi · ~{Math.max(1, Math.round(r.walkMiles * 20))} min walk</small></span><span className="restaurant-price">{r.price}</span></Button><a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} website`} className="restaurant-arrow"><ExternalLink size={15} /></a></div>)}</div><p className="thumbnail-credit">Thumbnail maps © Mapbox © OpenStreetMap</p>
      <div className="station-actions"><Button variant="hudActive" asChild><a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation2 size={16}/> WALKING DIRECTIONS <ExternalLink size={13}/></a></Button><div className="coordinates"><Compass size={14}/>{station.coordinate[1].toFixed(4)}° N, {Math.abs(station.coordinate[0]).toFixed(4)}° W</div></div>
    </div>
    <div className="detail-disclaimer"><Clock3 size={13}/> *Walk is an estimate, not a routed trip. Vehicle markers are simulated; live arrivals are not connected.</div>
  </div>;
}
