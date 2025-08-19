// Node.js-only utility (never import in browser code)
export function getEnvVar(key: string): string {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    throw new Error("getEnvVar can only be used in Node.js environments");
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// For browser code, use only static references below. These will be replaced at build time by Webpack's DefinePlugin.
// Never commit real API keys to the repo or expose them to the client if not needed.
// These are safe for browser import:
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
export const S3_BUCKET_ARN = process.env.S3_BUCKET_ARN || "";
export const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || "";
export const CLOUDFRONT_DISTRIBUTION_ARN =
  process.env.CLOUDFRONT_DISTRIBUTION_ARN || "";
export const CLOUDFRONT_DISTRIBUTION_ID =
  process.env.CLOUDFRONT_DISTRIBUTION_ID || "";
export const API_GATEWAY_ID = process.env.API_GATEWAY_ID || "";
export const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "";
export const API_GATEWAY_RESOURCE_ID =
  process.env.API_GATEWAY_RESOURCE_ID || "";
