
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure you have GOOGLE_API_KEY set in your .env file
// This key should be enabled for the "Generative Language API" in your Google Cloud Console.
const googleAiApiKey = process.env.GOOGLE_API_KEY;

if (!googleAiApiKey) {
  console.warn(
    '🔴 GOOGLE_API_KEY is not set in your environment variables. Genkit will not be able to connect to Google AI services. Please ensure it is set in your .env file and that your server has been restarted.'
  );
} else {
  console.log('🟢 GOOGLE_API_KEY is set. Genkit will attempt to use this key for Google AI services.');
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleAiApiKey, // Explicitly pass the API key
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
