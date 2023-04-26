FROM node:18-alpine

WORKDIR /app
RUN chmod -R 777 ./

COPY ./package.json .

RUN apk add --no-cache git
RUN apk add --no-cache bash

RUN npm cache clean --force
RUN npm install

COPY . .

ARG api_url
ENV REACT_API_URL ${api_url}
RUN npm run build

RUN git clone https://github.com/vishnubob/wait-for-it.git

ARG port
EXPOSE ${port}
