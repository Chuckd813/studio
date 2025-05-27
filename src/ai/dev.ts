
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-search-terms.ts';
import '@/ai/flows/curate-hot-deals.ts';
import '@/ai/flows/suggest-random-restaurant.ts';
import '@/ai/flows/suggest-random-activity.ts';
import '@/ai/flows/generate-tampa-tip.ts'; // Added new flow registration

