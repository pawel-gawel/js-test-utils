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
    [/{DESCRIPTION}/ig, getTestDescription(testName)],
    [/{SPECIFICATION}/ig, 'specify this'],
  ]);
  
  saveTestFile(
    getFileName(testName),
    loadTemplate('base', replaces)
  );
}

function getTestDescription(testName) {
  return testName
    .split('-')
    .map(capitalize)
    .join('')
}

function saveTestFile(filename, contents) {
  fs.writeFileSync(filename, contents);
}

function getFileName(testName) {
  const ext = getFileExtension(testName);
  return testName.concat('-test.'.concat(ext));
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



