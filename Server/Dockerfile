FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install express -g
RUN npm install ws -g
COPY . .
EXPOSE 8080
RUN npm install tsc -g
RUN npm run tsc websocket.ts

CMD ["node", "websocket.js"]