dockerImageName = maze_generator:latest
localPort = 1234

run:
	docker run -it --rm --name maze -p ${localPort}:1234 ${dockerImageName}

build: 
	docker build --build-arg BUILD_DATE=$$(date -u +'%Y-%m-%dT%H:%M:%SZ') -t ${dockerImageName} .

clean:
	docker rmi ${dockerImageName}