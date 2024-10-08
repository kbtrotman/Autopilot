FROM node:20.18.0-bullseye

RUN mkdir -p /code/runtime/
WORKDIR /code/runtime/
COPY package.json ./package.json
RUN npm install
COPY ./src ./src
COPY ./public ./public

EXPOSE 3000

CMD ["npm", "start"]