#!/bin/bash

templatesDir="$(dirname $(realpath $0))/../templates/"
baseTemplateName="base.js"
overwrite=false

usage() { 
  printf "\n\tUsage: test-gen [-t <template path>] test-name\n
\tIf there is a file in current directory matching the name,
\tnewly created test file will have the same extension.\n\n" 1>&2; exit 1
}

# parsing options

while getopts ":t:hfv" o; do
  case "${o}" in
    t)
      templateName=${OPTARG}
      ;;
    h)
      usage
      ;;
    f)
      overwrite=true
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

# do we have test name passed to the script?

if [ $# -ne 1 ]; then
  usage
fi

# verify if we have template

templatePath="${templatesDir}${templateName:=$baseTemplateName}"
if [ ! -f $templatePath ]; then
  templatePath="${templatePath}.js"
  if [ ! -f $templatePath ]; then
    echo "Could not find template ${templateName}" >&2; exit 1
  fi
fi

printf "\n\tGenerating...\n"

# getting test name

testName="default-test-name"
if [ -n $1 ]; then
  testName="$1"
fi

# resolve test file name; 
# check if there is a file with name provided and borrow its extension

ext="js"
existingFile=$(ls | grep ${testName}\.)

if [ -e "$existingFile" ]; then
  parts=($(echo ${existingFile} | tr '.' ' '))
  ext=${parts[1]}
fi

testFileName="${testName}-test.${ext}"

# check if file already exists

if [ -f "$testFileName" ] && [ "$overwrite" != "true" ]; then
  printf "\n\tFile $testFileName already exists. If you want to overwrite it, use -f option\n\n" >&2; exit 1
fi

testName=$(basename $testName)
testPath=$(dirname $testFileName)

# go from aaa-bbb-ccc to AaaBbbCcc

for i in $(echo ${testName} | tr '-' ' '); do
  B=`echo -n "${i:0:1}" | tr "[:lower:]" "[:upper:]"`; 
  DESCRIPTION="$DESCRIPTION${B}${i:1}";
done

# generate file with placeholder replacement

if [ -n "$testPath" ]; then
  mkdir -p $testPath
fi
sed -e "s/__DESCRIPTION__/${DESCRIPTION}/g" $templatePath | sed -e "s/__SPECIFICATION__/halo/g" > $testFileName

printf "\n\tFile ${testFileName} generated successfully!\n\n";
