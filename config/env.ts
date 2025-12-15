import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `❌ Missing required environment variable: ${name}. Check your ${envFile}`
    );
  }
  return value;
}

export const config = {
  env: requireEnv("NODE_ENV"),

  server: {
    port: parseInt(requireEnv("PORT"), 10),
    clientUrl: requireEnv("CLIENT_URL"),
  },

  db: {
    url: requireEnv("DATABASE_URL"),
  },

  jwt: {
    secret: requireEnv("JWT_SECRET"),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  auth: {
    google: {
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
    },
  },
} as const;

Object.freeze(config);

console.log(`📦 Loaded environment: ${config.env} using file: ${envFile}`);
