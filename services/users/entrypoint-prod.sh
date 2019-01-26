#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z users-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

echo "Waiting for deloyment"

while true; do
  flask deploy
  if [[ "$?" == "0" ]]; then
    break
  fi
  echo "Deploy command failed, retrying in 5 secs..."
  sleep 5
done

echo "Deployed successfully"

exec gunicorn -b 0.0.0.0:5000 main:app