FROM node:8.11

WORKDIR /tmp
COPY package.json /tmp/
RUN npm i -g yarn
RUN yarn

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

EXPOSE 3000