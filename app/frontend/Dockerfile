FROM node:16-alpine

WORKDIR /app-frontend

COPY package.json ./

RUN npm i

COPY . ./

CMD [ "npm", "start" ]