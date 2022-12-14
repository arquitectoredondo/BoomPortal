import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmActionDialog, {
  ConfirmActionDialogProps,
} from './confirm-action-dialog';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

Enzyme.configure({ adapter: new Adapter() });

const initProps: ConfirmActionDialogProps = {
  open: true,
  onClose: jest.fn(),
  title: 'test title',
  description: 'test description',
  handleAction: jest.fn(),
  actionLabel: 'test label',
  descriptionIcon: faExclamationTriangle,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ConfirmActionDialog {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('ConfirmActionDialog', () => {
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

  it('should trigger action', () => {
    const { props, enzymeWrapper } = setup(initProps);

    const actionButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    actionButton.simulate('click');
    expect(props.handleAction.mock.calls.length).toBe(1);
  });

  it('should contain a title', () => {
    const { enzymeWrapper } = setup(initProps);

    const title: ShallowWrapper = enzymeWrapper.find(
      '.layout-dialog-title span'
    );
    expect(title.text()).toBe('test title');
  });

  it('should contain a action button with custom label', () => {
    const { enzymeWrapper } = setup(initProps);

    const actionButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    expect(actionButton.text()).toBe('test label');
  });

  it('should contain custom icon in the description', () => {
    const { enzymeWrapper } = setup(initProps);

    const icon: ShallowWrapper = enzymeWrapper.find(
      '.layout-dialog-body FontAwesomeIcon'
    );
    expect(icon.prop('icon')).toBe(faExclamationTriangle);
  });
});
