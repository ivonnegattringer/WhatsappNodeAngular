FROM node:10.16.3

WORKDIR /usr/src/app

#COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npm install tsc -g
RUN tsc server.ts

CMD ["node", "server.js"]