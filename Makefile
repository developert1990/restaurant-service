DOCKER_USERNAME := magicq6265
APP_NAME := restaurant-service-server
GIT_SHA := ${shell git rev-parse --short HEAD}
IMAGE := ${DOCKER_USERNAME}/${APP_NAME}:${GIT_SHA}

build-and-test: build test

build:
	@echo "Building restaurant-service-server image"
	docker build --tag ${IMAGE} .

test:
	@echo "Testing restaurant-service-server app.."
	docker run --rm ${IMAGE} npm start

push:
	@echo "Publishing image to Docker Hub repository"
	docker push ${IMAGE}

.PHONY: build-and-test build test push