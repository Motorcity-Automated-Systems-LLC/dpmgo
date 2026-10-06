# DPM - Go!

Build a mobile-first, high-performance transit utility web app called "DPM - Go!" for Motorcity Automated Systems, designed for Detroit transit riders. 

### 1. UI & Visual Architecture

- **Theme & Aesthetic:** Dark mode, high-contrast, futuristic urban transport HUD. Deep charcoal/navy backgrounds (#070B14), glowing neon-cyan transit lines (#00F0FF), and frosted glassmorphism containers (backdrop-blur-xl bg-slate-900/80 border border-cyan-500/30).

- **Header & Navigation:** Brand name "DPM - Go!" with pill-style live toggle switches for "PEOPLE MOVER" and "QLINE", plus a top dropdown menu for viewing downtown activity calendars, sports schedules, and multi-source event feeds.

### 2. 3D Satellite Map Canvas & Telemetry

- **Mapbox Integration:** Initialize Mapbox GL JS using `mapbox://styles/mapbox/satellite-streets-v12`. Ensure `mapbox-gl/dist/mapbox-gl.css` is imported and `mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN`. Center on downtown Detroit `[-83.0458, 42.3314]` with a zoom of `15.5` and a pitch of `50` degrees for 3D isometric building extrusions (e.g., Renaissance Center).

MAPBOX DEFAULT ACCESS TOKEN : pk.eyJ1Ijoic2VwaDA3IiwiYSI6ImNtdXJlemRzdDBsbGIyem9lM3FiMjNybTgifQ.L5t2LjoKXMStl9gL-837Nw

- **Vehicle Simulation:** Program an animated vehicle tracking dot that moves smoothly along the 2.9-mile counter-clockwise single-track loop and QLine corridor, pacing through station stops with 12-second pauses.

### 3. The 13 People Mover Stations & Contextual Drawers

Map all 13 official Detroit People Mover stations in exact sequential order:

1. Michigan Station

2. Fort / Cass Station

3. Huntington Place Station

4. Water Square Station

5. Financial District Station

6. Millender Center Station

7. Renaissance Center Station

8. Bricktown Station

9. Greektown Station

10. Cadillac Center Station

11. Broadway Station

12. Grand Circus Park Station

13. Times Square Station

- **Station Drawers:** When a user taps any station pin or list item, slide up a glassmorphism bottom drawer displaying live status, walking metrics, and a curated list of verified local restaurants within walking distance, complete with price tiers and active external links.

### 4. Footer Branding Stamp

- Fixed bottom compliance footer: 

  "MOTORCITY AUTOMATED SYSTEMS · DPM - Go! Building Targeted Autonomous Solutions for Detroit"

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dpmgo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/247f0bf3-491c-5d0c-b483-30208cfabc7d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
