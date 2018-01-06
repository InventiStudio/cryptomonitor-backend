FROM mhart/alpine-node:8

RUN apk add --update curl
RUN apk add --update bash
RUN apk add --update postgresql-client

RUN mkdir /app
WORKDIR /app

ARG DEPLOY_PORT
ENV DEPLOY_PORT $DEPLOY_PORT

ARG RUN_PARAMS
ENV RUN_PARAMS $RUN_PARAMS

COPY . /app

RUN yarn
RUN yarn build

EXPOSE ${DEPLOY_PORT}

CMD ["./deploy/wait-for-it.sh", "postgres:5432", "--", "./deploy/docker-run.sh"]
