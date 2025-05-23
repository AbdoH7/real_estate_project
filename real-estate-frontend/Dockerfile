FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache \
  bash \
  curl

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# For development mode
# CMD ["npm", "run", "dev"]

CMD ["npm", "run", "start"]

