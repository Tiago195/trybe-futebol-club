FROM node:16-alpine

WORKDIR /app-backend
#  ...

COPY ./package.json .

RUN npm i

COPY . .

VOLUME . .

CMD [ "npm", "run", "dev" ]

EXPOSE 3001