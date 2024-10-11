FROM node:20.18.0-bullseye

RUN mkdir -p /code/runtime/
RUN mkdir -p /code/runtime/node_modules/
WORKDIR /code/runtime/
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start"]