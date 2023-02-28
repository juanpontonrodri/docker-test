FROM node:latest
WORKDIR /
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm install
EXPOSE 4200
RUN sleep 500