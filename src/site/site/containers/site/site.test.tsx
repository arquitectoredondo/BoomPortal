import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Site } from './site';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Site {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Site root', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
});
