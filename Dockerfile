FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "src/server.js" ]

CMD ["27a5b60716c3a401f2c021a5b718c5b1"]
