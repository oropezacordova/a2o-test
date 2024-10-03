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

input example:<br> 
4 0<br>
4 4<br>
output example:<br>
9<br>

input example:<br>
5 3<br>
4 3<br>
5 5<br>
4 2<br>
2 3<br>
output example:<br>
10<br>

input example:<br>
1 0<br>
1 1<br>
output example:<br>
0<br>

## Second problem

input example:<br>
aaaaaa<br>
output example:<br>
12<br>

input example:<br>
abcabcddd<br>
output example:<br>
9<br>
