FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG OPENAI_API_KEY

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
