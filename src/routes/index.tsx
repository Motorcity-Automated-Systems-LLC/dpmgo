import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ComponentType } from 'react';
import { ArrowDownRight, ArrowRight, ChevronDown, Clock3, Compass, ExternalLink, Layers3, LocateFixed, MapPin, Navigation2, Radio, Route as RouteIcon, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { peopleMoverStations, type Station } from '@/data/transit';

type MapProps = { peopleMover: boolean; qline: boolean; selectedId: string | null; onSelect: (id: string) => void; onReady?: (ready: boolean) => void };
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
  const selected = peopleMoverStations.find(station => station.id === selectedId) ?? null;
  const filtered = peopleMoverStations.filter(station => station.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { import('@/components/TransitMap').then(module => setMapComponent(() => module.default)); }, []);
  const openStation = (id: string) => { setSelectedId(id); setStationListOpen(false); };

  return (
    <main className="app-shell">
      <div className="map-plane" aria-hidden={!MapComponent}>
        <div className="map-placeholder" aria-hidden="true"><div className="map-placeholder-grid" /></div>
        {MapComponent && <MapComponent peopleMover={peopleMover} qline={qline} selectedId={selectedId} onSelect={openStation} onReady={setMapReady} />}
        <div className="map-vignette" />
      </div>
      <div className="interface-shell">
        <header className="topbar">
          <div className="brand-block">
            <div className="brand-symbol" aria-hidden="true"><span /><span /><span /></div>
            <div><div className="brand-name">DPM <span>–</span> Go<span className="brand-bang">!</span></div><div className="brand-caption">MOTORCITY AUTOMATED SYSTEMS</div></div>
          </div>
          <div className="topbar-right">
            <div className="city-tag"><span className="signal-dot" /> DETROIT, MI <span className="tag-divider">/</span> TRANSIT NETWORK</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="hudOutline" size="hud" aria-label="Open Detroit events and sports links"><span className="desktop-label">EXPLORE DETROIT</span><span className="mobile-label">EVENTS</span><ChevronDown size={14}/></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="event-menu">
                <DropdownMenuLabel className="event-menu-heading">AROUND DOWNTOWN <span>↗</span></DropdownMenuLabel>
                <DropdownMenuSeparator />
                {eventLinks.map((item, index) => <DropdownMenuItem key={item.label} asChild><a href={item.href} target="_blank" rel="noopener noreferrer" className="event-link"><span className="event-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{item.label}</strong><small>{item.source}</small></span><ExternalLink size={13} /></a></DropdownMenuItem>)}
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
        <footer className="compliance-footer">MOTORCITY AUTOMATED SYSTEMS <span>·</span> DPM - Go! <span className="footer-end">Building Targeted Autonomous Solutions for Detroit</span></footer>
      </div>

      <Drawer open={stationListOpen} onOpenChange={setStationListOpen} shouldScaleBackground={false}>
        <DrawerContent className="station-drawer"><DrawerHeader><div className="drawer-eyebrow">PEOPLE MOVER / DIRECTORY</div><DrawerTitle>Choose a station</DrawerTitle><DrawerDescription>Downtown Detroit · 13 stops</DrawerDescription></DrawerHeader><div className="mobile-directory">{peopleMoverStations.map((station, index) => <Button key={station.id} variant="directory" onClick={() => openStation(station.id)}><span>{String(index + 1).padStart(2, '0')}</span>{station.name}<ArrowRight size={15}/></Button>)}</div></DrawerContent>
      </Drawer>

      <Drawer open={!!selected} onOpenChange={open => { if (!open) setSelectedId(null); }} shouldScaleBackground={false}>
        <DrawerContent className="detail-drawer">{selected && <StationDetails station={selected} />}</DrawerContent>
      </Drawer>
    </main>
  );
}

function StationDetails({ station }: { station: Station }) {
  const number = peopleMoverStations.indexOf(station) + 1;
  const next = peopleMoverStations[number % peopleMoverStations.length];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.coordinate[1]},${station.coordinate[0]}`;
  return <div className="detail-content">
    <DrawerHeader className="detail-heading"><div className="drawer-eyebrow"><span className="signal-dot" /> PEOPLE MOVER <span className="detail-divider">/</span> STATION {String(number).padStart(2, '0')}</div><DrawerTitle>{station.name}</DrawerTitle><DrawerDescription>{station.neighborhood}, Detroit</DrawerDescription></DrawerHeader>
    <div className="detail-stats"><div><span>LINE</span><strong>01 <small>/ 13</small></strong></div><div><span>NEXT STOP</span><strong className="next-stop">{next.name}</strong></div><div><span>ARRIVALS</span><strong className="arrival-unavailable">Not available</strong></div></div>
    <div className="detail-body"><div className="detail-section-title"><span>NEAR THIS STATION</span><span>LOCAL SPOTS ↗</span></div><p className="detail-note">Explore nearby places. Walking times and business hours vary; confirm before you go.</p><div className="restaurant-list">{station.restaurants.map(restaurant => <a key={restaurant.name} href={restaurant.url} target="_blank" rel="noopener noreferrer" className="restaurant-item"><span className="restaurant-icon"><MapPin size={17}/></span><span className="restaurant-main"><strong>{restaurant.name}</strong><small>{restaurant.category}</small></span><span className="restaurant-price">{restaurant.price}</span><ExternalLink size={15} className="restaurant-arrow" /></a>)}</div>
      <div className="station-actions"><Button variant="hudActive" asChild><a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation2 size={16}/> WALKING DIRECTIONS <ExternalLink size={13}/></a></Button><div className="coordinates"><Compass size={14}/>{station.coordinate[1].toFixed(4)}° N, {Math.abs(station.coordinate[0]).toFixed(4)}° W</div></div>
    </div>
    <div className="detail-disclaimer"><Clock3 size={13}/> Vehicle markers are simulated. Live service and arrival data are not connected.</div>
  </div>;
}
