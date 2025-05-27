import type { Business, Event, Deal } from '@/types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Tampa Bay Eats',
    category: 'Dining',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'restaurant food',
    description: 'The best local flavors Tampa has to offer. From seafood to cuban sandwiches.',
    address: '123 Main St, Tampa, FL',
    phone: '813-555-0101',
    website: 'https://tampabayeats.example.com'
  },
  {
    id: '2',
    name: 'Ybor City Nights',
    category: 'Nightlife',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'nightclub party',
    description: 'Experience the vibrant nightlife of Ybor City with live music and DJs.',
    address: '789 Ybor Ave, Tampa, FL',
    phone: '813-555-0102',
  },
  {
    id: '3',
    name: 'Glamour Beauty Salon',
    category: 'Beauty',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'salon spa',
    description: 'Full-service beauty salon offering haircuts, styling, nails, and more.',
    address: '456 Bay Rd, Tampa, FL',
    website: 'https://glamourbeauty.example.com'
  },
  {
    id: '4',
    name: 'Tampa Yacht Charters',
    category: 'Yacht Rentals',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'yacht boat',
    description: 'Luxury yacht rentals for parties, corporate events, or a day on the water.',
    address: 'Marina Way, Tampa, FL',
    phone: '813-555-0104',
  },
  {
    id: '5',
    name: 'Davis Legal Group',
    category: 'Legal',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'law office',
    description: 'Experienced attorneys providing comprehensive legal services.',
    address: 'Financial Plaza, Tampa, FL',
    website: 'https://davislegal.example.com'
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Downtown Music Fest',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // One week from now
    time: '7:00 PM - 11:00 PM',
    venue: 'Curtis Hixon Waterfront Park',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'music festival concert',
    description: 'Annual music festival featuring local and national bands. Food trucks and fun for all ages.',
    ticketUrl: 'https://tickets.example.com/downtownfest',
    category: 'Music',
  },
  {
    id: '2',
    name: 'Sunset Yacht Party',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Two weeks from now
    time: '6:00 PM - 9:00 PM',
    venue: 'Tampa Bay Waters',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'yacht party sunset',
    description: 'Enjoy a beautiful sunset cruise with music, drinks, and stunning views of the bay.',
    category: 'Party',
  },
  {
    id: '3',
    name: 'Tech Conference Tampa',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Three weeks from now
    time: '9:00 AM - 5:00 PM',
    venue: 'Tampa Convention Center',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'conference tech presentation',
    description: 'A premier tech conference with speakers, workshops, and networking opportunities.',
    ticketUrl: 'https://tickets.example.com/techconf',
    category: 'Conference',
  },
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: '50% Off Appetizers',
    businessName: 'Tampa Bay Eats',
    description: 'Enjoy half-price on all appetizers Monday to Thursday, 4 PM - 6 PM.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'food discount appetizers',
    confidence: 0.95,
    category: 'Dining',
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'Free Drink Fridays',
    businessName: 'Ybor City Nights',
    description: 'Get one free well drink with entry every Friday before 10 PM.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bar drink cocktail',
    confidence: 0.88,
    category: 'Nightlife',
  },
  {
    id: '3',
    title: '20% Off First Yacht Rental',
    businessName: 'Tampa Yacht Charters',
    description: 'New customers get 20% off their first yacht charter booking. Min 4 hours.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'yacht rental boat',
    confidence: 0.92,
    category: 'Yacht Rentals',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

export const businessCategories = ['All', ...new Set(mockBusinesses.map(b => b.category))];
export const eventCategories = ['All', ...new Set(mockEvents.map(e => e.category))];
export const dealCategories = ['All', ...new Set(mockDeals.map(d => d.category))];
