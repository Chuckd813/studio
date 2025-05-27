
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
  const services: Record<string, string[]> = {
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
  const offering = services[category] || ["excellent services", "quality products"];
  return `Discover ${name}, a premier ${category.toLowerCase()} destination in ${area}, Tampa. We offer ${offering[Math.floor(Math.random() * offering.length)]} and ${offering[Math.floor(Math.random() * offering.length)]}. Visit us for an exceptional experience.`;
};

const generateBusinessDataAiHint = (category: string): string => {
  const hints: Record<string, string[]> = {
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
    const businessName = `${industry.split(' ')[0]} ${area} Experts ${i + 1}`;
    
    mockBusinesses.push({
      id: `b${businessIdCounter++}`,
      name: businessName,
      category: industry,
      imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(businessName.substring(0,20))}`, // Shorter text for placeholder
      dataAiHint: generateBusinessDataAiHint(industry),
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

const getBusinessForDeal = (industry: string): string => {
  const business = mockBusinesses.find(b => b.category === industry);
  return business ? business.name : `A Great ${industry} Business`;
};

const generateDealDataAiHint = (category: string): string => {
  const hints: Record<string, string[]> = {
    "Technology": ["laptop code", "tech discount"],
    "Healthcare": ["medical checkup", "health deal"],
    "Food & Beverage": ["restaurant meal", "food offer"],
    "Retail": ["shopping bags", "store sale"],
    "Professional Services": ["business handshake", "service discount"],
    "Arts & Culture": ["theater tickets", "art show"],
    "Education": ["online course", "study discount"],
    "Real Estate": ["house keys", "property deal"],
    "Automotive": ["car service", "auto discount"],
    "Travel & Hospitality": ["hotel booking", "vacation deal"]
  };
  const categoryHints = hints[category] || ["special offer", "local deal"];
  return categoryHints.join(' ');
};

export const mockDeals: Deal[] = [
  {
    id: 'dtech1',
    title: '15% Off Custom Software Development',
    businessName: getBusinessForDeal("Technology"),
    description: 'Get 15% off your first custom software development project with us. Boost your business with cutting-edge tech!',
    imageUrl: `https://placehold.co/600x400.png?text=Tech+Deal`,
    dataAiHint: generateDealDataAiHint("Technology"),
    confidence: 0.91,
    category: 'Technology',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dhealth1',
    title: 'Free Wellness Check-up This Month',
    businessName: getBusinessForDeal("Healthcare"),
    description: 'Book a free wellness check-up with our experienced practitioners. Offer valid for new patients only.',
    imageUrl: `https://placehold.co/600x400.png?text=Healthcare+Deal`,
    dataAiHint: generateDealDataAiHint("Healthcare"),
    confidence: 0.92,
    category: 'Healthcare',
    expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dfood1',
    title: 'Two-for-One Entrees on Tuesdays',
    businessName: getBusinessForDeal("Food & Beverage"),
    description: 'Bring a friend and enjoy two entrees for the price of one every Tuesday evening at our restaurant.',
    imageUrl: `https://placehold.co/600x400.png?text=Food+Deal`,
    dataAiHint: generateDealDataAiHint("Food & Beverage"),
    confidence: 0.95,
    category: 'Food & Beverage',
    expiryDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dretail1',
    title: 'End of Season Sale - Up to 50% Off',
    businessName: getBusinessForDeal("Retail"),
    description: 'Huge discounts on selected items in our end-of-season sale. While stocks last!',
    imageUrl: `https://placehold.co/600x400.png?text=Retail+Sale`,
    dataAiHint: generateDealDataAiHint("Retail"),
    confidence: 0.88,
    category: 'Retail',
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dprof1',
    title: 'Free Initial Consultation for Businesses',
    businessName: getBusinessForDeal("Professional Services"),
    description: 'Get a free 30-minute initial consultation to discuss your business needs and how we can help you grow.',
    imageUrl: `https://placehold.co/600x400.png?text=Services+Deal`,
    dataAiHint: generateDealDataAiHint("Professional Services"),
    confidence: 0.90,
    category: 'Professional Services',
    expiryDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'darts1',
    title: '20% Off Tickets to "Tampa Impressions" Exhibit',
    businessName: getBusinessForDeal("Arts & Culture"),
    description: 'Experience the stunning "Tampa Impressions" art exhibit and get 20% off your ticket price this week.',
    imageUrl: `https://placehold.co/600x400.png?text=Art+Exhibit+Deal`,
    dataAiHint: generateDealDataAiHint("Arts & Culture"),
    confidence: 0.89,
    category: 'Arts & Culture',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dedu1',
    title: 'Early Bird Discount for Coding Bootcamp',
    businessName: getBusinessForDeal("Education"),
    description: 'Sign up early for our next coding bootcamp and receive a $200 discount on the course fee.',
    imageUrl: `https://placehold.co/600x400.png?text=Education+Deal`,
    dataAiHint: generateDealDataAiHint("Education"),
    confidence: 0.93,
    category: 'Education',
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'drealestate1',
    title: 'Valuation Discount for Home Sellers!',
    businessName: getBusinessForDeal("Real Estate"),
    description: 'List your home with us and receive a discount on your property valuation. Limited time offer for new clients.',
    imageUrl: `https://placehold.co/600x400.png?text=Real+Estate+Deal`,
    dataAiHint: generateDealDataAiHint("Real Estate"),
    confidence: 0.87,
    category: 'Real Estate',
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dauto1',
    title: 'Free Tire Rotation with Any Major Service',
    businessName: getBusinessForDeal("Automotive"),
    description: 'Get a complimentary tire rotation when you book any major service for your vehicle this month.',
    imageUrl: `https://placehold.co/600x400.png?text=Auto+Service+Deal`,
    dataAiHint: generateDealDataAiHint("Automotive"),
    confidence: 0.94,
    category: 'Automotive',
    expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: 'dtravel1',
    title: 'Stay 3 Nights, Get 4th Night Free',
    businessName: getBusinessForDeal("Travel & Hospitality"),
    description: 'Book a 3-night stay at our hotel and enjoy the 4th night completely free. Perfect for your Tampa getaway.',
    imageUrl: `https://placehold.co/600x400.png?text=Hotel+Stay+Deal`,
    dataAiHint: generateDealDataAiHint("Travel & Hospitality"),
    confidence: 0.96,
    category: 'Travel & Hospitality',
    expiryDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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


    