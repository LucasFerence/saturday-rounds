# Reference: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN ls -a

RUN npm install
RUN npm run compile

EXPOSE 5050

ENV NODE_PATH=./build
CMD [ "node", "build/src/index.js" ]