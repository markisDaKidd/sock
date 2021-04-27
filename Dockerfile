FROM node:alpine
WORKDIR /project
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","app.js"]