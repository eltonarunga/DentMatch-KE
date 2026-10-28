# ===================================================
# DentMatch KE - Production Multi-Stage Dockerfile
# ===================================================

# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Install package dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build Vite client and bundle Express server.ts with esbuild
ENV NODE_ENV=production
RUN npm run build

# Prune dev dependencies for lean runtime
RUN npm prune --production

# 2. Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Security: Run as unprivileged node user
USER node

# Copy built artifacts and production dependencies
COPY --chown=node:node --from=builder /app/package.json ./package.json
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

# Expose standard application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start full-stack server
CMD ["node", "dist/server.cjs"]
