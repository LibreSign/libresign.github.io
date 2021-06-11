all: yarn-init build-js

yarn-init:
	yarn

build-js:
	yarn dev

watch-js:
	yarn watch