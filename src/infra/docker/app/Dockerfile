FROM node:alpine

WORKDIR /usr/dev

COPY package*.json ./
COPY .env ./

RUN npm install
RUN npm i ts-node-dev -g
COPY . .

CMD ["npm", "run", "dev"]