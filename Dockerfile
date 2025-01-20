#import base image
FROM node:16-alpine

#create a working direcory
WORKDIR /app

#copy package files
COPY package*.json ./

#intall dependencies
RUN npm install --production

#copy other files
COPY . .

#expose port
EXPOSE 5002

#run the app
CMD [ "npm", "start" ]