#!/bin/bash

templatesDir="$(dirname $(realpath $0))/../templates/"
baseTemplateName="base.js"

usage() { 
  printf "\nUsage: test-gen [-t <template path>] test-name\n
If there is a file in current directory matching the name,
newly created test file will have the same extension.\n\n" 1>&2; 
  exit 1;
}

# parsing options

while getopts ":t:h" o; do
    case "${o}" in
        t)
            templateName=${OPTARG}
            ;;
        h)
            usage
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
        :)
          echo "Option -$OPTARG requires an argument." >&2
          exit 1
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
    echo "Could not find template ${templateName}" >&2; exit 1;
  fi
fi

printf "\nGenerating...\n"

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

# go from aaa-bbb-ccc to AaaBbbCcc

for i in $(echo ${testName} | tr '-' ' '); do
  B=`echo -n "${i:0:1}" | tr "[:lower:]" "[:upper:]"`; 
  DESCRIPTION="$DESCRIPTION${B}${i:1}";
done

# generate file with placeholder replacement

sed -e "s/__DESCRIPTION__/${DESCRIPTION}/g" $templatePath | sed -e "s/__SPECIFICATION__/halo/g" > $testFileName

printf "\nFile ${testFileName} generated successfully!\n\n";