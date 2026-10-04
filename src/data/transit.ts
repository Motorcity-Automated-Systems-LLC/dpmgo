export type Coordinate = [number, number];
export type Restaurant = { name: string; category: string; price: string; url: string };
export type Station = { id: string; name: string; coordinate: Coordinate; neighborhood: string; restaurants: Restaurant[] };

// Approximate station entrance positions, ordered as the requested loop sequence.
export const peopleMoverStations: Station[] = [
  { id: 'michigan', name: 'Michigan Station', coordinate: [-83.0536, 42.3323], neighborhood: 'West Downtown', restaurants: [{ name: 'Lafayette Coney Island', category: 'Detroit coney dogs', price: '$', url: 'https://www.lafayetteconeyisland.com/' }, { name: 'The Statler', category: 'French-American', price: '$$$', url: 'https://www.statlerdetroit.com/' }] },
  { id: 'fort-cass', name: 'Fort / Cass Station', coordinate: [-83.0528, 42.3302], neighborhood: 'West Downtown', restaurants: [{ name: 'Anchor Bar', category: 'Pub & grill', price: '$$', url: 'https://www.anchorbardetroit.com/' }, { name: 'The Apparatus Room', category: 'New American', price: '$$$', url: 'https://detroitfoundationhotel.com/apparatus-room/' }] },
  { id: 'huntington', name: 'Huntington Place Station', coordinate: [-83.0478, 42.3278], neighborhood: 'Convention District', restaurants: [{ name: 'The Apparatus Room', category: 'New American', price: '$$$', url: 'https://detroitfoundationhotel.com/apparatus-room/' }, { name: 'London Chop House', category: 'Steakhouse', price: '$$$$', url: 'https://thelondonchophouse.com/' }] },
  { id: 'water-square', name: 'Water Square Station', coordinate: [-83.0505, 42.3259], neighborhood: 'Riverfront', restaurants: [{ name: 'The Apparatus Room', category: 'New American', price: '$$$', url: 'https://detroitfoundationhotel.com/apparatus-room/' }, { name: 'Lumen Detroit', category: 'American', price: '$$', url: 'https://www.lumendetroit.com/' }] },
  { id: 'financial', name: 'Financial District Station', coordinate: [-83.0473, 42.3300], neighborhood: 'Financial District', restaurants: [{ name: 'London Chop House', category: 'Steakhouse', price: '$$$$', url: 'https://thelondonchophouse.com/' }, { name: 'Parc', category: 'New American', price: '$$$', url: 'https://www.parcdetroit.com/' }] },
  { id: 'millender', name: 'Millender Center Station', coordinate: [-83.0425, 42.3308], neighborhood: 'Civic Center', restaurants: [{ name: 'Andiamo Detroit Riverfront', category: 'Italian', price: '$$$', url: 'https://andiamoitalia.com/detroit-riverfront/' }, { name: 'Sweetwater Tavern', category: 'Wings & tavern', price: '$$', url: 'https://sweetwatertavern.net/' }] },
  { id: 'renaissance', name: 'Renaissance Center Station', coordinate: [-83.0401, 42.3292], neighborhood: 'Riverfront', restaurants: [{ name: 'Joe Muer Seafood', category: 'Seafood', price: '$$$$', url: 'https://joemuer.com/' }, { name: 'Andiamo Detroit Riverfront', category: 'Italian', price: '$$$', url: 'https://andiamoitalia.com/detroit-riverfront/' }] },
  { id: 'bricktown', name: 'Bricktown Station', coordinate: [-83.0423, 42.3314], neighborhood: 'Bricktown', restaurants: [{ name: 'The Old Shillelagh', category: 'Irish pub', price: '$$', url: 'https://oldshillelagh.com/' }, { name: 'Sweetwater Tavern', category: 'Wings & tavern', price: '$$', url: 'https://sweetwatertavern.net/' }] },
  { id: 'greektown', name: 'Greektown Station', coordinate: [-83.0435, 42.3338], neighborhood: 'Greektown', restaurants: [{ name: 'Fishbone’s', category: 'Seafood & Creole', price: '$$', url: 'https://fishbonesusa.com/' }, { name: 'Pegasus Taverna', category: 'Greek', price: '$$', url: 'https://pegasustavernas.com/' }] },
  { id: 'cadillac', name: 'Cadillac Center Station', coordinate: [-83.0454, 42.3347], neighborhood: 'Cadillac Square', restaurants: [{ name: 'Cadillac Square Diner', category: 'Diner', price: '$', url: 'https://cadillacsquarediner.com/' }, { name: 'Parc', category: 'New American', price: '$$$', url: 'https://www.parcdetroit.com/' }] },
  { id: 'broadway', name: 'Broadway Station', coordinate: [-83.0475, 42.3361], neighborhood: 'Broadway', restaurants: [{ name: 'Mootz Pizzeria + Bar', category: 'Pizza', price: '$$', url: 'https://mootzpizzeria.com/' }, { name: 'Wright & Company', category: 'Small plates', price: '$$$', url: 'https://www.wrightdetroit.com/' }] },
  { id: 'grand-circus', name: 'Grand Circus Park Station', coordinate: [-83.0505, 42.3361], neighborhood: 'Grand Circus Park', restaurants: [{ name: 'The Statler', category: 'French-American', price: '$$$', url: 'https://www.statlerdetroit.com/' }, { name: 'Cliff Bell’s', category: 'Jazz club & dining', price: '$$$', url: 'https://www.cliffbells.com/' }] },
  { id: 'times-square', name: 'Times Square Station', coordinate: [-83.0531, 42.3338], neighborhood: 'West Downtown', restaurants: [{ name: 'The Statler', category: 'French-American', price: '$$$', url: 'https://www.statlerdetroit.com/' }, { name: 'Lafayette Coney Island', category: 'Detroit coney dogs', price: '$', url: 'https://www.lafayetteconeyisland.com/' }] },
];

export const qlineStops: { name: string; coordinate: Coordinate }[] = [
  { name: 'Congress Street', coordinate: [-83.0445, 42.3295] },
  { name: 'Campus Martius', coordinate: [-83.0474, 42.3326] },
  { name: 'Grand Circus', coordinate: [-83.0503, 42.3361] },
  { name: 'Montcalm Street', coordinate: [-83.0534, 42.3395] },
  { name: 'Adelaide / Sproat', coordinate: [-83.0562, 42.3427] },
  { name: 'MLK / Mack', coordinate: [-83.0598, 42.3468] },
  { name: 'Canfield Street', coordinate: [-83.0642, 42.3516] },
  { name: 'Warren Avenue', coordinate: [-83.0658, 42.3575] },
  { name: 'Ferry Street', coordinate: [-83.0667, 42.3615] },
  { name: 'Amsterdam Street', coordinate: [-83.0705, 42.3665] },
  { name: 'Baltimore Street', coordinate: [-83.0725, 42.3695] },
  { name: 'Grand Boulevard', coordinate: [-83.0741, 42.3722] },
];

export type Place = Restaurant & { id: string; coordinate: Coordinate };

// Curated downtown restaurants; distances are computed from coordinates at runtime.
export const restaurants: Place[] = [
  ['lafayette', 'Lafayette Coney Island', 'Detroit coney dogs', '$', 'https://www.lafayetteconeyisland.com/', -83.0478, 42.3317],
  ['american', 'American Coney Island', 'Detroit coney dogs', '$', 'https://www.americanconeyisland.com/', -83.0480, 42.3318],
  ['parc', 'Parc', 'New American', '$$$', 'https://www.parcdetroit.com/', -83.0467, 42.3318],
  ['central', 'Central Kitchen + Bar', 'American', '$$', 'https://centralkitchendetroit.com/', -83.0463, 42.3324],
  ['chophouse', 'London Chop House', 'Steakhouse', '$$$$', 'https://thelondonchophouse.com/', -83.0466, 42.3308],
  ['checker', 'Checker Bar', 'Burgers & bar', '$', 'https://www.checkerbardetroit.com/', -83.0457, 42.3313],
  ['joemuer', 'Joe Muer Seafood', 'Seafood', '$$$$', 'https://joemuer.com/', -83.0396, 42.3290],
  ['andiamo', 'Andiamo Detroit Riverfront', 'Italian', '$$$', 'https://andiamoitalia.com/', -83.0399, 42.3294],
  ['apparatus', 'The Apparatus Room', 'New American', '$$$', 'https://detroitfoundationhotel.com/eat-drink/', -83.0505, 42.3300],
  ['anchor', 'Anchor Bar', 'Pub & grill', '$$', 'https://www.anchorbardetroit.com/', -83.0520, 42.3313],
  ['lumen', 'Lumen Detroit', 'American', '$$', 'https://www.lumendetroit.com/', -83.0530, 42.3297],
  ['wright', 'Wright & Company', 'Small plates', '$$$', 'https://www.wrightdetroit.com/', -83.0478, 42.3346],
  ['hudson', 'Hudson Café', 'Breakfast & brunch', '$$', 'https://hudsoncafedetroit.com/', -83.0479, 42.3336],
  ['townhouse', 'Townhouse Detroit', 'American', '$$$', 'https://townhousedetroit.com/', -83.0470, 42.3335],
  ['sanmorello', 'San Morello', 'Italian', '$$$', 'https://sanmorello.com/', -83.0487, 42.3356],
  ['mootz', 'Mootz Pizzeria + Bar', 'Pizza', '$$', 'https://mootzpizzeria.com/', -83.0455, 42.3352],
  ['cliffbells', 'Cliff Bell’s', 'Jazz club & dining', '$$$', 'https://www.cliffbells.com/', -83.0533, 42.3358],
  ['bucharest', 'Bucharest Grill', 'Mediterranean', '$', 'https://bucharestgrill.com/', -83.0511, 42.3365],
  ['pegasus', 'Pegasus Taverna', 'Greek', '$$', 'https://pegasustavernas.com/', -83.0426, 42.3354],
  ['fishbones', 'Fishbone’s', 'Seafood & Creole', '$$', 'https://fishbonesusa.com/', -83.0421, 42.3350],
  ['shillelagh', 'The Old Shillelagh', 'Irish pub', '$$', 'https://oldshillelagh.com/', -83.0419, 42.3349],
  ['firebird', 'Firebird Tavern', 'Tavern', '$$', 'https://www.firebirdtavern.com/', -83.0428, 42.3357],
  ['sweetwater', 'Sweetwater Tavern', 'Wings & tavern', '$$', 'https://sweetwatertavern.net/', -83.0413, 42.3335],
].map(([id, name, category, price, url, lng, lat]) => ({ id, name, category, price, url, coordinate: [lng, lat] } as Place));

export function milesBetween(a: Coordinate, b: Coordinate) {
  const r = Math.PI / 180, dLat = (b[1] - a[1]) * r, dLon = (b[0] - a[0]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Walking distance approximated as straight-line × 1.25 for Detroit's street grid.
export function nearbyRestaurants(station: Station) {
  return restaurants.map(p => ({ ...p, walkMiles: milesBetween(station.coordinate, p.coordinate) * 1.25 }))
    .filter(p => p.walkMiles <= 0.5).sort((a, b) => a.walkMiles - b.walkMiles).slice(0, 5);
}

export const sportsTeams = [
  { id: 'lions', team: 'Detroit Lions', league: 'NFL', venue: 'Ford Field', station: 'Greektown Station', href: 'https://www.detroitlions.com/schedule/' },
  { id: 'tigers', team: 'Detroit Tigers', league: 'MLB', venue: 'Comerica Park', station: 'Broadway Station', href: 'https://www.mlb.com/tigers/schedule' },
  { id: 'redwings', team: 'Detroit Red Wings', league: 'NHL', venue: 'Little Caesars Arena', station: 'Grand Circus Park Station', href: 'https://www.nhl.com/redwings/schedule' },
  { id: 'pistons', team: 'Detroit Pistons', league: 'NBA', venue: 'Little Caesars Arena', station: 'Grand Circus Park Station', href: 'https://www.nba.com/pistons/schedule' },
];

export const activities = [
  { name: 'Campus Martius Park events', area: 'Downtown', note: 'Seasonal public programming, ice rink in winter', station: 'Financial District Station', href: 'https://downtowndetroit.org/events/', downtown: true },
  { name: 'Beacon Park programming', area: 'Downtown', note: 'Free concerts, markets and family events', station: 'Fort / Cass Station', href: 'https://downtowndetroit.org/events/', downtown: true },
  { name: 'Detroit RiverWalk', area: 'Downtown riverfront', note: 'Public riverfront paths and events', station: 'Renaissance Center Station', href: 'https://detroitriverfront.org/events', downtown: true },
  { name: 'Capitol Park', area: 'Downtown', note: 'Public plaza with pop-up events', station: 'Times Square Station', href: 'https://downtowndetroit.org/', downtown: true },
  { name: 'Eastern Market Saturday Market', area: 'Eastern Market', note: 'Outside downtown', station: '', href: 'https://easternmarket.org/', downtown: false },
].filter(a => a.downtown);
