#!/bin/bash
envsDir="$(dirname $(realpath $0))/../env/"

usage() { 
  printf "\n\tUsage: test-run [-h] [-v] [-e environment] [glob...]\n
\tOptions:\n\n\t-h\thelp\n\t-v\tverbose\n\n" 1>&2; exit 1
}

# parsing options

while getopts "e:vh" o; do
  case "${o}" in
    e)
      envName=$OPTARG
      ;;
    h)
      usage
      exit
      ;;
    v)
      set -x
      ;;
    \?)
      usage
      ;;
  esac
done
shift $((OPTIND-1))

glob=${@:-src/**/*-test.*}
env=" --require ${envsDir}${envName}.js"

./node_modules/.bin/mocha \
  $env \
  --require babel-polyfill \
  --require babel-register \
  --recursive $glob