
'use server';
/**
 * @fileOverview Generates a daily interesting tip or fact about Tampa.
 *
 * - generateTampaTip - A function that returns a fun tip about Tampa.
 * - GenerateTampaTipOutput - The return type for the generateTampaTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// No specific input schema needed for a simple daily tip
const GenerateTampaTipOutputSchema = z.object({
  tip: z.string().describe('A short, engaging tip or interesting fact about Tampa, Florida.')
});
export type GenerateTampaTipOutput = z.infer<typeof GenerateTampaTipOutputSchema>;

export async function generateTampaTip(): Promise<GenerateTampaTipOutput> {
  return generateTampaTipFlow();
}

const prompt = ai.definePrompt({
  name: 'generateTampaTipPrompt',
  // No input schema, as it's a general request
  output: { schema: GenerateTampaTipOutputSchema },
  prompt: `You are an enthusiastic Tampa Bay local expert. Your goal is to provide a single, short (1-2 sentences), engaging, and interesting tip or fun fact about Tampa, Florida.

Make it sound like a friendly local sharing a piece of insider knowledge. It could be about a unique place, a delicious food item, a historical tidbit, a local custom, or a fun activity. Ensure the tip is generally positive and encourages exploration or appreciation of Tampa.

Examples:
- "Did you know the Tampa Riverwalk stretches for 2.6 miles? It's perfect for a scenic stroll or bike ride!"
- "Craving a true Tampa original? Don't leave without trying a Cuban sandwich – the debate over the best one is legendary!"
- "Keep an eye out for the wild chickens roaming Ybor City – they're a quirky and beloved part of the neighborhood's charm."
- "For breathtaking sunset views over the bay, head to Ballast Point Park. You might even spot some dolphins!"

Generate a new, unique tip:
`,
});

const generateTampaTipFlow = ai.defineFlow(
  {
    name: 'generateTampaTipFlow',
    // No inputSchema
    outputSchema: GenerateTampaTipOutputSchema,
  },
  async () => {
    const {output} = await prompt({}); // Pass empty object as there's no specific input
    if (!output) {
      return { tip: "Tampa is a wonderful city with many hidden gems to explore! Check back soon for a specific tip." };
    }
    return output;
  }
);
