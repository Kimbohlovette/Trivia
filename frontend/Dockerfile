FROM node:alpine3.18

RUN addgroup trivia && adduser -S -G trivia trivia
USER trivia
WORKDIR /trivia
COPY . .
RUN npm install
ENV API_URL=https://ip/api/v1/
EXPOSE 3000

CMD ["npm", "start"]


