Node app to count down to zero over a specified period of time.

Prometheus metrics are output via the `/metrics` endpoint


## Setup

Set the environment variable:
`NUM_SECONDS` to be the number of seconds to count down from.

Quick conversion:
| Duration | Seconds Value |
| -------- | ------------- |
| 1 hr | 3600 |
| 1 d | 86400 |
| 1 w | 604800 |



## Local Docker
To run docker container locally, first build it:
```
docker build -t prom-countdown .
```
run it:
```
docker run \
--env NUM_SECONDS=60 \
-p 8080:8080 \
-d prom-countdown
```

visit `localhost:8080/metrics`