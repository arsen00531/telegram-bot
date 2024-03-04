FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node", "./dist/rpsServer/src/index.js"]