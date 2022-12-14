import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ConfirmDialog from './confirm-dialog';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  onClose: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<ConfirmDialog {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('ConfirmDialog', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should close on interaction', () => {
    const { props, enzymeWrapper } = setup(initProps);

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onClose.mock.calls.length).toBe(1);
  });

  it('should close on interaction', () => {
    const { props, enzymeWrapper } = setup(initProps);
    props.onClose.mockClear();

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    cancelButton.simulate('click');
    expect(props.onClose.mock.calls.length).toBe(1);
  });
});
