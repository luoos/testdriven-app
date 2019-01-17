# TestDriven App

This is a project from [testdriven.io](https://testdriven.io/courses/microservices-with-docker-flask-and-react).

It contains many microservices.

## Services

### Users

#### Building and Running

```shell
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up

# combine the above two into one
docker-compose -f docker-compose-dev.yml up --build
```

Navigate to http://localhost:5001/users/ping, you should see the following JSON response:
```javascript
{
  "message": "pong!",
  "status": "success"
}
```