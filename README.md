# a2o-test

When you clone this repository, you need to have installed Docker and Docker Compose.

## How to run

### 1. Build docker images in the root directory

```bash
docker-compose build
```

### 2. Run docker containers

```bash
docker-compose up
```

### 3. Open http://localhost:5173 in your browser and enjoy!

## First problem

input example:
4 0
4 4
output example:
9

input example:
5 3
4 3
5 5
4 2
2 3
output example:
10

input example:
1 0
1 1
output example:
0

## Second problem

input example:
aaaaaa
output example:
12

input example:
abcabcddd
output example:
9
