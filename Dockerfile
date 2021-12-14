FROM node AS builder

LABEL author "Phil Ashton"

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
ARG GH_TOKEN

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm install
RUN rm -f .npmrc
COPY . .
RUN npm run build

FROM node AS production
COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
EXPOSE 3000

CMD ["npx", "--yes", "serve", "-l", "3000"]
