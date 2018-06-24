#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const commandName = process.argv[2];

if (!commandName) {
  console.error('Please provice command name');
  process.exit(1);
}

const commandPath = '../commands/create.js';
if (fs.existsSync(commandPath)) {
  console.error('Command does not exist');
  process.exit(1);
}

command = require(commandPath);
command.run();


fs.readFileSync(path.resolve(__dirname, '../templates/base.js'));
