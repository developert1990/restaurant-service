FROM node:alpine
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY . ./
EXPOSE 7707
CMD ["npm","run", "start"]