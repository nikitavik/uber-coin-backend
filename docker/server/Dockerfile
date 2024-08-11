ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY ../../package*.json ./

RUN npm ci

COPY . .

RUN npm run build

