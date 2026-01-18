FROM node:24-slim AS builder
WORKDIR /app

# OS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates bash && \
    rm -rf /var/lib/apt/lists/*

# Install deps ONLY
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source (now prisma schema exists)
COPY . .

# Prisma + build
RUN npx prisma generate
RUN npm run build

# -------------------------

FROM node:24-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates bash && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

RUN addgroup --system app && adduser --system --ingroup app app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm prune --omit=dev

USER app
EXPOSE 5000
CMD ["node", "dist/server.js"]
