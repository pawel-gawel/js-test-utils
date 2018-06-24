printf "\n\nGenerating...\n"

templatesDir="$(dirname $0)/../templates/"
baseTemplateName="base.js"
baseTemplatePath="${templatesDir}${baseTemplateName}"

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

sed -e "s/{DESCRIPTION}/${DESCRIPTION}/g" $baseTemplatePath | sed -e "s/{SPECIFICATION}/halo/g" > $testFileName

printf "\nFile ${testFileName} generated successfully!\n\n";