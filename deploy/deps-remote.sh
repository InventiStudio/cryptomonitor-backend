#!/bin/bash

sudo true

if ! type "docker" > /dev/null; then
  echo 'Installing docker...'
  wget -qO- https://get.docker.com/ | sh
fi

if ! type "docker-compose" > /dev/null; then
  echo 'Installing docker-compose...'
  COMPOSE_VERSION=`git ls-remote https://github.com/docker/compose | grep refs/tags | grep -oP "[0-9]+\.[0-9][0-9]+\.[0-9]+$" | tail -n 1`
  sudo sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
  sudo chmod +x /usr/local/bin/docker-compose
  sudo sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"
fi

if ! type "docker-cleanup" > /dev/null; then
  echo 'Installing docker-cleanup...'
  cd /tmp
  git clone https://gist.github.com/76b450a0c986e576e98b.git
  cd 76b450a0c986e576e98b
  sudo mv docker-cleanup /usr/local/bin/docker-cleanup
  sudo chmod +x /usr/local/bin/docker-cleanup
fi
