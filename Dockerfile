FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN npm install --production --frozen-lockfile

EXPOSE 3000

CMD ["npm", "start"]
