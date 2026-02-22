FROM node:24-slim AS builder
WORKDIR /app

# OS deps for build
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma Client + Build
RUN npx prisma generate
RUN npm run build

# -------------------------

FROM node:24-slim
WORKDIR /app

# CRITICAL: openssl needed for Prisma runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system app && adduser --system --ingroup app app

# Copy production files
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# CRITICAL: Regenerate Prisma Client in final stage for correct binary target
RUN npx prisma generate

# Remove dev deps
RUN npm prune --omit=dev

USER app
EXPOSE 5000
CMD ["node", "dist/server.js"]