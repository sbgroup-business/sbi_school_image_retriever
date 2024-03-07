FROM node:lts AS base

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./

FROM base AS dev

RUN pnpm install

COPY . .

CMD ["node", "src/app"]

FROM base AS prod

RUN pnpm install

COPY . .

CMD ["node", "src/app"]
