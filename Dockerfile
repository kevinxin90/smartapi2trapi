FROM node:15-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT [ "node", "src/server.js" ]

CMD ["27a5b60716c3a401f2c021a5b718c5b1"]
