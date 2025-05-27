export interface Business {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  dataAiHint?: string; // Added to ensure all cards can have hints
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
  dataAiHint?: string; // Added to ensure all cards can have hints
  description: string;
  ticketUrl?: string;
  category: string;
}

export interface Deal {
  id: string;
  title: string;
  businessName: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string; // Added to ensure all cards can have hints
  confidence?: number; // For AI curated deals
  category: string;
  expiryDate?: string;
}
