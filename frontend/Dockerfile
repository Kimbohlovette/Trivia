FROM node:18.18-alpine3.18

# RUN addgroup trivia && adduser -S -G trivia trivia
# USER trivia
WORKDIR /trivia

COPY package*.json .
RUN npm install
COPY . .

ENV API_URL=http://0.0.0.0:8080/
EXPOSE 3000

CMD ["npm", "start"]


