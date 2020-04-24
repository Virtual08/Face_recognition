## Building the Docker Container

```
$ docker build -f Dockerfile -t face-recognition-logic .
```

## Running the Docker Container

```
$ docker run -d -p 5000:5000 face-recognition-logic
```

The app is listening by default on port 5000. The 5000 port of the host machine is mapped to the port 5000 of the container.

-p 5000:5000 i.e.

``` -p <hostPort>:<containerPort>```

### Verifying that it works

Execute a POST on endpoint 

-> `localhost:5000/getEmbedding` or 

-> `<docker-machine ip>:5000/getEmbedding` Docker-machine ip has to be used if your OS doesn't provide native docker support. 
