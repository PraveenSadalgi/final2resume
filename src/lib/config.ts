
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    if (name === "GOOGLE_API_KEY") {
        console.warn("GOOGLE_API_KEY environment variable is not set. Using a placeholder. Please add it to your .env.local file.");
        return "YOUR_API_KEY_HERE";
    }
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const config = {
  googleApiKey: getEnvVar("GOOGLE_API_KEY"),
};
