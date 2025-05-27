
'use server';
/**
 * @fileOverview Suggests a random fun activity or date night idea in Tampa.
 *
 * - suggestRandomActivity - A function that handles the activity suggestion process.
 * - SuggestRandomActivityInput - The input type for the suggestRandomActivity function.
 * - SuggestRandomActivityOutput - The return type for the suggestRandomActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { mockBusinesses, mockEvents } from '@/lib/mock-data'; // Using mock data for ideas
import type { ActivitySuggestion } from '@/types';

const SuggestRandomActivityInputSchema = z.object({
  activityType: z.string().optional().describe('The type of activity the user is looking for, e.g., "Outdoor", "Romantic", "Arts & Culture".'),
});
export type SuggestRandomActivityInput = z.infer<typeof SuggestRandomActivityInputSchema>;

// Using the existing ActivitySuggestion type for output
const SuggestRandomActivityOutputSchema = z.object({
  name: z.string().describe('The name of the suggested activity or place.'),
  category: z.string().describe('The category of the activity (e.g., Outdoor, Arts & Culture, Nightlife).'),
  description: z.string().describe('A catchy description or reason for the suggestion.'),
  location: z.string().optional().describe('The general location or specific venue for the activity.'),
  details: z.string().optional().describe('Any other useful details or tips for the activity.'),
});
export type SuggestRandomActivityOutput = z.infer<typeof SuggestRandomActivityOutputSchema>;


export async function suggestRandomActivity(input: SuggestRandomActivityInput): Promise<ActivitySuggestion> {
  return suggestRandomActivityFlow(input);
}

// Helper to get some potential activity ideas from existing mock data
function getTampaActivityIdeas(): { name: string; category: string; location?: string, descriptionHint: string }[] {
  const ideas: { name: string; category: string; location?: string, descriptionHint: string }[] = [];

  // From Businesses (e.g., Yacht Rentals, Beauty Salons for relax)
  mockBusinesses.forEach(b => {
    if (b.category === "Travel & Hospitality" && b.name.toLowerCase().includes("yacht")) {
      ideas.push({ name: b.name, category: "Outdoor Fun", location: "Tampa Bay Waters", descriptionHint: `related to yachting or boat tours from ${b.name}` });
    }
    if (b.category === "Arts & Culture") {
        ideas.push({ name: b.name, category: "Arts & Culture", location: b.address, descriptionHint: `an experience at ${b.name}`});
    }
    if (b.category === "Beauty & Spas") { // Assuming this category exists or similar
        ideas.push({ name: b.name, category: "Relax & Unwind", location: b.address, descriptionHint: `a relaxing experience at ${b.name}`});
    }
  });

  // From Events
  mockEvents.forEach(e => {
    ideas.push({ name: e.name, category: e.category, location: e.venue, descriptionHint: `related to the event: ${e.name}` });
  });
  
  // Add some generic ideas if needed
  if (ideas.length < 5) {
      ideas.push(
        { name: "Stroll along the Tampa Riverwalk", category: "Outdoor Fun", location: "Tampa Riverwalk", descriptionHint: "a scenic walk or bike ride"},
        { name: "Visit the Florida Aquarium", category: "Family Adventure", location: "Channelside", descriptionHint: "exploring marine life"},
        { name: "Explore Ybor City's historic district", category: "Arts & Culture", location: "Ybor City", descriptionHint: "discovering history and vibrant nightlife"},
        { name: "Relax at Clearwater Beach", category: "Relax & Unwind", location: "Clearwater Beach (nearby)", descriptionHint: "a beach day with sun and sand"}
      );
  }

  return ideas.slice(0, 15); // Limit to a reasonable number for the prompt
}


const prompt = ai.definePrompt({
  name: 'suggestRandomActivityPrompt',
  input: { schema: SuggestRandomActivityInputSchema.extend({
      activityList: z.array(z.object({
          name: z.string(),
          category: z.string(),
          location: z.string().optional(),
          descriptionHint: z.string()
      })).describe("List of potential activities, venues, or events in Tampa.")
  })},
  output: { schema: SuggestRandomActivityOutputSchema },
  prompt: `You are a witty and enthusiastic Tampa Bay local, an expert in finding fun and unique activities. Your goal is to suggest a fantastic activity based on a provided list and an optional user preference.

Available Activities/Venues in Tampa:
{{#each activityList}}
- Name: {{{this.name}}}, Category: {{{this.category}}}, Location: {{#if this.location}}{{{this.location}}}{{else}}General Tampa Area{{/if}}, Hint: {{{this.descriptionHint}}}
{{/each}}

User's Activity Type Preference: {{#if activityType}}"{{{activityType}}}"{{else}}None specified - surprise me with something awesome!{{/if}}

Based on the user's preference (if any) and the list of activities, pick ONE activity or venue.
Provide its name, its general category (e.g. "Outdoor Fun", "Arts & Culture", "Nightlife Spark"), and its location (if available or general area).
Also, craft a short, playful, and enticing description (1-3 sentences) for why this particular choice is great. Be creative and make it sound appealing! If it's a specific business or event from the list, try to incorporate its name or nature into the fun description.

Example Output Format (ensure your output strictly follows this JSON structure):
{
  "name": "Example Activity Name",
  "category": "Example Category (e.g., Outdoor Fun)",
  "location": "Example Location (e.g., Ybor City or specific venue)",
  "description": "Because life's too short for boring weekends! This is your chance to [do something fun related to the activity]."
}
`,
});

const suggestRandomActivityFlow = ai.defineFlow(
  {
    name: 'suggestRandomActivityFlow',
    inputSchema: SuggestRandomActivityInputSchema,
    outputSchema: SuggestRandomActivityOutputSchema,
  },
  async (input) => {
    const activityIdeas = getTampaActivityIdeas();
    if (activityIdeas.length === 0) {
      return {
        name: "No Activities Found",
        category: "Error",
        description: "We couldn't find any fun activities in our directory right now. Please check back later!",
        location: "N/A"
      };
    }
    
    const promptInput = {
        activityType: input.activityType,
        activityList: activityIdeas,
    }

    const { output } = await prompt(promptInput);
    
    if (!output) {
         throw new Error('AI failed to provide an activity suggestion. Please try again.');
    }
    // Ensure all required fields are present, even if AI omits optional ones
    return {
        name: output.name,
        category: output.category,
        description: output.description,
        location: output.location || "Tampa Area", // Default if not provided
        details: output.details || undefined // Ensure details is undefined if not provided
    };
  }
);
