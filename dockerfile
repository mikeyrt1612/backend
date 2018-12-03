FROM node:8.11.1

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY /dist/server.bundle.js /app/server.bundle.js

EXPOSE 4000

CMD node ./server.bundle.js
