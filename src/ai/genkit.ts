import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from '@/lib/config';

export const ai = genkit({
  plugins: [googleAI({apiKey: config.googleApiKey})],
});
