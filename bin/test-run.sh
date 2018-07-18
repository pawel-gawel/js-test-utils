#!/bin/bash

usage() { 
  printf "\n\tUsage: test-run [-h] [-v] [glob...]\n
\tOptions:\n\n\t-h\thelp\n\t-v\tverbose\n\n" 1>&2; exit 1
}

# parsing options

while getopts ":vh" o; do
  case "${o}" in
    h)
      usage
      exit
      ;;
    v)
      set -x
      ;;
    \?)
      printf "\n\tInvalid option: -$OPTARG\n\n" >&2; usage
      ;;
  esac
done

shift $((OPTIND-1))

glob=${@:-src/**/*-test.*}

./node_modules/.bin/mocha\
  --recursive \
  --require babel-polyfill \
  --require babel-register \
  $glob