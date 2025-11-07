FROM node:24.11.0-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY .env.docker ./.env
COPY .env.docker ./.env.local

RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN chmod +x scripts/setup-db.sh && ./scripts/setup-db.sh

RUN pnpm build

FROM node:24.11.0-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.env.local ./.env.local

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["pnpm", "start"]
