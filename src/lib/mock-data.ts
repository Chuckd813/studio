
import type { Event, Deal, CommunityLeader } from '@/types';

export const industries: string[] = [
  "Technology", "Healthcare", "Food & Beverage", "Retail", "Professional Services",
  "Arts & Culture", "Education", "Real Estate", "Automotive", "Travel & Hospitality"
];

const tampaAreas = ["Downtown", "Ybor City", "Hyde Park", "Seminole Heights", "Westshore", "Channelside", "SoHo", "Tampa Palms", "New Tampa", "Davis Islands"];
const streetNames = ["Main St", "Bay Ave", "Florida Ave", "Dale Mabry Hwy", "Kennedy Blvd", "Fowler Ave", "Channelside Dr", "Howard Ave", "Bayshore Blvd", "Armenia Ave"];
const zipCodes = ["33602", "33603", "33605", "33606", "33607", "33609", "33611", "33629", "33647"];

let businessIdCounter: number = 1;

export interface Business {
  id: string;
  name: string;
  industry: string;
  imageUrl: string;
  dataAiHint: string;
  description: string;
  address: string;
  phone: string;
  category: string;
  website: string;
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
}

export const featuredBusinesses: Business[] = [
  {
    id: 'featured-b1',
    name: 'ConnectWise',
    category: 'Technology',
    imageUrl: '/images/connectwise.jpg', // Ensure this file in public/images/ is actually ConnectWise
    dataAiHint: 'ConnectWise office building or logo',
    description: 'Leading provider of technology solutions for IT businesses.',
    address: '1 ConnectWise Way, Tampa, FL 33607',
    industry: 'Technology',
    phone: generatePhoneNumber(),
    website: 'https://www.connectwise.com',
  },
  {
    id: 'featured-b2',
    name: 'Moffitt Cancer Center',
    category: 'Healthcare',
    imageUrl: '/images/moffitt.jpg', // Ensure this file in public/images/ is actually Moffitt
    dataAiHint: 'Moffitt Cancer Center building exterior',
    description: 'Nationally ranked cancer center providing comprehensive care and research.',
    address: '12902 USF Magnolia Dr, Tampa, FL 33612',
    industry: 'Healthcare',
    phone: generatePhoneNumber(),
    website: 'https://moffitt.org',
  },
  {
    id: 'featured-b3',
    name: 'Columbia Restaurant',
    category: 'Food & Beverage',
    imageUrl: '/images/columbia-restaurant.jpg',
    dataAiHint: 'Columbia Restaurant historic building exterior',
    description: 'Historic Spanish restaurant with multiple locations, famous for its 1905 salad and Cuban bread.',
    address: '2117 E 7th Ave, Tampa, FL 33605',
    industry: 'Food & Beverage',
    phone: generatePhoneNumber(),
    website: 'https://www.columbiarestaurant.com',
  },
  {
    id: 'featured-b4',
    name: 'International Plaza',
    category: 'Retail',
    imageUrl: '/images/international-plaza.jpg',
    dataAiHint: 'International Plaza shopping mall interior',
    description: 'Upscale shopping mall with a wide range of retailers and dining options.',
    address: '2223 N Westshore Blvd, Tampa, FL 33607',
    industry: 'Retail',
    phone: generatePhoneNumber(),
    website: 'https://www.shopinternationalplaza.com',
  },
  {
    id: 'featured-b5',
    name: 'PwC Tampa',
    category: 'Professional Services',
    imageUrl: '/images/pwc-tampa.jpg',
    dataAiHint: 'PwC Tampa office building modern architecture',
    description: 'Provides industry-focused assurance, tax, and advisory services.',
    address: '420 S Tampa St #3100, Tampa, FL 33602',
    industry: 'Professional Services',
    phone: generatePhoneNumber(),
    website: 'https://www.pwc.com/us/en/locations/tampa.html',
  },
  {
    id: 'featured-b6',
    name: 'Tampa Museum of Art',
    category: 'Arts & Culture',
    imageUrl: '/images/tampa-museum-of-art.jpg', // Ensure this file in public/images/ is the image you provided
    dataAiHint: 'Tampa Museum of Art exterior building art display',
    description: 'Showcases a diverse collection of ancient and contemporary art.',
    address: '120 W Gasparilla Plaza, Tampa, FL 33602',
    industry: 'Arts & Culture',
    phone: generatePhoneNumber(),
    website: 'https://tampamuseum.org/', // Official website
  },
  {
    id: 'featured-b7',
    name: 'University of South Florida (USF)',
    category: 'Education',
    imageUrl: '/images/university-of-south-florida.jpg',
    dataAiHint: 'University of South Florida USF campus building',
    description: 'Large public research university with a major campus in Tampa.',
    address: '4202 E Fowler Ave, Tampa, FL 33620',
    industry: 'Education',
    phone: generatePhoneNumber(),
    website: 'https://www.usf.edu',
  },
  {
    id: 'featured-b8',
    name: 'Smith & Associates Real Estate',
    category: 'Real Estate',
    imageUrl: '/images/smith-and-associates.jpg',
    dataAiHint: 'Smith & Associates Real Estate luxury home property',
    description: 'Premier real estate firm specializing in luxury properties in the Tampa Bay area.',
    address: '3901 W Bay to Bay Blvd, Tampa, FL 33629',
    industry: 'Real Estate',
    phone: generatePhoneNumber(),
    website: 'https://www.smithandassociates.com',
  },
  {
    id: 'featured-b9',
    name: 'Ferman Automotive Group',
    category: 'Automotive',
    imageUrl: '/images/ferman-automotive.jpg',
    dataAiHint: 'Ferman Automotive car dealership showroom cars',
    description: 'Family-owned automotive group with a wide selection of new and used vehicles.',
    address: '12801 N Florida Ave, Tampa, FL 33612',
    industry: 'Automotive',
    phone: generatePhoneNumber(),
    website: 'https://www.fermanauto.com',
  },
  {
    id: 'featured-b10',
    name: 'The Tampa EDITION',
    category: 'Travel & Hospitality',
    imageUrl: '/images/the-tampa-edition.jpg',
    dataAiHint: 'The Tampa EDITION luxury hotel night view architecture',
    description: 'Luxury hotel located in the Water Street Tampa district.',
    address: '510 Channelside Dr, Tampa, FL 33602',
    industry: 'Travel & Hospitality',
    phone: generatePhoneNumber(),
    website: 'https://editionhotels.com/tampa/',
  },
];


const realBusinesses: Business[] = [
  {
    id: 'real-b1',
    name: 'ConnectWise',
    industry: 'Technology',
    imageUrl: '/images/connectwise.jpg',
    dataAiHint: 'ConnectWise office logo building',
    description: 'Leading provider of technology solutions for IT businesses.',
    category: 'Technology',
    address: '1 ConnectWise Way, Tampa, FL 33607',
    phone: '813-555-1212',
    website: 'https://www.connectwise.com',
  },
  {
    id: 'real-b2',
    name: 'Moffitt Cancer Center',
    industry: 'Healthcare',
    imageUrl: '/images/moffitt.jpg',
    dataAiHint: 'Moffitt Cancer Center building exterior',
    description: 'Nationally ranked cancer center providing comprehensive care and research.',
    category: 'Healthcare',
    address: '12902 USF Magnolia Dr, Tampa, FL 33612',
    phone: '813-555-1313',
    website: 'https://moffitt.org',
  },
  {
    id: 'real-b3',
    name: 'Columbia Restaurant',
    industry: 'Food & Beverage',
    imageUrl: '/images/columbia-restaurant.jpg',
    dataAiHint: 'Columbia Restaurant historic building exterior',
    description: 'Historic Spanish restaurant with multiple locations, famous for its 1905 salad and Cuban bread.',
    category: 'Food & Beverage',
    address: '2117 E 7th Ave, Tampa, FL 33605',
    phone: '813-555-1414',
    website: 'https://www.columbiarestaurant.com',
  },
  {
    id: 'real-b4',
    name: 'International Plaza',
    industry: 'Retail',
    imageUrl: '/images/international-plaza.jpg',
    dataAiHint: 'International Plaza shopping mall interior',
    description: 'Upscale shopping mall with a wide range of retailers and dining options.',
    category: 'Retail',
    address: '2223 N Westshore Blvd, Tampa, FL 33607',
    phone: '813-555-1515',
    website: 'https://www.shopinternationalplaza.com',
  },
  {
    id: 'real-b5',
    name: 'PwC Tampa',
    industry: 'Professional Services',
    imageUrl: '/images/pwc-tampa.jpg',
    dataAiHint: 'PwC Tampa office building modern architecture',
    description: 'Provides industry-focused assurance, tax, and advisory services.',
    category: 'Professional Services',
    address: '420 S Tampa St #3100, Tampa, FL 33602',
    phone: '813-555-1616',
    website: 'https://www.pwc.com/us/en/locations/tampa.html',
  },
  {
    id: 'real-b6',
    name: 'Tampa Museum of Art',
    industry: 'Arts & Culture',
    imageUrl: '/images/tampa-museum-of-art.jpg',
    dataAiHint: 'Tampa Museum of Art exterior building art display',
    description: 'Showcases a diverse collection of ancient and contemporary art.',
    category: 'Arts & Culture',
    address: '120 W Gasparilla Plaza, Tampa, FL 33602',
    phone: '813-555-1717',
    website: 'https://tampamuseum.org/',
  },
  {
    id: 'real-b7',
    name: 'University of South Florida (USF)',
    industry: 'Education',
    imageUrl: '/images/university-of-south-florida.jpg',
    dataAiHint: 'University of South Florida USF campus building',
    description: 'Large public research university with a major campus in Tampa.',
    category: 'Education',
    address: '4202 E Fowler Ave, Tampa, FL 33620',
    phone: '813-555-1818',
    website: 'https://www.usf.edu',
  },
  {
    id: 'real-b8',
    name: 'Smith & Associates Real Estate',
    industry: 'Real Estate',
    imageUrl: '/images/smith-and-associates.jpg',
    dataAiHint: 'Smith & Associates Real Estate luxury home property',
    description: 'Premier real estate firm specializing in luxury properties in the Tampa Bay area.',
    category: 'Real Estate',
    address: '3901 W Bay to Bay Blvd, Tampa, FL 33629',
    phone: '813-555-1919',
    website: 'https://www.smithandassociates.com',
  },
  {
    id: 'real-b9',
    name: 'Ferman Automotive Group',
    industry: 'Automotive',
    imageUrl: '/images/ferman-automotive.jpg',
    dataAiHint: 'Ferman Automotive car dealership showroom cars',
    description: 'Family-owned automotive group with a wide selection of new and used vehicles.',
    category: 'Automotive',
    address: '12801 N Florida Ave, Tampa, FL 33612',
    phone: '813-555-2020',
    website: 'https://www.fermanauto.com',
  },
  {
    id: 'real-b10',
    name: 'The Tampa EDITION',
    industry: 'Travel & Hospitality',
    imageUrl: '/images/the-tampa-edition.jpg',
    dataAiHint: 'The Tampa EDITION luxury hotel night view architecture',
    description: 'Luxury hotel located in the Water Street Tampa district.',
    category: 'Travel & Hospitality',
    address: '510 Channelside Dr, Tampa, FL 33602',
    phone: '813-555-2121',
    website: 'https://editionhotels.com/tampa/',
  },
];

export let mockBusinesses: Business[] = [...realBusinesses];

industries.forEach(industry => {
  const industrySlug = industry.toLowerCase().replace(/\s+/g, '-');
  if (!realBusinesses.some(rb => rb.industry === industry)) {
    for (let i = 0; i < 10; i++) {
      const area = tampaAreas[Math.floor(Math.random() * tampaAreas.length)];
      const baseName = `${industrySlug}-${area.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`;
      const businessName = `${industry.split(' ')[0]} ${area} Center ${i + 1}`;

      const newBusiness: Business = {
        id: `b${businessIdCounter++}`,
        name: businessName,
        industry: industry,
        category: industry,
        imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(businessName.substring(0,20))}`,
        dataAiHint: generateBusinessDataAiHint(industry),
        description: generateDescription(businessName, industry, area),
        address: `${Math.floor(Math.random() * 2000) + 100} ${streetNames[Math.floor(Math.random() * streetNames.length)]}, Tampa, FL ${zipCodes[Math.floor(Math.random() * zipCodes.length)]}`,
        phone: generatePhoneNumber(),
        website: `https://${baseName.replace(/[^a-z0-9-]/gi, '')}.example.com`
      };
      if (!mockBusinesses.some(b => b.name === newBusiness.name)) {
          mockBusinesses.push(newBusiness);
      }
    }
  }
});
realBusinesses.forEach(rb => {
    if (!mockBusinesses.find(mb => mb.id === rb.id)) {
        mockBusinesses.push(rb);
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

const getBusinessDetailsForDeal = (industry: string): { name: string; id: string | undefined } => {
  const featuredForIndustry = featuredBusinesses.find(fb => fb.industry === industry);
  if (featuredForIndustry) {
    return { name: featuredForIndustry.name, id: featuredForIndustry.id };
  }

  const businessesInIndustry = mockBusinesses.filter(b => b.category === industry);
  if (businessesInIndustry.length === 0) {
     const realBizInIndustry = realBusinesses.filter(b => b.category === industry);
     if(realBizInIndustry.length === 0) {
        return { name: `A Great ${industry} Business`, id: undefined };
     }
     const business = realBizInIndustry[Math.floor(Math.random() * realBizInIndustry.length)];
     return { name: business.name, id: business.id };
  }
  const business = businessesInIndustry[Math.floor(Math.random() * businessesInIndustry.length)];
  return { name: business.name, id: business.id };
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
    imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(industry)}+Deal`,
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

// Ensure specific website for Tampa Museum of Art is correct
const tmaIndexFeatured = featuredBusinesses.findIndex(b => b.name === 'Tampa Museum of Art');
if (tmaIndexFeatured !== -1) {
  featuredBusinesses[tmaIndexFeatured].website = 'https://tampamuseum.org/';
}
const tmaIndexReal = realBusinesses.findIndex(b => b.name === 'Tampa Museum of Art');
if (tmaIndexReal !== -1) {
  realBusinesses[tmaIndexReal].website = 'https://tampamuseum.org/';
}
// Update mockBusinesses if Tampa Museum of Art is present
const tmaIndexMock = mockBusinesses.findIndex(b => b.name === 'Tampa Museum of Art');
if (tmaIndexMock !== -1) {
  mockBusinesses[tmaIndexMock].website = 'https://tampamuseum.org/';
}

