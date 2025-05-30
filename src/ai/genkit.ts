
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure you have GOOGLE_API_KEY set in your .env file
// This key should be enabled for the "Generative Language API" in your Google Cloud Console.
const googleAiApiKey = process.env.GOOGLE_API_KEY;

if (!googleAiApiKey) {
  console.warn(
    'GOOGLE_API_KEY is not set. Genkit will attempt to use Application Default Credentials or other mechanisms if available, but this may not work for all environments or may lead to permission issues like API_KEY_SERVICE_BLOCKED if the wrong key/credentials are picked up.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleAiApiKey, // Explicitly pass the API key
    }),
  ],
  model: 'googleai/gemini-2.0-flash', // Corrected and completed model name
});
