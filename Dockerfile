FROM node:18-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install --frozen-lockfile && pnpm build

FROM node:18-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main"]
