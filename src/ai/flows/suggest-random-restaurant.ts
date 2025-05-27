
'use server';
/**
 * @fileOverview Suggests a random restaurant in Tampa, optionally based on a user's craving.
 *
 * - suggestRandomRestaurant - A function that handles the restaurant suggestion process.
 * - SuggestRandomRestaurantInput - The input type for the suggestRandomRestaurant function.
 * - SuggestRandomRestaurantOutput - The return type for the suggestRandomRestaurant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { mockBusinesses } from '@/lib/mock-data'; // Assuming mockBusinesses is correctly typed and exported
import type { Business } from '@/types';

const SuggestRandomRestaurantInputSchema = z.object({
  craving: z.string().optional().describe('The user_s food craving, e.g., "spicy", "Italian", "comfort food".'),
});
export type SuggestRandomRestaurantInput = z.infer<typeof SuggestRandomRestaurantInputSchema>;

const SuggestRandomRestaurantOutputSchema = z.object({
  name: z.string().describe('The name of the suggested restaurant.'),
  category: z.string().describe('The category of the restaurant (e.g., Italian, Seafood).'),
  address: z.string().describe('The address of the restaurant.'),
  reason: z.string().describe('A short, fun reason why this restaurant was suggested.'),
});
export type SuggestRandomRestaurantOutput = z.infer<typeof SuggestRandomRestaurantOutputSchema>;

export async function suggestRandomRestaurant(input: SuggestRandomRestaurantInput): Promise<SuggestRandomRestaurantOutput> {
  return suggestRandomRestaurantFlow(input);
}

// Helper function to prepare restaurant list for the prompt
function getFoodAndBeverageBusinesses(): { name: string; description: string; address: string; category: string }[] {
  return mockBusinesses
    .filter(business => business.category === 'Food & Beverage')
    .map(business => ({
      name: business.name,
      description: business.description, // Include description for better AI context
      address: business.address,
        category: business.category // Though filtered, explicitly passing might be useful context for AI
    }));
}

const prompt = ai.definePrompt({
  name: 'suggestRandomRestaurantPrompt',
  input: { schema: SuggestRandomRestaurantInputSchema.extend({
    restaurantList: z.array(z.object({
        name: z.string(),
        description: z.string(),
        address: z.string(),
        category: z.string()
    })).describe("List of available Food & Beverage businesses in Tampa.")
  })},
  output: { schema: SuggestRandomRestaurantOutputSchema },
  prompt: `You are a fun, witty, and slightly quirky Tampa Bay food expert. Your goal is to suggest a fantastic place to eat from the provided list.

Available Restaurants in Tampa (Food & Beverage category):
{{#each restaurantList}}
- Name: {{{this.name}}}, Description: {{{this.description}}}, Address: {{{this.address}}}
{{/each}}

User's Craving: {{#if craving}}"{{{craving}}}"{{else}}None specified - surprise me with something great!{{/if}}

Based on the user's craving (if any) and the list of restaurants, pick ONE restaurant.
Provide its name, its general category (like "Italian", "Seafood", "Casual American" - infer from description if needed, but use the provided name/description as primary source), and its address.
Also, give a short, playful, and enticing reason (1-2 sentences) why this particular restaurant is a great choice for them right now. Be creative!

Example Output Format (ensure your output strictly follows this JSON structure):
{
  "name": "Example Restaurant Name",
  "category": "Example Category (e.g., Pizza)",
  "address": "123 Example St, Tampa, FL",
  "reason": "Because life's too short for boring food, and this place is an explosion of flavor!"
}
`,
});

const suggestRandomRestaurantFlow = ai.defineFlow(
  {
    name: 'suggestRandomRestaurantFlow',
    inputSchema: SuggestRandomRestaurantInputSchema,
    outputSchema: SuggestRandomRestaurantOutputSchema,
  },
  async (input) => {
    const foodBusinesses = getFoodAndBeverageBusinesses();
    if (foodBusinesses.length === 0) {
      // Fallback if no food businesses are found - this should ideally not happen with mock data
      return {
        name: "No Restaurants Found",
        category: "Error",
        address: "N/A",
        reason: "We couldn't find any food and beverage businesses in our directory right now. Please check back later!"
      };
    }
    
    const promptInput = {
        craving: input.craving,
        restaurantList: foodBusinesses,
    }

    const { output } = await prompt(promptInput);
    
    if (!output) {
        // Handle cases where the LLM might not return the expected output
         throw new Error('AI failed to provide a suggestion. Please try again.');
    }
    return output;
  }
);
