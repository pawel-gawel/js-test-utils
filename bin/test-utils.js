#!/usr/bin/env node

"use strict"

const fs = require('fs');
const path = require('path');
const commandName = process.argv[2];

if (!commandName) {
  console.error('Please provide command name');
  process.exit(1);
}

const commandPath = `../commands/${commandName}.js`;
console.log(commandPath)

try {
  const command = require(commandPath);
  command.run();
} catch (e) {
  console.error('Command does not exist');
  process.exit(1);
}



// console.log(fs.readFileSync(path.resolve(__dirname, '../templates/base.js')).toString('utf-8'));
