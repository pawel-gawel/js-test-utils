const fs = require('fs');
const path = require('path');

const [ testName ] = process.argv.splice(3);
const defaultExt = 'js';

module.exports = {
  run
}

function run() {
  console.log('this is my Create command, running!');

  const replaces = new Map([
    [/{DESCRIPTION}/ig, 'ThisIsMyTest'],
    [/{SPECIFICATION}/ig, 'specify this'],
  ]);

  loadTemplate('base', replaces);
  console.log(getFileName(testName));
  getTestDescription(testName);
  console.log(getFileExtension(testName))
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

function getFileExtension(testName) {
  return fs.readdirSync(process.cwd())
    .filter(entry => entry.startsWith(testName))
    .map(entry => entry.split('.')[1])
    .pop() || defaultExt;
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



