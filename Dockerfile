FROM node:17-alpine3.14 AS builder

LABEL author "Phil Ashton"

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:17-alpine3.14 AS production
COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
EXPOSE 3000

CMD ["npx", "--yes", "serve", "-l", "3000"]
