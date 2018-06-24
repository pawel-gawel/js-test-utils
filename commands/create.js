const fs = require('fs');
const path = require('path');

console.log('this is my Create command');

module.exports = {
  run
}

function run() {
  console.log('running!');

  console.log(fs.readFileSync(path.resolve(__dirname, '../templates/base.js')).toString('utf-8'));

  console.log(path.resolve(__dirname, '../templates/base.js'));
}

