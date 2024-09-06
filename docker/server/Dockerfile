ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env.development .env

RUN npm run build
