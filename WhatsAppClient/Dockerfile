FROM node:12.7-alpine as build
WORKDIR /usr/src/nginx


COPY ./package*.json ./
RUN npm install 

COPY . /usr/src/nginx

RUN npm install -g @angular/cli
RUN ng build --prod

FROM nginx:stable

#COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=root:nginx /usr/src/nginx/dist/WhatsAppClient /usr/share/nginx/html

#RUN chown root:nginx usr usr/share usr/share/nginx usr/share/nginx/html

#FROM nginx:stable

#COPY ./default.conf /etc/nginx/conf.d/default.conf
#COPY ./dist/WhatsAppClient /usr/share/nginx/html