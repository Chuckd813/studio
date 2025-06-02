
import type { Event, Deal, CommunityLeader } from '@/types';

export const industries: string[] = [
  "Technology", "Healthcare", "Food & Beverage", "Retail", "Professional Services",
  "Arts & Culture", "Education", "Real Estate", "Automotive", "Travel & Hospitality"
];

const tampaAreas = ["Downtown", "Ybor City", "Hyde Park", "Seminole Heights", "Westshore", "Channelside", "SoHo", "Tampa Palms", "New Tampa", "Davis Islands"];
const streetNames = ["Main St", "Bay Ave", "Florida Ave", "Dale Mabry Hwy", "Kennedy Blvd", "Fowler Ave", "Channelside Dr", "Howard Ave", "Bayshore Blvd", "Armenia Ave"];
const zipCodes = ["33602", "33603", "33605", "33606", "33607", "33609", "33611", "33629", "33647"];

let businessIdCounter: number = 1; // Used for generating unique IDs for mock businesses

export interface Business {
  id: string;
  name: string;
  industry: string;
  imageUrl: string;
  dataAiHint: string;
  description: string;
  address: string;
  phone: string;
  category: string; // In our case, category is the same as industry
  website: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

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
};

const realBusinesses: Business[] = [
  {
    id: 'connectwise-real',
    name: 'ConnectWise',
    industry: 'Technology',
    imageUrl: '/images/connectwise1.jpg',
    dataAiHint: 'ConnectWise logo office building',
    description: 'Leading provider of technology solutions for IT businesses.',
    category: 'Technology',
    address: '4810 Eisenhower Blvd S #300, Tampa, FL 33634',
    phone: '(813) 463-1700',
    website: 'https://www.connectwise.com/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'moffitt-real',
    name: 'Moffitt Cancer Center',
    industry: 'Healthcare',
    imageUrl: '/images/moffit.jpg',
    dataAiHint: 'Moffitt Cancer Center building exterior',
    description: 'World-renowned cancer treatment and research center.',
    category: 'Healthcare',
    address: '12902 USF Magnolia Dr, Tampa, FL 33612',
    phone: '813-745-4673',
    website: 'https://moffitt.org/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'columbia-restaurant-real',
    name: 'Columbia Restaurant',
    industry: 'Food & Beverage',
    imageUrl: '/images/colombiaresturant.jpg',
    dataAiHint: 'Columbia Restaurant Ybor City historic building',
    description: 'Historic Spanish restaurant, famous for its 1905 salad and Cuban bread.',
    category: 'Food & Beverage',
    address: '2117 E 7th Ave, Tampa, FL 33605',
    phone: '813-248-4961',
    website: 'https://www.columbiarestaurant.com/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'international-plaza-real',
    name: 'International Plaza and Bay Street',
    industry: 'Retail',
    imageUrl: '/images/internationalplaza.jpg',
    dataAiHint: 'International Plaza shopping mall interior stores',
    description: 'Upscale shopping mall with a wide range of retailers and dining options.',
    category: 'Retail',
    address: '2223 N Westshore Blvd, Tampa, FL 33607',
    phone: '813-342-3790',
    website: 'https://www.shopinternationalplaza.com/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'pwc-tampa-real',
    name: 'PwC Tampa',
    industry: 'Professional Services',
    imageUrl: '/images/pwctampa.jpg',
    dataAiHint: 'PwC Tampa office building city',
    description: 'Provides industry-focused assurance, tax, and advisory services.',
    category: 'Professional Services',
    address: '401 E Jackson St #3100, Tampa, FL 33602',
    phone: '813-229-0221',
    website: 'https://www.pwc.com/us/en/locations/fl/tampa.html',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'tampa-museum-art-real',
    name: 'Tampa Museum of Art',
    industry: 'Arts & Culture',
    imageUrl: '/images/tampamuseummofart.jpg',
    dataAiHint: 'Tampa Museum of Art modern exterior',
    description: 'Showcases a diverse collection of ancient and contemporary art.',
    category: 'Arts & Culture',
    address: '120 W Gasparilla Plaza, Tampa, FL 33602',
    phone: '813-274-8130',
    website: 'https://tampamuseum.org/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'usf-real',
    name: 'University of South Florida (USF)',
    industry: 'Education',
    imageUrl: '/images/universityofsouthfl.jpg',
    dataAiHint: 'University South Florida campus building',
    description: 'Large public research university with a major campus in Tampa.',
    category: 'Education',
    address: '4202 E Fowler Ave, Tampa, FL 33620',
    phone: '813-974-2011',
    website: 'https://www.usf.edu/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'smith-associates-real',
    name: 'Smith & Associates Real Estate',
    industry: 'Real Estate',
    imageUrl: '/images/smithassociates.jpg',
    dataAiHint: 'Smith Associates Real Estate luxury home',
    description: 'Premier real estate firm specializing in luxury properties in the Tampa Bay area.',
    category: 'Real Estate',
    address: '3801 W Bay to Bay Blvd, Tampa, FL 33629',
    phone: '813-839-3800',
    website: 'https://www.smithandassociates.com/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'dimmitt-auto-real',
    name: 'Dimmitt Automotive Group', // Changed name to match image
    industry: 'Automotive',
    imageUrl: '/images/dimmitautogroup.jpg',
    dataAiHint: 'Dimmitt Automotive car dealership showroom',
    description: 'Luxury and exotic car dealership group with a strong presence in Tampa Bay.',
    category: 'Automotive',
    address: '3333 Gandy Blvd N, St. Petersburg, FL 33781', // Example address, might vary
    phone: '727-822-2019',
    website: 'https://www.dimmitt.com/', // General Dimmitt site
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'tampa-edition-real',
    name: 'The Tampa EDITION',
    industry: 'Travel & Hospitality',
    imageUrl: '/images/editiontampa.jpg',
    dataAiHint: 'The Tampa EDITION luxury hotel interior',
    description: 'Luxury hotel located in the Water Street Tampa district, offering sophisticated accommodations and dining.',
    category: 'Travel & Hospitality',
    address: '500 Channelside Dr, Tampa, FL 33602',
    phone: '813-221-4600',
    website: 'https://www.editionhotels.com/tampa/',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  },
  {
    id: 'glenn-cummings-media-real',
    name: 'Glenn Cummings Media',
    industry: 'Professional Services',
    imageUrl: '/images/yourbusinesshere.png', 
    dataAiHint: 'Glenn Cummings Media logo advertisement',
    description: 'Full-service media and advertising solutions.',
    category: 'Professional Services',
    address: '123 Media Way, Tampa, FL 33602', // Example address
    phone: '813-579-8482',
    website: 'https://www.glenncummings.com',
     socialMedia: { facebook: '#', twitter: '#', instagram: '#' },
  }
];

const placeholderBusinessDescription = "List your business here and connect with thousands of local customers!";

export const featuredBusinesses: Business[] = [
  realBusinesses[0], // ConnectWise
  {
    id: 'featured-ybh1',
    name: 'Your Business Here',
    category: 'Advertisement',
    industry: 'Various',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'placeholder business listing',
    description: placeholderBusinessDescription,
    address: 'Your Address Here',
    phone: 'Your Phone Here',
    website: '/auth/register',
    socialMedia: {},
  },
  realBusinesses[2], // Columbia Restaurant
  {
    id: 'featured-ybh2',
    name: 'Your Business Here',
    category: 'Advertisement',
    industry: 'Various',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'placeholder business listing',
    description: placeholderBusinessDescription,
    address: 'Your Address Here',
    phone: 'Your Phone Here',
    website: '/auth/register',
    socialMedia: {},
  },
  realBusinesses[4], // PwC Tampa
  {
    id: 'featured-ybh3',
    name: 'Your Business Here',
    category: 'Advertisement',
    industry: 'Various',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'placeholder business listing',
    description: placeholderBusinessDescription,
    address: 'Your Address Here',
    phone: 'Your Phone Here',
    website: '/auth/register',
    socialMedia: {},
  },
  realBusinesses[3], // International Plaza
  {
    id: 'featured-ybh4',
    name: 'Your Business Here',
    category: 'Advertisement',
    industry: 'Various',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'placeholder business listing',
    description: placeholderBusinessDescription,
    address: 'Your Address Here',
    phone: 'Your Phone Here',
    website: '/auth/register',
    socialMedia: {},
  },
  realBusinesses[6], // University of South Florida (USF)
  {
    id: 'featured-ybh5',
    name: 'Your Business Here',
    category: 'Advertisement',
    industry: 'Various',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'placeholder business listing',
    description: placeholderBusinessDescription,
    address: 'Your Address Here',
    phone: 'Your Phone Here',
    website: '/auth/register',
    socialMedia: {},
  },
];


let tempMockBusinesses: Business[] = [...realBusinesses];

industries.forEach(industry => {
  const industrySlug = industry.toLowerCase().replace(/\s+/g, '-');
  const existingBusinessesInIndustry = tempMockBusinesses.filter(b => b.industry === industry);
  let businessesToGenerate = 10 - existingBusinessesInIndustry.length;

  if (businessesToGenerate > 0) {
    for (let i = 0; i < businessesToGenerate; i++) {
      const area = tampaAreas[Math.floor(Math.random() * tampaAreas.length)];
      const currentCountInIndustry = existingBusinessesInIndustry.length + i;
      const businessName = `${industry.split(' ')[0]} ${area} Sample ${currentCountInIndustry + 1}`;
      const baseName = `${industrySlug}-${area.toLowerCase().replace(/\s+/g, '-')}-sample-${currentCountInIndustry + 1}`;

      const newBusiness: Business = {
        id: `b-gen-${businessIdCounter++}`,
        name: businessName,
        industry: industry,
        category: industry,
        imageUrl: '/images/yourbusinesshere.png', // Generic placeholder for generated ones
        dataAiHint: generateBusinessDataAiHint(industry),
        description: generateDescription(businessName, industry, area),
        address: `${Math.floor(Math.random() * 2000) + 100} ${streetNames[Math.floor(Math.random() * streetNames.length)]}, Tampa, FL ${zipCodes[Math.floor(Math.random() * zipCodes.length)]}`,
        phone: generatePhoneNumber(),
        website: `https://${baseName.replace(/[^a-z0-9-]/gi, '')}.example.com`,
        socialMedia: { facebook: '#', twitter: '#', instagram: '#' }, // Add placeholder social media
      };
      tempMockBusinesses.push(newBusiness);
    }
  }
});
export let mockBusinesses: Business[] = tempMockBusinesses;


export const mockEvents: Event[] = [
  {
    id: 'e1',
    name: 'Downtown Music Fest',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '7:00 PM - 11:00 PM',
    venue: 'Curtis Hixon Waterfront Park',
    imageUrl: '/images/youreventhere.jpg',
    dataAiHint: 'music festival concert',
    description: "Don't miss Tampa's hottest music event! Experience electrifying performances. Click to explore more!",
    ticketUrl: 'https://tickets.example.com/downtownfest',
    category: 'Music Festival',
  },
  {
    id: 'e2',
    name: 'Sunset Yacht Party by Ybor City Nights',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '6:00 PM - 9:00 PM',
    venue: 'Tampa Bay Waters (Dock at Tampa Yacht Charters)',
    imageUrl: '/images/youreventhere.jpg',
    dataAiHint: 'yacht party sunset',
    description: "Sail into the sunset! Unforgettable views, top DJs. Your Tampa Bay adventure starts here!",
    category: 'Nightlife',
  },
  {
    id: 'e3',
    name: 'Tampa Tech Innovators Conference',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '9:00 AM - 5:00 PM',
    venue: 'Tampa Convention Center',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'conference tech presentation',
    description: "Connect with tech leaders! Discover groundbreaking innovations. See what Tampa offers!",
    ticketUrl: 'https://tickets.example.com/techconf',
    category: 'Conference',
  },
  {
    id: 'e4',
    name: 'Hyde Park Art Walk',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00 AM - 4:00 PM',
    venue: 'Hyde Park Village',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'art festival outdoor',
    description: "Immerse yourself in art! Unique creations, vibrant atmosphere. Explore Tampa's creative side!",
    category: 'Arts & Culture',
  },
   {
    id: 'e5',
    name: 'Seminole Heights Food Truck Rally',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '5:00 PM - 9:00 PM',
    venue: 'Seminole Heights Garden Center',
    imageUrl: '/images/yourbusinesshere.png',
    dataAiHint: 'food trucks event',
    description: "Taste the best of Tampa! Diverse flavors, fun for everyone. Discover your next favorite meal!",
    category: 'Food & Beverage',
  },
];

const getBusinessDetailsForDeal = (industry: string): { name: string; id: string | undefined } => {
  const businessesInIndustry = mockBusinesses.filter(b => b.industry === industry && b.imageUrl !== '/images/yourbusinesshere.png'); // Prefer businesses with real images
  if (businessesInIndustry.length > 0) {
    const business = businessesInIndustry[Math.floor(Math.random() * businessesInIndustry.length)];
    return { name: business.name, id: business.id };
  }
  // Fallback to any business in the industry if no "real image" ones are found
  const fallbackBusinesses = mockBusinesses.filter(b => b.industry === industry);
  if (fallbackBusinesses.length > 0) {
    const business = fallbackBusinesses[Math.floor(Math.random() * fallbackBusinesses.length)];
    return { name: business.name, id: business.id };
  }
  return { name: `A Great ${industry} Business`, id: undefined };
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

export const mockDeals: Deal[] = industries.map((industry, index) => {
  const businessInfo = getBusinessDetailsForDeal(industry);
  const dealTitles: Record<string, string> = {
    "Technology": "15% Off Custom Software Development",
    "Healthcare": "Free Wellness Check-up This Month",
    "Food & Beverage": "Two-for-One Entrees on Tuesdays",
    "Retail": "End of Season Sale - Up to 50% Off",
    "Professional Services": "Free Initial Consultation",
    "Arts & Culture": "20% Off Exhibit Tickets",
    "Education": "Early Bird Discount for Bootcamp",
    "Real Estate": "Home Valuation Discount",
    "Automotive": "Free Tire Rotation with Service",
    "Travel & Hospitality": "Stay 3 Nights, Get 4th Free"
  };
  const dealDescriptions: Record<string, string> = {
    "Technology": "Boost your business with cutting-edge tech! Get 15% off your first custom software project.",
    "Healthcare": "Book a free wellness check-up. Offer valid for new patients.",
    "Food & Beverage": "Bring a friend and enjoy two entrees for the price of one every Tuesday.",
    "Retail": "Huge discounts on selected items in our end-of-season sale. While stocks last!",
    "Professional Services": "Free 30-min consultation to discuss your business needs and growth strategies.",
    "Arts & Culture": "Experience stunning local art and get 20% off your ticket price this week.",
    "Education": "Sign up early for our next coding bootcamp and receive a $200 discount.",
    "Real Estate": "List your home with us and receive a discount on your property valuation.",
    "Automotive": "Complimentary tire rotation when you book any major service this month.",
    "Travel & Hospitality": "Book a 3-night hotel stay and enjoy the 4th night completely free."
  };

  return {
    id: `d${industry.toLowerCase().replace(/[^a-z]/g, '')}${index + 1}`,
    title: dealTitles[industry] || `Special Offer from ${industry}`,
    businessName: businessInfo.name,
    businessId: businessInfo.id,
    description: dealDescriptions[industry] || `An amazing deal from a local ${industry.toLowerCase()} business. Don't miss out!`,
    imageUrl: '/images/yourbusinesshere.png', // Placeholder for deals, update if specific deal images exist
    dataAiHint: generateDealDataAiHint(industry),
    confidence: Math.random() * 0.2 + 0.8,
    category: industry,
    expiryDate: new Date(Date.now() + (10 + index * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };
});


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

