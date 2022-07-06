FROM node:16-alpine

WORKDIR /app-frontend

COPY ./package.json .

RUN npm i

COPY . .

VOLUME . .

CMD [ "npm", "start" ]

EXPOSE 3000