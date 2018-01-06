## Setup
#### Requirements
- [NodeJS](https://nodejs.org), *>= 8.0.0*

```bash
# Clone repo and install deps
$ git clone git@github.com:InventiStudio/cryptomonitor-backend.git
$ cd cryptomonitor-backend
$ yarn
```

```bash
# Run postgres & create database
$ yarn db db:init # set db name in config/sequelize.json, tasks/db-init.sh and bitbucket-pipelines.yml
$ yarn db db:migrate:all && yarn db db:seed:all
```

```bash
# Run local server
$ yarn dev
$ open http://localhost:4000
```
