PNPM ?= pnpm
DOCKER ?= docker
HOST ?= 127.0.0.1
PORT ?= 4321
IMAGE ?= hatamiarash7/portfolio
IMAGE_TAG ?= local

.DEFAULT_GOAL := help

##@ General

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} \
		/^[a-zA-Z0-9_-]+:.*##/ { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 } \
		/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Development

.PHONY: install
install: ## Install dependencies
	$(PNPM) install

.PHONY: dev
dev: ## Start the dev server on HOST:PORT
	$(PNPM) dev --host $(HOST) --port $(PORT)

.PHONY: build
build: ## Build the static site into dist/
	$(PNPM) build

.PHONY: preview
preview: ## Preview the production build locally
	$(PNPM) preview --host $(HOST) --port $(PORT)

##@ Quality

.PHONY: typecheck
typecheck: ## Check types and content schemas with astro check
	$(PNPM) check

.PHONY: format
format: ## Format files with Prettier
	$(PNPM) format

.PHONY: format-check
format-check: ## Check formatting with Prettier
	$(PNPM) format:check

.PHONY: check
check: typecheck format-check ## Run type and format checks

.PHONY: lighthouse
lighthouse: build ## Build, then run Lighthouse CI with the budgets in lighthouserc.json
	$(PNPM) dlx @lhci/cli@0.15 autorun --upload.target=filesystem --upload.outputDir=.lighthouseci/reports

##@ Docker

.PHONY: docker-build
docker-build: ## Build the nginx image as IMAGE:IMAGE_TAG
	$(DOCKER) build --platform linux/amd64 -t $(IMAGE):$(IMAGE_TAG) .

.PHONY: docker-run
docker-run: ## Serve IMAGE:IMAGE_TAG on http://127.0.0.1:8080
	$(DOCKER) run --rm -p 127.0.0.1:8080:8080 --read-only --tmpfs /tmp $(IMAGE):$(IMAGE_TAG)

##@ Cleanup

.PHONY: clean
clean: ## Remove build output and caches
	rm -rf dist .astro .lighthouseci
