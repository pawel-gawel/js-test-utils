#!/bin/bash

printf "\n\t~=~ Welcome to test-utils ~=~\n"

usage() {
  printf "\n\tUsage: test-utils <command> [-h] [-v] [...params]\n
\tAvailable commands: gen, watch\n\n" >&2; exit 1
}

# parsing options

while getopts ":hv" o; do
  case "${o}" in
    h)
      usage
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

if [ -z "$1" ]; then
  usage
fi

cmd="$(dirname $0)/test-$1"

shift
$cmd $@
