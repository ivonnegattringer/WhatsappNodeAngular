FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
RUN npm install tsc -g
RUN npm run tsc

CMD node /usr/src/app/dist/websocket.ts /usr/src/app/dist/server.ts