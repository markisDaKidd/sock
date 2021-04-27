FROM node:alpine
WORKDIR /project
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","app.js"]