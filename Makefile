install:
	bundle config build.ffi --enable-libffi-alloc
	bundle install

run:
	bundle exec jekyll serve --livereload

.PHONY: install run