#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z users-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

echo "Waiting for deloyment"

flask deploy
if [ $? -ne 0 ]; then
  echo "Deploy command failed, exit..."
  exit 1
fi

echo "Deployed successfully"

exec gunicorn -b 0.0.0.0:5000 main:app