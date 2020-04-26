## Building the Docker Container

```
$ docker build -f Dockerfile -t face-recognition-frontend .
```

## Running the Docker Container

```
$ docker run -d -p 80:80 face-recognition-frontend
```

The app is listening by default on port 80. The 80 port of the host machine is mapped to the port 80 of the container.

-p 80:80 i.e.

``` -p <hostPort>:<containerPort>```

