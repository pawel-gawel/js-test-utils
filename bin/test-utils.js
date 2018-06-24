#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
var program = require('commander');
const pkg = require('../package.json');
 
program
  .version(pkg.version)
  .description('Javascript Test Utils') 
  .command('create <name>', 'bootstrap new test suit').alias('c')
  .parse(process.argv);
