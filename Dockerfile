# ----------------------------
# Stage 1: Build stage
# ----------------------------
FROM node:24-bullseye AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install all dependencies (including dev for TypeScript)
RUN npm ci

# Copy entire source code
COPY . .

# Build TypeScript
RUN npm run build

# Generate Prisma client (needed for production)
RUN npx prisma generate


# ----------------------------
# Stage 2: Runtime stage
# ----------------------------
FROM node:24-bullseye-slim AS runtime

# Set working directory
WORKDIR /app

# Copy only production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled JS and Prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copy any other files you need (like package.json for version)
COPY package.json ./

# Expose the port (match your config)
EXPOSE 5000

# Set environment variable for Node
ENV NODE_ENV=production

# Start the server
CMD ["node", "dist/server.js"]
