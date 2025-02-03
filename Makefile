# Read
# https://stackoverflow.com/questions/76238859/vscode-server-devtunnel-ms-access-tunnel-from-service-how-to-authenticate

PROJECT_WORKSPACE ?= ssp-project
PROJECT_NAME ?= control
DOCKER_COMPOSE := docker compose -p $(PROJECT_WORKSPACE) -f deploy/develop/docker-compose.yml
DOCKER_CONTAINER_IMAGE := ${PROJECT_WORKSPACE}/${PROJECT_NAME}

.PHONY: init
init: ## Init project dependencies
	@echo "Init project dependencies"
	# @npm run install --production=false
	@npm run i

.PHONY: fix
fix: ## Fix project lint
	@echo "Fix project lint"
	@npm run eslint-fix

.PHONY: build-docker-dev
build-docker-dev: ## Build project dev container
	@echo "Build project"
	docker build \
		-f deploy/develop/Dockerfile ./ \
		-t ${DOCKER_CONTAINER_IMAGE}

.PHONY: .build-docker-dev
.build-docker-dev: build-docker-dev

.PHONY: build
build: ## Build project
	@echo "Build project"
	@npm run eslint-fix
	@npm run build

.PHONY: build-docker
build-docker: ## Build docker the project
	docker build -f deploy/production/Dockerfile ./ -t ${DOCKER_CONTAINER_IMAGE}

.PHONY: gql-gen
gql-gen: ## Generate graphql types
	@echo "Generate graphql types"
	@DOTENV_CONFIG_PATH=./.env.development npm run gql-gen

.PHONY: run
run: ## Run project in dev mode
	@echo "Run project"
	@npm run dev

.PHONY: run-all
run-all: .build-docker-dev ## Run project in dev mode with all services
	@echo "Run project"
	@${DOCKER_COMPOSE} up control

.PHONY: run-prod
run-prod: ## Run project in dev mode
	@echo "Run project prod"
	@npm run start:dev

.PHONY: run-api-dev
run-api-dev-logs: ## Run API logs
	@${DOCKER_COMPOSE} logs -f api

.PHONY: stop
stop: ## Stop project
	@${DOCKER_COMPOSE} stop

.PHONY: reset-dev-env
reset-dev-env: ## Reset dev environment
	@${DOCKER_COMPOSE} down -v --rmi all

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
