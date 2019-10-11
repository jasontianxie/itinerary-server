FROM node:10.15.3
RUN mkdir -p /var/www/itinerary/
COPY . /var/www/itinerary/
LABEL maintainer="1986tianxie@sina.com"
WORKDIR /var/www/itinerary/
RUN npm install && node mysql.js
EXPOSE 3333