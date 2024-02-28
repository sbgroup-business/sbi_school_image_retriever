FROM node:lts AS base

WORKDIR /usr/src/app

RUN corepack enable && yarn set version stable

COPY package.json yarn.lock .yarnrc.yml ./

FROM base AS dev

RUN yarn install

COPY . .

CMD ["node", "src/app"]

FROM base AS prod

RUN yarn install --production

COPY . .

CMD ["node", "src/app"]
