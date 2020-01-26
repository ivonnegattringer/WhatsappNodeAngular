FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
RUN npm install tsc -g
RUN npm run tsc websocket.ts

CMD node /usr/src/app/websocket.js