FROM node:18-alpine
# RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm rebuild bcrypt --build-from-source

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
