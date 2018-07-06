#!/bin/bash

#entrypoint="$(dirname $(realpath $0))/../test/index.js"

./node_modules/.bin/mocha --watch --watch-extensions js,jsx $@