# TestDriven App

[![Build Status](https://travis-ci.org/luoos/testdriven-app.svg?branch=master)](https://travis-ci.org/luoos/testdriven-app)

This is a fullstack project from [testdriven.io](https://testdriven.io/courses/microservices-with-docker-flask-and-react).

#### Things used in this project:

**Front-end**: React, Javascript, npm, Jest, enzyme, Bulma

**Back-end**: Flask, Python, Shell, SQLAlchemy, Postgres, coverage, flake8

**Others**: Docker, Nginx, Travis CI

## Getting Started

This section introduces how to build, run and test this project.

### Building and Running

Local development mode:

```shell
# Build with docker-compose and run all service in background
$ docker-compose -f docker-compose-dev.yml up --build -d
```

Local production mode:

```shell
$ export REACT_APP_USERS_SERVICE_URL=http://localhost
$ docker-compose -f docker-compose-prod.yml up --build -d
```

Remote docker machine such as Amazon EC2

```shell
# Create docker machine
$ docker-machine create --driver amazonec2 testdriven-prod

# Export some environment variables
$ docker-machine env testdriven-prod
$ eval $(docker-machine env testdriven-prod)

# Set server IP for React client
# DOCKER_MACHINE_IP can get by (docker-machine ip testdriven-prod)
$ export REACT_APP_USERS_SERVICE_URL=http://<DOCKER_MACHINE_IP>
$ docker-compose -f docker-compose-prod.yml up -d --build
```

After building, we need to set up the database and fake some data:

```shell
# Below commands are for development mode, replace
# docker-compose-dev.yml with docker-compose-prod.yml if necessary

# Recreate database
$ docker-compose -f docker-compose-dev.yml exec users flask recreate-db

# Add some fake data to database
$ docker-compose -f docker-compose-dev.yml exec users flask seed-db 

# Run flask server test, make sure all test cases pass
$ docker-compose -f docker-compose-dev.yml exec users flask test

# Optional: Test with coverage
$ docker-compose -f docker-compose-dev.yml exec users flask test --coverage

# Run React client test, make sure all test cases pass
docker-compose -f docker-compose-dev.yml exec client npm test
```

Now, open http://localhost, you should see a page rendered by React.

## Services

### Users Flask Service

A back-end service provides RESTful APIs for React client. Powered by Flask and Postgres.

Way to interact with Postgres:

```SQL
$ docker-compose -f docker-compose-dev.yml exec users-db psql -U postgres

-- sample:
postgres=# \c users_dev -- connect to database
You are now connected to database "users_dev" as user "postgres".
users_dev=# \dt
              List of relations
 Schema |      Name       | Type  |  Owner
--------+-----------------+-------+----------
 public | alembic_version | table | postgres
 public | users           | table | postgres
(2 rows)
users_dev=# select * from users;
```

### Nginx

Serves as a reverse proxy.

### React Client

An single page web application.