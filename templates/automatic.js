import React from 'react';

import {
  expect,
  shallow,
  spy
} from '@automatic-labs/ui-test-utils';

import __DESCRIPTION__ from './__ORIGIN_FILENAME__';

describe('__DESCRIPTION__', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<__DESCRIPTION__ />);
  });

  it('should render', () => {
    expect(wrapper).to.have.length(1);
  });

  it('should be true', () => {
    expect(true).to.be.true;
  });

  it('should inspect component', () => {
    // const onClick = spy();
    // wrapper.setProps({ onClick });
    // wrapper.simulate('click');
    // expect(onClick.calledOnce).to.be.true;
  });

  afterEach(() => {

  });
});
