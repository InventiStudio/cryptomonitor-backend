#!/bin/bash

FRESH=0
MIGRATE=0

PARAMS=(${RUN_PARAMS// / })
while [ ! ${#PARAMS[@]} -eq 0 ]
do
  case ${PARAMS[0]} in
    --fresh)
      FRESH=1
      ;;
    --migrate)
      MIGRATE=1
      ;;
  esac
  unset PARAMS[0]
  PARAMS=("${PARAMS[@]}")
done

if [[ $FRESH -eq 1 ]]; then
  yarn db:init
  yarn db:migrate:prod
  yarn db:seed:prod
fi

if [[ $MIGRATE -eq 1 ]]; then
  yarn db:migrate:prod
fi

yarn start
