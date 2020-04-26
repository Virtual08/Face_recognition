## Building the Docker Container

```
$ docker build -f Dockerfile -t face-recognition-webapp .
```

## Running the Docker Container

```
$ docker run -d -p 8080:8080 -e FR_LOGIC_API_URL='http://172.17.0.2:5000' face-recognition-webapp
```

The app is listening by default on port 8080. The 8080 port of the host machine is mapped to the port 8080 of the container.

-p 8080:8080 i.e.

``` -p <hostPort>:<containerPort>```
