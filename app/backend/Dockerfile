FROM node:16-alpine

WORKDIR /app-backend

COPY package.json ./

RUN npm i

COPY . ./

CMD [ "npm", "run", "dev" ]