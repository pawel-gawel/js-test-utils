#!/usr/bin/env node

"use strict"

const fs = require('fs');
const path = require('path');
const commandName = process.argv[2];

var program = require('commander');
 
program
  .version('0.1.0')
  .description('Fake package manager')
  .command('install [name]', 'install one or more packages').alias('i')
  .command('search [query]', 'search with optional query').alias('s')  
  .command('create <name>', 'install one or more packages')  
  
  //.command('create <test-name>', 'create new test suit; use dashed convention, like: awesome-component')
  // .option('-t, --template <name>', 'Template')  
  // .action(function (command, testName, cmd) {
  //   runCommand(command)
  //   console.log('command: ' + command)
  //   console.log(testName, cmd.template)
  // })  

  .parse(process.argv);


if (!commandName) {
  console.error('Please provide command name');
  process.exit(1);
}

function runCommand(name) {
  const path = `../commands/${name}.js`;
  console.log(path)

  let command;
  try {
    command = require(path);
    command.run();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

