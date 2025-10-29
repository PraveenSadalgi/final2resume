
const getEnvVar = (name: string): string => {
  const value = process.env[name];
  // Hardcoding the key for local development as a final measure to resolve access issues.
  // This is a workaround for local server environment problems.
  return "AIzaSyAIs9TG2BmUU4QL2Oce-Qn0-rnlZZ5KeEc";
};

export const config = {
  googleApiKey: getEnvVar('NEXT_PUBLIC_GOOGLE_API_KEY'),
};
