# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S adanid -u 1001

# Copy build output and production dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder --chown=adanid:nodejs /app/dist ./dist

USER adanid

EXPOSE 3000

CMD ["node", "dist/index.js"]
