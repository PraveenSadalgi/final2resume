
import "dotenv/config";

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const config = {
  googleApiKey: getEnvVar("GOOGLE_API_KEY"),
};
