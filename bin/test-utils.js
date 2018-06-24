#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

var program = require('commander');
 
program
  .version('0.1.0')
  .description('Javascript Test Utils') 
  .command('create <name>', 'bootstrap new test suit').alias('c')
  .parse(process.argv);
