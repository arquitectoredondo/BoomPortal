import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorAlert from './error-alert';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  children: [],
  loading: false,
  error: false,
  content: {},
  empty: false
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<ErrorAlert {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ErrorAlert', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
});
