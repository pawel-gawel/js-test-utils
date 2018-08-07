#!/bin/bash
envsDir="$(dirname $(realpath $0))/../env/"

usage() { 
  printf "\n\tUsage: test-run [-e environment] [-hvw] [glob...]\n
\tOptions:\n
\t-e\tenvironment
\t-v\tverbose
\t-w\twatch mode
\t-h\thelp\n\n" 1>&2; exit 1
}

# parsing options

while getopts "e:vhw" o; do
  case "${o}" in
    e)
      envName=$OPTARG
      ;;
    h)
      usage
      exit
      ;;
    w)
      args="${args} --watch --watch-extensions js,jsx"
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

if [ -z "${envName}" ]; then
  envName="react"
  printf "\nAssuming env to be ${envName}...";
fi
printf "\nLoading ${envName} env...";

glob=${@:-src/**/*-test.*}
args="${args} --require ${envsDir}${envName}.js"

./node_modules/.bin/mocha \
  $args \
  --require babel-polyfill \
  --require babel-register \
  --recursive $glob