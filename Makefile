all: yarn-init build-js

yarn-init:
	yarn --cwd site

watch-js:
	yarn --cwd site dev

build-js:
	cd site \
	yarn --cwd site docs:build