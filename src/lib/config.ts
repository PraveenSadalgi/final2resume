
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    if (name === 'NEXT_PUBLIC_GOOGLE_API_KEY') {
      console.warn(
        'NEXT_PUBLIC_GOOGLE_API_KEY environment variable is not set. AI features will not work. Please add it to your .env file.'
      );
      // Return a placeholder, but the features will fail.
      return 'YOUR_API_KEY_HERE';
    }
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const config = {
  googleApiKey: getEnvVar('NEXT_PUBLIC_GOOGLE_API_KEY'),
};
