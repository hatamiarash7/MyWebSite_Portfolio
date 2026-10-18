BUNDLE ?= bundle
HOST ?= 127.0.0.1
PORT ?= 4000

.DEFAULT_GOAL := help

##@ General

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} \
		/^[a-zA-Z0-9_-]+:.*##/ { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 } \
		/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Development

.PHONY: install
install: ## Configure Bundler and install dependencies
	$(BUNDLE) config set --local path vendor/bundle
	$(BUNDLE) config set --local build.ffi --enable-libffi-alloc
	$(BUNDLE) install

.PHONY: run
run: ## Serve the site with live reload and incremental builds
	$(BUNDLE) exec jekyll serve --livereload --incremental --host $(HOST) --port $(PORT)

.PHONY: build
build: ## Build the site for production
	JEKYLL_ENV=production $(BUNDLE) exec jekyll build

##@ Cleanup

.PHONY: clean
clean: ## Remove generated site output and Jekyll caches
	$(BUNDLE) exec jekyll clean
