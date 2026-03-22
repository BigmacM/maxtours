export interface Tour {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  duration: string; // human-readable
  durationISO: string; // ISO 8601
  priceFrom: number;
  currency: string;
  startLocation: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Array<{ time: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  rating: number;
  reviewCount: number;
  touristType: string[];
  vehicle: string;
  maxGuests: number;
  category: string;
  image: string;
}

export const tours: Tour[] = [
  {
    slug: 'toronto-niagara-falls-private-tour',
    name: 'Toronto to Niagara Falls Private Tour',
    tagline: 'The Ultimate Niagara Falls Experience — Entirely Yours',
    description:
      'An immersive 8-hour private journey from downtown Toronto to the majestic Niagara Falls, tailored exclusively to your group.',
    longDescription: `Embark on the definitive Niagara Falls experience — a meticulously orchestrated private tour that transforms one of the world's most iconic natural wonders into your personal playground. From the moment your private chauffeur arrives at your Toronto hotel, every detail of this extraordinary 8-hour journey has been composed with discerning travellers in mind.

Journey south through the lush Niagara Escarpment, arriving to the thunderous roar of Niagara Falls with exclusive access to experiences unavailable on group tours. Board the legendary Hornblower Niagara Cruises, where the raw power of 168,000 cubic metres of water cascading per second will leave you breathless. Descend behind the falls themselves through the Journey Behind the Falls — an experience that few have the privilege of witnessing.

Your expert guide navigates the entire experience seamlessly, ensuring you spend your time in awe rather than in queues. A carefully selected lunch venue in Niagara-on-the-Lake, Ontario's most charming wine region, provides the perfect interlude before an afternoon exploring the elegant boutiques and historic architecture of this UNESCO-recognized heritage town.`,
    duration: '8 hours',
    durationISO: 'PT8H',
    priceFrom: 695,
    currency: 'CAD',
    startLocation: 'Downtown Toronto (hotel pickup)',
    highlights: [
      'Private hotel pickup and drop-off throughout Greater Toronto',
      'Hornblower Niagara Cruises with reserved boarding',
      'Journey Behind the Falls exclusive access',
      'Skylon Tower observation deck',
      'Niagara-on-the-Lake heritage town exploration',
      'Floral Clock and Whirlpool State Park',
      'Curated lunch recommendation with reservation',
      'Evening Falls Illumination (seasonal)',
    ],
    included: [
      'Private luxury vehicle (Sedan, SUV, or Sprinter)',
      'Professional licensed guide',
      'Hotel pickup and drop-off',
      'Hornblower Cruise tickets',
      'Journey Behind the Falls tickets',
      'Skylon Tower tickets',
      'Bottled water and light refreshments',
    ],
    notIncluded: [
      'Gratuities (appreciated but not expected)',
      'Meals and beverages beyond light refreshments',
      'Optional helicopter ride',
      'Wine tastings at NOTL wineries',
    ],
    itinerary: [
      { time: '8:00 AM', title: 'Private Hotel Pickup', description: 'Your chauffeur arrives at your Toronto accommodation in an immaculately presented vehicle.' },
      { time: '9:30 AM', title: 'Niagara Escarpment Scenic Drive', description: 'Journey south through rolling countryside, your guide sharing the geological and cultural history of the Niagara Peninsula.' },
      { time: '10:15 AM', title: 'Hornblower Niagara Cruises', description: 'Board your reserved vessel and glide to the base of both the Horseshoe and American Falls.' },
      { time: '11:30 AM', title: 'Journey Behind the Falls', description: 'Descend through ancient rock tunnels to observation portals directly behind the cascading curtain of water.' },
      { time: '12:30 PM', title: 'Niagara-on-the-Lake Lunch', description: 'Explore Ontario\'s most charming heritage town and enjoy lunch at a curated local restaurant.' },
      { time: '2:00 PM', title: 'Skylon Tower', description: 'Ascend to the observation deck for a panoramic perspective of both falls, the Niagara River, and Lake Ontario.' },
      { time: '3:00 PM', title: 'Floral Clock & Whirlpool', description: 'Visit the famous Floral Clock and the dramatic Niagara Gorge Whirlpool viewpoint.' },
      { time: '4:00 PM', title: 'Return to Toronto', description: 'Comfortable return journey with a final recap of the day\'s highlights from your guide.' },
    ],
    faqs: [
      {
        question: 'What is the best time of year to visit Niagara Falls?',
        answer: 'Niagara Falls is spectacular year-round. Summer (June–August) offers the full experience including Hornblower Cruises and the Floral Clock in bloom. Winter (December–February) transforms the falls into an ethereal ice wonderland. Spring and autumn offer pleasant weather with fewer crowds.',
      },
      {
        question: 'Is hotel pickup included from all Toronto hotels?',
        answer: 'Yes, we provide complimentary pickup from all hotels within the Greater Toronto Area, including Mississauga, Brampton, and Oakville. Simply provide your hotel name and address at booking.',
      },
      {
        question: 'Can the itinerary be customised?',
        answer: 'Absolutely — customisation is the cornerstone of MaxTours. You may add a helicopter adventure, substitute Niagara-on-the-Lake wine tastings, include the Niagara Power Station, or request any other specific experiences. Contact us to compose your perfect itinerary.',
      },
      {
        question: 'What happens in bad weather?',
        answer: 'Niagara Falls is magnificent in all weather conditions. We monitor forecasts closely and can rearrange the itinerary to maximise your experience. Hornblower Cruises operate in most weather conditions and provide ponchos. In the rare event of severe weather, we offer full flexibility to reschedule.',
      },
      {
        question: 'Is the tour suitable for children?',
        answer: 'MaxTours warmly welcomes families. The experience is appropriate for children of all ages. We can adjust the pace, include child-friendly stops, and ensure the itinerary is engaging for younger travellers. Please mention any children in your group when booking.',
      },
    ],
    rating: 4.9,
    reviewCount: 847,
    touristType: ['luxury', 'family', 'couples', 'corporate'],
    vehicle: 'Mazda CX-90 / Mercedes Sprinter',
    maxGuests: 20,
    category: 'Niagara Falls',
    image: '/images/niagara-falls-hero.jpg',
  },
  {
    slug: 'toronto-city-highlights',
    name: 'Toronto City Highlights Private Tour',
    tagline: 'The Soul of Toronto, Revealed in a Single Day',
    description:
      'A curated 4-hour private exploration of Toronto\'s most iconic landmarks, hidden gems, and vibrant neighbourhoods.',
    longDescription: `Toronto is a city that reveals its true character only to those who know where to look. Our private Toronto City Highlights tour is designed for travellers who demand more than the ordinary — those who seek the authentic pulse of Canada's most cosmopolitan city, from its soaring skyline to its intimate neighbourhood laneways.

Your private guide — a passionate Torontonian with encyclopaedic knowledge of the city's layered history — leads you through a carefully curated sequence of experiences. Stand at the base of the CN Tower, one of the world's tallest free-standing structures, before ascending to the EdgeWalk or observation deck for a perspective that will recalibrate your understanding of this remarkable city.

Journey through the cobblestone streets of the Distillery District, where Victorian-era industrial architecture frames world-class galleries and artisan boutiques. Ascend to the ramparts of Casa Loma, Sir Henry Pellatt's magnificent Edwardian castle, with its panoramic views across Lake Ontario. Each stop tells a chapter in Toronto's extraordinary story.`,
    duration: '4 hours',
    durationISO: 'PT4H',
    priceFrom: 595,
    currency: 'CAD',
    startLocation: 'Downtown Toronto (hotel pickup)',
    highlights: [
      'CN Tower observation deck or EdgeWalk',
      'Distillery District artisan exploration',
      'Casa Loma castle and gardens',
      'Kensington Market cultural immersion',
      'St. Lawrence Market (when open)',
      'Toronto waterfront and Harbourfront',
      'Queen West neighbourhood walk',
      'Insider restaurant recommendations',
    ],
    included: [
      'Private luxury vehicle',
      'Professional licensed guide',
      'Hotel pickup and drop-off',
      'CN Tower admission',
      'Casa Loma admission',
      'Bottled water',
    ],
    notIncluded: [
      'CN Tower EdgeWalk (can be added)',
      'Meals and beverages',
      'Market purchases',
      'Gratuities',
    ],
    itinerary: [
      { time: '9:00 AM', title: 'Hotel Pickup', description: 'Your private guide arrives at your accommodation, ready to reveal the city\'s secrets.' },
      { time: '9:30 AM', title: 'CN Tower', description: 'Ascend to the glass-floored observation deck at 447 metres above the city skyline.' },
      { time: '10:30 AM', title: 'Distillery District', description: 'Wander through beautifully preserved Victorian industrial architecture housing galleries and boutiques.' },
      { time: '11:30 AM', title: 'St. Lawrence Market', description: 'Explore one of the world\'s great food markets, sampling local specialities.' },
      { time: '12:00 PM', title: 'Casa Loma', description: 'Tour the magnificent castle and its secret tunnels, with sweeping views of the city.' },
      { time: '1:00 PM', title: 'Return to Hotel', description: 'Comfortable return with personalised dining recommendations for the evening.' },
    ],
    faqs: [
      {
        question: 'Can I add the CN Tower EdgeWalk to this tour?',
        answer: 'Yes, the EdgeWalk can be added to your Toronto tour. It requires advance booking and is weather-dependent. Please request this when composing your itinerary and we will handle all arrangements.',
      },
      {
        question: 'Is this tour suitable for first-time visitors to Toronto?',
        answer: 'This tour is perfectly designed for first-time visitors while offering depth that seasoned travellers will appreciate. Your guide will tailor the narrative to your interests and prior knowledge of the city.',
      },
      {
        question: 'Can the tour be extended to a full day?',
        answer: 'Absolutely. Many guests extend this tour to 6–8 hours, incorporating the Toronto Islands, Yorkville\'s luxury boutiques, Graffiti Alley, or an evening dinner at a top restaurant. Use our Experience Builder to compose your perfect day.',
      },
      {
        question: 'Is parking difficult in Toronto?',
        answer: 'As a private tour guest, you need not concern yourself with parking — your chauffeur handles all logistics. You simply step out, explore, and return to your waiting vehicle.',
      },
    ],
    rating: 5.0,
    reviewCount: 523,
    touristType: ['luxury', 'couples', 'family', 'business'],
    vehicle: 'Mazda CX-90 / Luxury SUV',
    maxGuests: 12,
    category: 'Toronto',
    image: '/images/toronto-hero.jpg',
  },
  {
    slug: 'niagara-on-the-lake-wine-tour',
    name: 'Niagara-on-the-Lake Private Wine Tour',
    tagline: 'Canada\'s Finest Wine Country, Uncorked for You Alone',
    description:
      'An indulgent 5-hour private journey through the Niagara wine region — icewines, estate tastings, and culinary experiences in Ontario\'s most elegant wine country.',
    longDescription: `Niagara-on-the-Lake is Canada's answer to Bordeaux — a sun-drenched peninsula where the moderating influence of Lake Ontario and Lake Erie creates a viticultural microclimate of extraordinary character. Our private wine tour unlocks this region with the level of access and expertise that only MaxTours can provide.

Journey through the Niagara Escarpment wine route, your guide a certified sommelier with deep relationships across the region's finest estates. Each winery has been selected not merely for the quality of its wines, but for the singularity of the experience it offers — from intimate barrel-room tastings to private conversations with winemakers.

The region's signature icewine — harvested in the frozen depths of a Canadian winter — is an experience unto itself. A single sip of Niagara's liquid gold, crafted from Vidal or Riesling grapes frozen on the vine, is a revelation that will permanently alter your understanding of what wine can be.`,
    duration: '5 hours',
    durationISO: 'PT5H',
    priceFrom: 795,
    currency: 'CAD',
    startLocation: 'Downtown Toronto or Niagara-on-the-Lake hotel',
    highlights: [
      'Three premium estate winery visits',
      'Private icewine tasting experience',
      'Niagara-on-the-Lake heritage town exploration',
      'Sommelier-guided tasting notes',
      'Curated cheese and charcuterie pairing',
      'Vineyard sunset (evening tours)',
      'Wine purchase assistance and shipping coordination',
      'Queen Street boutique exploration',
    ],
    included: [
      'Private luxury vehicle with chauffeur',
      'Certified sommelier guide',
      'Hotel pickup and drop-off',
      'Three winery tasting fees',
      'Icewine tasting',
      'Artisan cheese and charcuterie board',
      'Bottled water and non-alcoholic beverages',
    ],
    notIncluded: [
      'Wine purchases',
      'Full meals beyond included pairings',
      'Gratuities',
      'Optional cooking class add-on',
    ],
    itinerary: [
      { time: '10:00 AM', title: 'Hotel Pickup', description: 'Your sommelier guide arrives to begin your oenological journey through Niagara wine country.' },
      { time: '11:00 AM', title: 'First Estate: Sparkling & Whites', description: 'Begin with an acclaimed sparkling wine and Chardonnay estate, setting the palate for the day\'s exploration.' },
      { time: '12:00 PM', title: 'Artisan Lunch Pairing', description: 'A curated cheese, charcuterie and bread board paired with the estate\'s reserve selections.' },
      { time: '1:00 PM', title: 'Second Estate: Reds & Icewine', description: 'The centrepiece of the tour — an intimate tasting of Niagara\'s signature reds and the legendary icewine.' },
      { time: '2:30 PM', title: 'Niagara-on-the-Lake Town', description: 'Explore the heritage streetscape of this impeccably preserved Georgian-era town.' },
      { time: '3:30 PM', title: 'Third Estate: Reserve Collection', description: 'A boutique estate offering access to wines unavailable through retail channels.' },
      { time: '4:30 PM', title: 'Return Journey', description: 'Comfortable return to Toronto with your guide\'s recommendations for wine exploration at home.' },
    ],
    faqs: [
      {
        question: 'Which wineries will we visit?',
        answer: 'Our winery selection is curated seasonally to ensure peak quality and availability. We partner with estates including Peller Estates, Inniskillin, Jackson-Triggs, Tawse, Thirty Bench, and Cave Spring. Your guide will confirm the specific estates for your tour date and tailor selections to your preferences.',
      },
      {
        question: 'Can non-drinkers participate?',
        answer: 'Absolutely. Non-alcoholic alternatives, artisan juices, and premium teas are available at every estate. The wine country landscape, architecture, and culinary experience are equally captivating without alcohol. We ensure all guests enjoy an equally rich experience.',
      },
      {
        question: 'Can we purchase wine to take home?',
        answer: 'Yes, and this is one of the great pleasures of the tour. Many of our partner estates produce limited quantities unavailable outside the cellar door. Your guide can assist with selections and, for international guests, coordinate shipping through licensed wine exporters.',
      },
      {
        question: 'What is icewine, and why is Niagara famous for it?',
        answer: 'Icewine (Eiswein) is a luscious dessert wine made from grapes that have naturally frozen on the vine. Harvesting typically occurs between December and February, when temperatures drop below -8°C. The freezing concentrates the sugars and flavours, producing an intensely aromatic nectar. Niagara\'s reliable cold winters make it one of the world\'s finest icewine regions.',
      },
      {
        question: 'Is this tour available year-round?',
        answer: 'Yes. Each season brings its own character to Niagara wine country. Autumn (September–October) offers harvest festivals and golden vineyard vistas. Winter features the magic of icewine harvest season. Spring brings blossom and new vintages. Summer sees the estates at their most vibrant and welcoming.',
      },
    ],
    rating: 4.9,
    reviewCount: 312,
    touristType: ['luxury', 'couples', 'wine-enthusiasts', 'corporate'],
    vehicle: 'Mazda CX-90 / Executive Sedan',
    maxGuests: 8,
    category: 'Wine',
    image: '/images/wine-tour-hero.jpg',
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getAllTourSlugs(): string[] {
  return tours.map((t) => t.slug);
}
