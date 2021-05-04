FROM node:alpine
WORKDIR /project
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000 27017
CMD ["node","app.js"]