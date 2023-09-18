FROM node:alpine3.18

RUN addgroup trivia && adduser -S -G trivia trivia
USER trivia
WORKDIR /trivia
COPY . .


