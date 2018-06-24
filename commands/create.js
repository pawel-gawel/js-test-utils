const fs = require('fs');
const path = require('path');

console.log('this is my Create command');

module.exports = {
  run
}

function run() {
  console.log('running!');

  const replaces = new Map([
    [/{DESCRIPTION}/ig, 'ThisIsMyTest'],
    [/{SPECIFICATION}/ig, 'specify this'],
  ])

  loadTemplate('base', replaces);

  console.log(path.resolve(__dirname, '../templates/base.js'));
}

function loadTemplate(name, replaces) {
  let output = fs.readFileSync(path.resolve(__dirname, `../templates/${name}.js`)).toString('utf-8');
    replaces.forEach((k, v) => {
      output = output.replace(v, k)
    });
  console.log(output)

}

