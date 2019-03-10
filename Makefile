REPO?=tsangbot
IMAGE=${REPO}/toyrobot

build:
	@make clean
	@yarn
	@yarn build

dev-test:
	@make clean
	@yarn
	@yarn test

docker-build:
	@docker build . -t ${IMAGE}:latest

docker-push:
	@docker push ${IMAGE}:latest

docker-pull:
	@docker pull ${IMAGE}:latest

docker-run:
	@docker run --rm -it ${IMAGE} /bin/ash

clean:
	@rm -fr dist/ node_modules/ doc/

