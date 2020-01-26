FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 2000
RUN npm install tsc -g
RUN npm run tsc

CMD node /usr/src/app/dist/server.js