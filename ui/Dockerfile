FROM node:16
WORKDIR /usr/src/ui
COPY package*.json ./
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]