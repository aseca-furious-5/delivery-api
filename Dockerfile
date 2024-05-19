# Install dependencies
FROM node:20 AS dev

WORKDIR /app

COPY . .

RUN npm ci

ENTRYPOINT ["npm", "run", "start:dev"]