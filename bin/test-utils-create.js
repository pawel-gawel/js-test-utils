#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');

const defaultExt = 'js';

program
  .usage('[options] <testName>')
  .option('-t, --template [name]', 'Specify template [name]', 'base')
  .parse(process.argv);

run(program.args.pop(), program.template);

function run(testName, template) {
  const description = getdescription(testName);
  const specification = 'specify this';
  const originFileName = getOriginFileName(testName);
  const outputFileName = getOutputFileName(originFileName);

  const replaces = new Map([
    [/__DESCRIPTION__/ig, description],
    [/__SPECIFICATION__/ig, specification],
    [/__ORIGIN_FILENAME__/ig, originFileName]
  ]);

  writeFile(outputFileName, loadTemplate(template, replaces));

  console.log(`\n\nFile ${outputFileName} saved!\n`);
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

function getOriginFileName(testName) {
  const ext = getFileExtension(testName);
  return testName.concat('.').concat(ext);
}

function getOutputFileName(origin) {
  const [ name, ext ] = origin.split('.');
  return name.concat('-test.').concat(ext);
}

function getFileExtension(testName) {
  return fs.readdirSync(process.cwd())
    .filter(entry => entry.startsWith(testName.concat('.')))
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
