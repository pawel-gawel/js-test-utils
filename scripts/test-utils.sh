echo "welcome to test-utils"

if [ -z "$1" ]; then
  printf "\nno command passed, quiting\n\n"
  exit 0
fi

cmd="$(dirname $0)/$1.sh"

shift
$cmd $@
