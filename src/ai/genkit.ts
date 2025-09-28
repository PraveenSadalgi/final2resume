
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config as appConfig} from '@/lib/config';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig();

export const ai = genkit({
  plugins: [googleAI({apiKey: appConfig.googleApiKey})],
});
