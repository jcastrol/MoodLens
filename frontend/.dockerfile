# Usar imagen base de Node.js
FROM node:18-alpine AS base

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat

# Copiar solo los archivos necesarios del frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Construcción de la aplicación
FROM base AS builder
WORKDIR /app

# Copiar archivos del frontend
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

RUN npm run build

# Imagen final de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos generados solo del frontend
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]