export interface Business {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  dataAiHint?: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string; // ISO string or formatted date
  time: string;
  venue: string;
  imageUrl: string;
  dataAiHint?: string;
  description: string;
  ticketUrl?: string;
  category: string;
}

export interface Deal {
  id: string;
  title: string;
  businessName: string;
  businessId?: string; // Added to link to business profile
  description: string;
  imageUrl: string;
  dataAiHint?: string;
  confidence?: number; // For AI curated deals
  category: string;
  expiryDate?: string;
}

export interface CommunityLeader {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Added for the Fun Adventure Wheel
export interface ActivitySuggestion {
  name: string;
  category: string;
  description: string;
  location?: string; // e.g., "Ybor City" or a specific venue
  details?: string; // Any other useful info
}
