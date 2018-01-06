#!/bin/bash

databases=( cryptomonitor_development cryptomonitor_test cryptomonitor_production )

for i in "${databases[@]}"
do
  psql --command "DROP DATABASE IF EXISTS $i"
  psql --command "CREATE DATABASE $i;"
  psql --dbname=$i --command "CREATE EXTENSION \"uuid-ossp\";"
done


