const fs = require('fs');
const path = require('path');

console.log('this is my Create command');

module.exports = {
  run
}

function run() {
  console.log('running!');

  const output = fs.readFileSync(path.resolve(__dirname, '../templates/base.js'))
    .toString('utf-8')
    .replace(/{DESCRIPTION}/ig, 'ThisIsMyTest')
    .replace(/{SPECIFICATION}/ig, 'specify this')
  console.log(output)

  console.log(path.resolve(__dirname, '../templates/base.js'));
}

