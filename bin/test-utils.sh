#!/bin/bash

printf "\n\t~=~ Welcome to test-utils ~=~\n"

usage() {
  printf "\n\tUsage: test-utils <command> [-h] [...params]\n
\tAvailable commands: gen\n\n" 1>&2;
  exit 1;
}

# parsing options

while getopts ":h" o; do
    case "${o}" in
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "$1" ]; then
  printf "\n\tNo command passed, quiting. Use -h for help.\n\n"
  exit 0
fi

cmd="$(dirname $0)/test-$1"

shift
$cmd $@
