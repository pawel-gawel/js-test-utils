#!/bin/bash
set -x

glob=${@:-src/**/*-test.*}

./node_modules/.bin/mocha\
  --watch \
  --watch-extensions js,jsx \
  --recursive \
  --require babel-polyfill \
  --require babel-register \
  $glob