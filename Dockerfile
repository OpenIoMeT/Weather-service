FROM node:latest
COPY ./ /opt/app/
WORKDIR /opt/app
RUN npm install
CMD node /opt/app/sample.js 
