FROM node:18.16-alpine as builder

WORKDIR /usr/share/notification-svc
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
COPY . .

FROM node:18.16-alpine
COPY --from=builder /usr/share/notification-svc/node_modules ./node_modules/
COPY --from=builder /usr/share/notification-svc/package*.json ./
COPY --from=builder /usr/share/notification-svc/dist ./dist/
COPY --from=builder /usr/share/notification-svc/tsconfig.build.json ./
COPY --from=builder /usr/share/notification-svc/tsconfig.json ./
COPY --from=builder /usr/share/notification-svc/prisma ./prisma/

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["npm", "run", "start"]