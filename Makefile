DOCKER_USERNAME := magicq6265
APP_NAME := restaurant-service-server
GIT_SHA := ${shell git rev-parse --short HEAD}
IMAGE := ${DOCKER_USERNAME}/${APP_NAME}:${GIT_SHA}
AWS_ACCOUNT := 418329235064
ECR_NAME := restaurant-test
ECR_IMAGE := ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/${ECR_NAME}:${GIT_SHA}

build-and-test: build test

build:
	@echo "Building restaurant-service-server image"
	docker build --tag ${IMAGE} .
build-lambda:
	@echo "Building restaurant-service-server lambda image"
	docker build --tag ${IMAGE} --tag ${ECR_IMAGE} -f Dockerfile.lambda .
test:
	@echo "Testing restaurant-service-server app.."
	docker run --rm ${IMAGE} npm run test

push:
	@echo "Publishing image to Docker Hub repository"
	docker push ${IMAGE}

ecr-push:
	@echo "Publishing image to Docker Hub repository"
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com
	docker push ${ECR_IMAGE}

aws-create-stack:
	@echo "Creating aws cloudFormation stack"
	aws cloudformation create-stack --template-body file://cloudformation/user.yaml --stack-name cloudFormation-userStack-dev --profile default --capabilities CAPABILITY_IAM

aws-deploy:
	@echo "Deploying aws cloudFormation"
	aws cloudformation deploy --template-file file://cloudformation/user.yaml --stack-name cloudFormation-userStack-dev --capabilities CAPABILITY_IAM
aws-update:
	@echo "Updating aws cloudFormation"
	aws cloudformation update-stack --template-body file://cloudformation/user.yaml --stack-name cloudFormation-userStack-dev  --profile default --capabilities CAPABILITY_IAM
aws-lambda-update:
	@echo "Updating aws lambda cloudFormation"
	make build-lambda
	make ecr-push
	make aws-update
aws-delete:
	@echo "Updating aws cloudFormation"
	aws cloudformation delete-stack --stack-name cloudFormation-userStack-dev  --profile default

.PHONY: build-and-test build test push