import type { Business, Event, Deal, CommunityLeader } from '@/types';

const industries = [
  "Technology", "Healthcare", "Food & Beverage", "Retail", "Professional Services", 
  "Arts & Culture", "Education", "Real Estate", "Automotive", "Travel & Hospitality"
];

const tampaAreas = ["Downtown", "Ybor City", "Hyde Park", "Seminole Heights", "Westshore", "Channelside", "SoHo", "Tampa Palms", "New Tampa", "Davis Islands"];
const streetNames = ["Main St", "Bay Ave", "Florida Ave", "Dale Mabry Hwy", "Kennedy Blvd", "Fowler Ave", "Channelside Dr", "Howard Ave", "Bayshore Blvd", "Armenia Ave"];
const zipCodes = ["33602", "33603", "33605", "33606", "33607", "33609", "33611", "33629", "33647"];

const generatePhoneNumber = () => `813-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

const generateDescription = (name: string, category: string, area: string) => {
  const services = {
    "Technology": ["innovative software solutions", "IT consulting", "cybersecurity services"],
    "Healthcare": ["comprehensive patient care", "specialized medical treatments", "wellness programs"],
    "Food & Beverage": ["delicious local cuisine", "artisanal coffee and pastries", "craft beers and cocktails"],
    "Retail": ["a wide variety of products", "unique boutique items", "everyday essentials"],
    "Professional Services": ["expert consulting", "tailored business solutions", "reliable support"],
    "Arts & Culture": ["inspiring art exhibitions", "live performances", "cultural workshops"],
    "Education": ["quality learning programs", "skill development courses", "tutoring services"],
    "Real Estate": ["prime property listings", "expert real estate advice", "home buying and selling support"],
    "Automotive": ["reliable car repairs", "vehicle sales and maintenance", "custom auto parts"],
    "Travel & Hospitality": ["comfortable accommodations", "exciting tour packages", "memorable travel experiences"]
  };
  const offering = services[category as keyof typeof services] || ["excellent services", "quality products"];
  return `Discover ${name}, a premier ${category.toLowerCase()} destination in ${area}, Tampa. We offer ${offering[Math.floor(Math.random() * offering.length)]} and ${offering[Math.floor(Math.random() * offering.length)]}. Visit us for an exceptional experience.`;
};

const generateDataAiHint = (category: string): string => {
  const hints: { [key: string]: string[] } = {
    "Technology": ["office tech", "computer code"],
    "Healthcare": ["medical clinic", "doctor patient"],
    "Food & Beverage": ["restaurant interior", "delicious food"],
    "Retail": ["storefront shop", "clothing rack"],
    "Professional Services": ["business meeting", "consultant working"],
    "Arts & Culture": ["art gallery", "theater stage"],
    "Education": ["classroom students", "library books"],
    "Real Estate": ["house exterior", "modern apartment"],
    "Automotive": ["car workshop", "shiny vehicle"],
    "Travel & Hospitality": ["hotel lobby", "tropical resort"]
  };
  const categoryHints = hints[category] || ["business service", "local place"];
  return categoryHints.join(' ');
}

export const mockBusinesses: Business[] = [];
let businessIdCounter = 1;

industries.forEach(industry => {
  for (let i = 0; i < 10; i++) {
    const area = tampaAreas[Math.floor(Math.random() * tampaAreas.length)];
    const baseName = `${industry.split(' ')[0]}${area.replace(/\s+/g, '')}${i + 1}`;
    const businessName = `${industry.split(' ')[0]} ${area} Experts ${i + 1}`; // Simplified name generation
    
    mockBusinesses.push({
      id: `b${businessIdCounter++}`,
      name: businessName,
      category: industry,
      imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(businessName)}`,
      dataAiHint: generateDataAiHint(industry),
      description: generateDescription(businessName, industry, area),
      address: `${Math.floor(Math.random() * 2000) + 100} ${streetNames[Math.floor(Math.random() * streetNames.length)]}, Tampa, FL ${zipCodes[Math.floor(Math.random() * zipCodes.length)]}`,
      phone: generatePhoneNumber(),
      website: `https://${baseName.toLowerCase().replace(/[^a-z0-9]/gi, '')}.example.com`
    });
  }
});


export const mockEvents: Event[] = [
  {
    id: 'e1',
    name: 'Downtown Music Fest',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    time: '7:00 PM - 11:00 PM',
    venue: 'Curtis Hixon Waterfront Park',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'music festival concert',
    description: 'Annual music festival featuring local and national bands. Food trucks and fun for all ages.',
    ticketUrl: 'https://tickets.example.com/downtownfest',
    category: 'Music Festival',
  },
  {
    id: 'e2',
    name: 'Sunset Yacht Party by Ybor City Nights',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '6:00 PM - 9:00 PM',
    venue: 'Tampa Bay Waters (Dock at Tampa Yacht Charters)',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'yacht party sunset',
    description: 'Enjoy a beautiful sunset cruise with music by Ybor City Nights DJs, drinks, and stunning views of the bay. Hosted by Tampa Yacht Charters.',
    category: 'Nightlife',
  },
  {
    id: 'e3',
    name: 'Tampa Tech Innovators Conference',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '9:00 AM - 5:00 PM',
    venue: 'Tampa Convention Center',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'conference tech presentation',
    description: 'A premier tech conference with speakers from leading Technology businesses, workshops, and networking opportunities.',
    ticketUrl: 'https://tickets.example.com/techconf',
    category: 'Conference',
  },
  {
    id: 'e4',
    name: 'Hyde Park Art Walk',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00 AM - 4:00 PM',
    venue: 'Hyde Park Village',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'art festival outdoor',
    description: 'Browse and purchase art from local artists in the beautiful Hyde Park Village. Featuring live music and food stalls.',
    category: 'Arts & Culture',
  },
   {
    id: 'e5',
    name: 'Seminole Heights Food Truck Rally',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '5:00 PM - 9:00 PM',
    venue: 'Seminole Heights Garden Center',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'food trucks event',
    description: 'A gathering of Tampa\'s best food trucks offering a variety of cuisines. Family-friendly atmosphere.',
    category: 'Food & Beverage',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    title: '50% Off All Appetizers',
    businessName: mockBusinesses.find(b => b.category === "Food & Beverage")?.name || "Tampa Bay Eats",
    description: 'Enjoy half-price on all appetizers Monday to Thursday, 4 PM - 6 PM at our restaurant.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'food discount appetizers',
    confidence: 0.95,
    category: 'Food & Beverage',
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'd2',
    title: 'Free Drink Fridays at Ybor Club',
    businessName: mockBusinesses.find(b => b.category === "Travel & Hospitality" && b.name.toLowerCase().includes("ybor"))?.name || "Ybor City Nights",
    description: 'Get one free well drink with entry every Friday before 10 PM. Must be 21+.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'bar drink cocktail',
    confidence: 0.88,
    category: 'Nightlife',
     expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'd3',
    title: '20% Off First Yacht Rental This Month',
    businessName: mockBusinesses.find(b => b.category === "Travel & Hospitality" && b.name.toLowerCase().includes("yacht"))?.name || "Tampa Yacht Charters",
    description: 'New customers get 20% off their first yacht charter booking. Minimum 4 hours. Offer valid this month.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'yacht rental boat',
    confidence: 0.92,
    category: 'Travel & Hospitality',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'd4',
    title: 'Early Bird Tech Consultation Discount',
    businessName: mockBusinesses.find(b => b.category === "Technology")?.name || "Innovatech Solutions",
    description: 'Book a tech consultation before 10 AM and receive a 15% discount on our services.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'tech consultation office',
    confidence: 0.90,
    category: 'Technology',
  },
  {
    id: 'd5',
    title: 'Weekend Retail Blowout - Up to 40% Off',
    businessName: mockBusinesses.find(b => b.category === "Retail")?.name || "Hyde Park Boutique",
    description: 'Massive weekend sale with up to 40% off on select items. Don\'t miss out!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'retail sale shopping',
    confidence: 0.85,
    category: 'Retail',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];


export const mockCommunityLeaders: CommunityLeader[] = [
  {
    id: 'cl1',
    name: 'Isabella Rossi',
    title: 'CEO, Innovate Tampa Bay',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'woman portrait leader',
    bio: 'Isabella is a visionary leader driving technological innovation and entrepreneurship across the Tampa Bay region. She has championed numerous startups and tech initiatives.',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      website: '#',
    }
  },
  {
    id: 'cl2',
    name: 'Marcus Chen',
    title: 'Founder, Tampa Cultural Arts Foundation',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'man portrait philanthropist',
    bio: 'Marcus has dedicated his career to enriching Tampa\'s cultural landscape. His foundation supports local artists and cultural events, making arts accessible to all.',
    socialLinks: {
      linkedin: '#',
      website: '#',
    }
  },
  {
    id: 'cl3',
    name: 'Dr. Anya Sharma',
    title: 'Chief Medical Officer, BayCare Health Systems',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'doctor portrait healthcare',
    bio: 'Dr. Sharma is a leading healthcare professional focused on improving community health outcomes and advancing medical research in Tampa.',
    socialLinks: {
      linkedin: '#',
    }
  },
   {
    id: 'cl4',
    name: 'David Miller',
    title: 'Community Organizer & Activist',
    imageUrl: 'https://placehold.co/300x300.png',
    dataAiHint: 'activist community portrait',
    bio: 'David is a passionate advocate for social justice and community development in Tampa, working tirelessly to empower local neighborhoods.',
    socialLinks: {
      twitter: '#',
    }
  }
];


export const businessCategories = ['All', ...industries];
export const eventCategories = ['All', ...new Set(mockEvents.map(e => e.category))];
export const dealCategories = ['All', ...new Set(mockDeals.map(d => d.category))];
