
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-search-terms.ts';
import '@/ai/flows/curate-hot-deals.ts';
import '@/ai/flows/suggest-random-restaurant.ts'; // Added new flow
