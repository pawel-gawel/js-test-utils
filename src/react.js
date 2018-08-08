const chai = require('chai');
const enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const chaiEnzyme = require('chai-enzyme');

const { mount, shallow, render } = enzyme;

enzyme.configure({ adapter: new EnzymeAdapter() });
chai.use(chaiEnzyme());

module.exports = {
  mount,
  shallow,
  render,
};
