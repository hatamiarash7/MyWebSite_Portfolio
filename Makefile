.PHONY: install run build clean

install:
	bundle config set --local path vendor/bundle
	bundle config set --local build.ffi --enable-libffi-alloc
	bundle install

run:
	bundle exec jekyll serve --livereload --incremental --host 127.0.0.1 --port 4000

build:
	JEKYLL_ENV=production bundle exec jekyll build

clean:
	bundle exec jekyll clean
