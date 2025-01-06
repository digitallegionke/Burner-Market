const requiredEnvVars = [
  'NEXT_PUBLIC_SHOPIFY_DOMAIN',
  'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  'SANITY_PROJECT_ID',
  'SANITY_DATASET',
  'SANITY_API_VERSION',
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];

export function validateEnv() {
  const missingEnvVars: RequiredEnvVar[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingEnvVars.join('\n')}`
    );
  }
}

export function getEnvVar(key: RequiredEnvVar): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
} 