FROM node:alpine

RUN npm install -g npm

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

CMD [ "npm", "run", "start-dev" ]
