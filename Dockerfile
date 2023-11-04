FROM node:lts AS  base

WORKDIR /usr/src/app

COPY package*.json ./


FROM base AS dev

RUN yarn install && yarn cache clean

COPY . .

CMD ["node", "src/app"]

FROM base AS prod

RUN yarn install --production && yarn cache clean

COPY . .

CMD ["node", "src/app"]
