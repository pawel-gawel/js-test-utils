const fs = require('fs');
const path = require('path');
const program = require('commander');

program
  .usage('[options] <testName>')
  .option('-t, --template [name]', 'Specify template [name]', 'base')
  .parse(process.argv);

console.log(Object.keys(program), program.template)

const testName = process.argv.pop();
const defaultExt = 'js';

module.exports = {
  run
}

function run() {
  const description = getdescription(testName);
  const specification = 'specify this';
  const fileName = getFileName(testName);

  const replaces = new Map([
    [/{DESCRIPTION}/ig, description],
    [/{SPECIFICATION}/ig, specification],
  ]);

  writeFile(fileName, loadTemplate('base', replaces));

  console.log(`\n\nFile ${fileName} saved!\n`);
}

function getdescription(testName) {
  return testName
    .split('-')
    .map(capitalize)
    .join('')
}

function writeFile(filename, fileContents) {
  fs.writeFileSync(filename, fileContents);
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
  let output;
  try {
    output = fs.readFileSync(path.resolve(__dirname, `../templates/${name}.js`)).toString('utf-8');
  } catch (e) {
    throw Error(`Could not find ${name} template`);
  }
  
  replaces.forEach((k, v) => {
    output = output.replace(v, k)
  });
  return output;
}
