#!/bin/bash

entrypoint="$(dirname $(realpath $0))/../index.js"

./node_modules/.bin/mocha --watch --watch-extensions js,jsx $entrypoint $@