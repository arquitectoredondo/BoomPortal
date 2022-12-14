import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WidgetButton from './widget-button';
import { faClone } from '@fortawesome/free-solid-svg-icons';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  title: 'title',
  icon: faClone,
  onClick: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<WidgetButton {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('WidgetButton', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should emit click event when button clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const button: any = enzymeWrapper.find('.widget-button');
    button.simulate('click');
    expect(props.onClick.mock.calls.length).toBe(1);
  });
  
});
