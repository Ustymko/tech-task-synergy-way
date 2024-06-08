FROM node:16-alpine

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY build/ /app/

RUN npm install
RUN npm install -g serve