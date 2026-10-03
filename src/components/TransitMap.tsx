import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type * as GeoJSON from 'geojson';
import { peopleMoverStations, qlineStops, type Coordinate } from '@/data/transit';

type Props = { peopleMover: boolean; qline: boolean; selectedId: string | null; onSelect: (id: string) => void; onReady?: (ready: boolean) => void };
type Point = GeoJSON.Feature<GeoJSON.Point>;
const point = (coordinate: Coordinate): Point => ({ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: coordinate } });
const route = (coordinates: Coordinate[]): GeoJSON.Feature<GeoJSON.LineString> => ({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } });
const moverPath = peopleMoverStations.map(s => s.coordinate);
const qPath = qlineStops.map(s => s.coordinate);
const routeData = (coordinates: Coordinate[]): GeoJSON.FeatureCollection => ({ type: 'FeatureCollection', features: [route(coordinates)] });
const dotData = (coordinate: Coordinate): GeoJSON.FeatureCollection => ({ type: 'FeatureCollection', features: [point(coordinate)] });

// This is a visual simulation, not a feed of real vehicle positions. Each stop holds for 12 seconds.
function simulatedPosition(path: Coordinate[], elapsed: number, loop: boolean): Coordinate {
  if (path.length < 2) return path[0] ?? [-83.0458, 42.3314];
  const dwell = 12000;
  const travel = 11000;
  const segments = loop ? path.length : (path.length - 1) * 2;
  const step = Math.floor(elapsed / (dwell + travel)) % segments;
  const progress = Math.max(0, Math.min(1, (elapsed % (dwell + travel) - dwell) / travel));
  const from = loop ? step : step < path.length - 1 ? step : segments - step;
  const to = loop ? (from + 1) % path.length : step < path.length - 1 ? from + 1 : from - 1;
  const a = path[from] ?? path[0] ?? [-83.0458, 42.3314]; const b = path[to] ?? path[0] ?? [-83.0458, 42.3314];
  return [a[0] + (b[0] - a[0]) * progress, a[1] + (b[1] - a[1]) * progress];
}

export default function TransitMap({ peopleMover, qline, selectedId, onSelect, onReady }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const onSelectRef = useRef(onSelect);
  const startRef = useRef<number | null>(null);
  const enabledRef = useRef({ peopleMover, qline });
  onSelectRef.current = onSelect;
  enabledRef.current = { peopleMover, qline };

  useEffect(() => {
    if (!container.current) return;
    mapboxgl.accessToken = import.meta.env['VITE_MAPBOX_TOKEN'] || import.meta.env['VITE_LOVABLE_CONNECTOR_MAPBOX_PUBLIC_TOKEN'] || 'pk.eyJ1Ijoic2VwaDA3IiwiYSI6ImNtdXJlemRzdDBsbGIyem9lM3FiMjNybTgifQ.L5t2LjoKXMStl9gL-837Nw';
    const map = new mapboxgl.Map({ container: container.current, style: 'mapbox://styles/mapbox/satellite-streets-v12', center: [-83.0458, 42.3314], zoom: 15.5, pitch: 50, bearing: -20, antialias: true, attributionControl: false });
    mapRef.current = map;
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
    let frame = 0;
    const addLine = (id: string, coordinates: Coordinate[], color: string, width: number) => {
      map.addSource(id, { type: 'geojson', data: routeData(coordinates) });
      map.addLayer({ id, type: 'line', source: id, layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': color, 'line-width': width, 'line-opacity': 0.95, 'line-blur': 0.35 } });
    };
    map.on('load', () => {
      // Extrude building footprints where the Mapbox composite source provides them.
      try {
        map.addLayer({ id: 'dpm-3d-buildings', source: 'composite', 'source-layer': 'building', filter: ['==', 'extrude', 'true'], type: 'fill-extrusion', minzoom: 14, paint: { 'fill-extrusion-color': '#7e9aa7', 'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.5, ['get', 'height']], 'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.5, ['get', 'min_height']], 'fill-extrusion-opacity': 0.66 } });
      } catch { /* Some satellite styles do not expose the building source. */ }
      addLine('mover-line', [...moverPath, moverPath[0] ?? [-83.0536, 42.3323]], '#00f0ff', 4);
      addLine('qline-line', qPath, '#ffbb70', 3);
      map.addSource('stations', { type: 'geojson', data: { type: 'FeatureCollection', features: peopleMoverStations.map((s, i) => ({ ...point(s.coordinate), properties: { id: s.id, name: s.name, number: i + 1 } })) } });
      map.addLayer({ id: 'station-halo', type: 'circle', source: 'stations', paint: { 'circle-radius': 15, 'circle-color': '#00f0ff', 'circle-opacity': 0.15, 'circle-blur': 0.55 } });
      map.addLayer({ id: 'station-pins', type: 'circle', source: 'stations', paint: { 'circle-radius': 7, 'circle-color': '#07131b', 'circle-stroke-color': '#00f0ff', 'circle-stroke-width': 2.5 } });
      map.addLayer({ id: 'station-labels', type: 'symbol', source: 'stations', layout: { 'text-field': ['get', 'name'], 'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'], 'text-size': 11, 'text-offset': [0, 1.45], 'text-anchor': 'top', 'text-optional': true }, paint: { 'text-color': '#eafaff', 'text-halo-color': '#07131b', 'text-halo-width': 1.5 } });
      map.addSource('qline-stops', { type: 'geojson', data: { type: 'FeatureCollection', features: qlineStops.map(s => point(s.coordinate)) } });
      map.addLayer({ id: 'qline-stops', type: 'circle', source: 'qline-stops', paint: { 'circle-radius': 4, 'circle-color': '#ffbb70', 'circle-stroke-color': '#07131b', 'circle-stroke-width': 1.5 } });
      map.addSource('mover-vehicle', { type: 'geojson', data: dotData(moverPath[0] ?? [-83.0536, 42.3323]) });
      map.addSource('qline-vehicle', { type: 'geojson', data: dotData(qPath[0] ?? [-83.0445, 42.3295]) });
      for (const [id, color] of [['mover-vehicle', '#00f0ff'], ['qline-vehicle', '#ffbb70']] as const) {
        map.addLayer({ id: `${id}-glow`, type: 'circle', source: id, paint: { 'circle-radius': 19, 'circle-color': color, 'circle-opacity': 0.24, 'circle-blur': 0.65 } });
        map.addLayer({ id, type: 'circle', source: id, paint: { 'circle-radius': 7, 'circle-color': color, 'circle-stroke-color': '#07131b', 'circle-stroke-width': 2 } });
      }
      map.on('click', 'station-pins', e => {
        const id = e.features?.[0]?.properties?.id;
        if (typeof id === 'string') onSelectRef.current(id);
      });
      map.on('mouseenter', 'station-pins', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'station-pins', () => { map.getCanvas().style.cursor = ''; });
      onReady?.(true);
      let lastUpdate = 0;
      const animate = (time: number) => {
        if (startRef.current === null) startRef.current = time;
        if (time - lastUpdate > 50) {
          const elapsed = time - startRef.current;
          (map.getSource('mover-vehicle') as mapboxgl.GeoJSONSource)?.setData(dotData(simulatedPosition(moverPath, elapsed, true)));
          (map.getSource('qline-vehicle') as mapboxgl.GeoJSONSource)?.setData(dotData(simulatedPosition(qPath, elapsed, false)));
          lastUpdate = time;
        }
        frame = requestAnimationFrame(animate);
      };
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) frame = requestAnimationFrame(animate);
      for (const id of ['mover-line', 'station-halo', 'station-pins', 'station-labels', 'mover-vehicle', 'mover-vehicle-glow']) map.setLayoutProperty(id, 'visibility', enabledRef.current.peopleMover ? 'visible' : 'none');
      for (const id of ['qline-line', 'qline-stops', 'qline-vehicle', 'qline-vehicle-glow']) map.setLayoutProperty(id, 'visibility', enabledRef.current.qline ? 'visible' : 'none');
    });
    const resetView = () => map.flyTo({ center: [-83.0458, 42.3314], zoom: 15.5, pitch: 50, bearing: -20, duration: 900 });
    window.addEventListener('dpm-map-reset', resetView);
    map.on('error', e => { console.warn('Mapbox map error:', e.error); });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('dpm-map-reset', resetView); map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getLayer('mover-line')) return;
    for (const id of ['mover-line', 'station-halo', 'station-pins', 'station-labels', 'mover-vehicle', 'mover-vehicle-glow']) map.setLayoutProperty(id, 'visibility', peopleMover ? 'visible' : 'none');
    for (const id of ['qline-line', 'qline-stops', 'qline-vehicle', 'qline-vehicle-glow']) map.setLayoutProperty(id, 'visibility', qline ? 'visible' : 'none');
  }, [peopleMover, qline]);

  useEffect(() => {
    const map = mapRef.current;
    const station = peopleMoverStations.find(s => s.id === selectedId);
    if (map && station) map.flyTo({ center: station.coordinate, zoom: Math.max(map.getZoom(), 15.5), duration: 900, essential: true });
  }, [selectedId]);

  return <div ref={container} className="h-full w-full" aria-label="Satellite map of downtown Detroit transit stops" />;
}
