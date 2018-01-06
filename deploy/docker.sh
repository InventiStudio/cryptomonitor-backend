#!/bin/bash

# Config
source deploy/config.env

# Parameters
WHERE="$1"
ACTION="$2"
PARAMS=${@:3}

# Helpers
RUN () {
  CMD="$1"
  if [[ $WHERE == 'local'  ]]; then eval $CMD; fi
  if [[ $WHERE == 'remote' ]]; then ssh $DEPLOY_HOST "cd $DEPLOY_SOURCE_DIR; $CMD"; fi
}

# Actions (default flow)
if [[ $ACTION == 'up' ]] || [[ $ACTION == 'stop' ]];   then RUN "docker rm -f ${DEPLOY_NAME}" ; fi
if [[ $ACTION == 'up' ]] || [[ $ACTION == 'remove' ]]; then RUN "docker rmi ${DEPLOY_NAME}" ; fi
if [[ $ACTION == 'up' ]] || [[ $ACTION == 'build' ]];  then RUN "eval $(cat deploy/config.env) RUN_PARAMS=$PARAMS docker-compose build" ; fi
if [[ $ACTION == 'up' ]] || [[ $ACTION == 'run' ]];    then RUN "eval $(cat deploy/config.env) RUN_PARAMS=$PARAMS docker-compose run --service-ports --name ${DEPLOY_NAME} -d web" ; fi

# Actions (additional)
if [[ $ACTION == 'logs' ]]; then RUN "eval $(cat deploy/config.env) docker logs ${DEPLOY_NAME}" ; fi
if [[ $ACTION == 'exec' ]]; then RUN "eval $(cat deploy/config.env) docker exec -it ${DEPLOY_NAME} sh" ; fi
if [[ $ACTION == 'psql' ]]; then RUN "eval $(cat deploy/config.env) docker exec -t postgres psql --username=postgres" ; fi
if [[ $ACTION == 'ps' ]];   then RUN "eval $(cat deploy/config.env) docker ps" ; fi
if [[ $ACTION == 'db:dump:plain' ]]; then RUN "eval $(cat deploy/config.env) mkdir -p ${DB_DUMP_DIR} && docker exec -t postgres pg_dump --username=postgres --format=p ${DB_NAME} > ${DB_DUMP_DIR}/${DB_DUMP_NAME}" ; fi
if [[ $ACTION == 'db:dump:custom' ]]; then RUN "eval $(cat deploy/config.env) mkdir -p ${DB_DUMP_DIR} && docker exec -t postgres pg_dump --username=postgres --format=c ${DB_NAME} > ${DB_DUMP_DIR}/${DB_DUMP_NAME}" ; fi
if [[ $ACTION == 'db:cat' ]]; then RUN "eval $(cat deploy/config.env) mkdir -p ${DB_DUMP_DIR} && docker exec -t postgres pg_dump --username=postgres ${DB_NAME}" ; fi
