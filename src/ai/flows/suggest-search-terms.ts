// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting search terms as the user types in the search box.
 *
 * - suggestSearchTerms - A function that suggests search terms based on the user's input.
 * - SuggestSearchTermsInput - The input type for the suggestSearchTerms function.
 * - SuggestSearchTermsOutput - The output type for the suggestSearchTerms function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSearchTermsInputSchema = z.object({
  searchTerm: z
    .string()
    .describe('The search term the user has entered.'),
});
export type SuggestSearchTermsInput = z.infer<typeof SuggestSearchTermsInputSchema>;

const SuggestSearchTermsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested search terms.'),
});
export type SuggestSearchTermsOutput = z.infer<typeof SuggestSearchTermsOutputSchema>;

export async function suggestSearchTerms(input: SuggestSearchTermsInput): Promise<SuggestSearchTermsOutput> {
  return suggestSearchTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSearchTermsPrompt',
  input: {schema: SuggestSearchTermsInputSchema},
  output: {schema: SuggestSearchTermsOutputSchema},
  prompt: `You are a search term suggestion service for a local Tampa business and event directory.

  Given the current search term, suggest up to 5 relevant search terms that the user might be looking for.
  These search terms should be related to businesses, events, or services available in Tampa.

  Current search term: {{{searchTerm}}}

  Format the output as a JSON array of strings.
  `,
});

const suggestSearchTermsFlow = ai.defineFlow(
  {
    name: 'suggestSearchTermsFlow',
    inputSchema: SuggestSearchTermsInputSchema,
    outputSchema: SuggestSearchTermsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
