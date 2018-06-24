const fs = require('fs');
const path = require('path');

const [ testName ] = process.argv.splice(3);

module.exports = {
  run
}

function run() {
  console.log('this is my Create command, running!');

  const replaces = new Map([
    [/{DESCRIPTION}/ig, 'ThisIsMyTest'],
    [/{SPECIFICATION}/ig, 'specify this'],
  ]);

  console.log(loadTemplate('base', replaces));
  console.log(getTestName());
  console.log(getTestDescription())
}

function getFileName(testName) {
  return testName;
}

function getTestDescription(testName) {
  return testName
    .split('-')
    .map(capitalize)
    .join('')
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}

function loadTemplate(name, replaces) {
  let output = fs.readFileSync(path.resolve(__dirname, `../templates/${name}.js`)).toString('utf-8');
    replaces.forEach((k, v) => {
      output = output.replace(v, k)
    });
  return output;
}



