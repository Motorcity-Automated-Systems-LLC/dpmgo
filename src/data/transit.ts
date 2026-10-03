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
