DOCKER_USERNAME := magicq6265
APP_NAME := restaurant-service-server
STACK_NAME := Restaurant-dev
GIT_SHA := ${shell git rev-parse --short HEAD}
IMAGE := ${DOCKER_USERNAME}/${APP_NAME}:${GIT_SHA}
AWS_ACCOUNT := 418329235064
ECR_NAME := Restaurant-Serverless-dev
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

# aws-create-stack:
# 	@echo "Creating aws cloudFormation stack"
# 	aws cloudformation create-stack \
# 	--template-body file://cloudformation/user.yaml \
# 	--stack-name ${STACK_NAME} \
# 	--profile default \
# 	--parameters  ParameterKey=GITSHA,ParameterValue=${GIT_SHA} \
# 	--capabilities CAPABILITY_IAM
# deploy 는 create-stack 과 update-stack 을 합친것이라고 보면 되는듯.
aws-deploy:
	@echo "Deploying aws cloudFormation"
	aws cloudformation deploy --template-file file://cloudformation/user.yaml --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM
aws-update:
	@echo "Updating aws cloudFormation"
	aws cloudformation update-stack \
	--template-body file://cloudformation/user.yaml \
	--stack-name ${STACK_NAME}  \
	--parameters  ParameterKey=GITSHA,ParameterValue=${GIT_SHA} \
	--profile default \
	--capabilities CAPABILITY_IAM
aws-lambda-update:
	@echo "Updating aws lambda cloudFormation"
	make build-lambda
	make ecr-push
	make aws-update

aws-createStack-withLambda:
	@echo build docker image, push to ecr and then create aws cloudFormation stack
	make build-lambda
	make ecr-push
	make aws-create-stack


# aws-delete:
# 	@echo "Deleting aws cloudFormation"
# 	aws cloudformation delete-stack --stack-name ${STACK_NAME}  --profile default


# ------------------------------------------------------------------------------------------------------------

aws-create-stack:
	@echo "Creating aws cloudFormation stack"
	cd ./cloudformation/db; \
	serverless deploy

serverless-deploy:
	@echo "deploy lambda function"
	cd ./src/services/user; \
	serverless deploy

serverless-update:
	@echo "deploy updated lambda function"
	cd ./src/services/user; \
	serverless deploy function --function SignIn

aws-setup-deploy:
	@echo "set up stack and deploy function"
	make aws-create-stack
	make serverless-deploy
	
serverless-delete:
	@echo "Deleting aws cloudFormation"
	aws cloudformation delete-stack --stack-name ${STACK_NAME}  --profile default

.PHONY: build-and-test build test push