
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.local" });

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    // In a real app, you'd want to throw an error, but for Studio we'll provide a placeholder
    // to avoid breaking the app on initial load.
    if (name === "GOOGLE_API_KEY") {
        console.warn("GOOGLE_API_KEY environment variable is not set. Using a placeholder. Please replace it in the .env.local file.");
        return "YOUR_API_KEY_HERE";
    }
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const config = {
  googleApiKey: getEnvVar("GOOGLE_API_KEY"),
};
