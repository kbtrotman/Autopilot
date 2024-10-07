FROM node:20

WORKDIR /code/
COPY package.json ./package.json
RUN npm install
COPY ./src ./src
COPY ./public ./public

EXPOSE 3000

CMD ["npm", "start"]