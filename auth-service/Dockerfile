FROM node:16
WORKDIR /usr/src/auth-microservice
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3010
CMD [ "npm", "start" ]