import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreationDialog from './creation-dialog';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  title: 'title',
  label: 'label',
  onCloseDialog: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<CreationDialog {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('DatabaseCreation', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should disable save if name not filled', () => {
    const { props, enzymeWrapper } = setup(initProps);
    const saveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    expect(saveButton.prop('disabled')).toBe(true);
    const nameInput: ShallowWrapper = enzymeWrapper.find('#field-label');
    nameInput.simulate('change', { target: { value: 'name' } });
    const saveButton2: ShallowWrapper = enzymeWrapper.find('#save-button');
    expect(saveButton2.prop('disabled')).toBe(false);
    saveButton2.simulate('click', 'name');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });
  
  it('cancel button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });

  it('close dialog should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('#dialog-creation');
    dialog.simulate('close');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });

  it('close button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#close-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });
});
