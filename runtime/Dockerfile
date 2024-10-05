FROM node:18

WORKDIR /code/runtime
COPY package.json ./package.json
COPY ./src ./src
COPY ./public ./public
COPY ./node_modules ./node_modules
RUN npm install
EXPOSE 3000

RUN npm install n -g
RUN npm install -g npm@latest
RUN npm start