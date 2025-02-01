# Read
# https://stackoverflow.com/questions/76238859/vscode-server-devtunnel-ms-access-tunnel-from-service-how-to-authenticate

BUILD_TARGET  ?= adnet/control:latest

.PHONY: init
init: ## Init project dependencies
	@echo "Init project dependencies"
	# @npm run install --production=false
	@npm run i

.PHONY: fix
fix: ## Fix project lint
	@echo "Fix project lint"
	@npm run eslint-fix

.PHONY: run
run: ## Run project in dev mode
	@echo "Run project"
	@npm run dev

.PHONY: run-prod
run-prod: ## Run project in dev mode
	@echo "Run project prod"
	@npm run start:dev

.PHONY: build
build: ## Build project
	@echo "Build project"
	@npm run eslint-fix
	@npm run build

.PHONY: build-docker
build-docker: ## Build docker the project
	docker build -f deploy/production/Dockerfile ./ -t ${BUILD_TARGET}

.PHONY: gql-gen
gql-gen: ## Generate graphql types
	@echo "Generate graphql types"
	@DOTENV_CONFIG_PATH=./.env.development npm run gql-gen

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
