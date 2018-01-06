#!/bin/bash

# Config
source deploy/config.env

RED='\033[0;31m'
NC='\033[0m'

echo -e "Are you sure you want to do deploy ($RED$@$NC)?\c"
read -p " (y/N) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo

  # Silent fetch
  git remote update > /dev/null

  # Conditions
  if [[ $(git rev-parse --abbrev-ref HEAD) != $DEPLOY_BRANCH ]]; then >&2 echo "🚫  You are not on deployment branch (${DEPLOY_BRANCH})."; exit 1; fi
  if [[ $(git status -s) ]]; then >&2 echo "🚫  There cannot be uncommitted changes before deployment process."; exit 1; fi
  # TODO: This doesn't check if there are any more changes on origin
  # if [[ -z $(git status -uno | grep up-to-date) ]]; then >&2 echo "🚫  Your local branch is not up-to-date."; exit 1; fi

  # Sync
  rsync -azP --delete --filter=":- .dockerignore" . $DEPLOY_HOST:$DEPLOY_SOURCE_DIR

  # Deps remote
  ssh $DEPLOY_HOST "cd $DEPLOY_SOURCE_DIR; ./deploy/deps-remote.sh"

  # Actual deploy
  ssh $DEPLOY_HOST "cd $DEPLOY_SOURCE_DIR; ./deploy/docker.sh local up $@"

  # Clean up
  ssh $DEPLOY_HOST "docker-cleanup"

fi

