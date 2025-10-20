FROM node:20-bullseye

WORKDIR /data

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "src/main.js"]
