import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatusBar, { StatusBarProps } from './status-bar';

Enzyme.configure({ adapter: new Adapter() });

const initProps: StatusBarProps = {
  openPublishState: false,
  setOpenPublishState: jest.fn(),
  openRevertState: false,
  setOpenRevertState: jest.fn(),
  openRevertDialog: false,
  openBlocked: false,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<StatusBar {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('StatusBar', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should have all the messages hidden', () => {
    const { enzymeWrapper } = setup(initProps);

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    expect(snackbars.at(0).prop('open')).toBe(false);
    expect(snackbars.at(1).prop('open')).toBe(false);
    expect(snackbars.at(2).prop('open')).toBe(false);
  });

  it('should render published message', () => {
    const { enzymeWrapper } = setup({ ...initProps, openPublishState: true });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    expect(snackbars.at(0).prop('open')).toBe(true);
    expect(snackbars.at(0).childAt(0).prop('severity')).toBe('success');
  });

  it('should render reverted message', () => {
    const { enzymeWrapper } = setup({ ...initProps, openRevertState: true });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    expect(snackbars.at(1).prop('open')).toBe(true);
    expect(snackbars.at(1).childAt(0).prop('severity')).toBe('error');
  });

  it('should render blocked message', () => {
    const { enzymeWrapper } = setup({ ...initProps, openBlocked: true });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    expect(snackbars.at(2).prop('open')).toBe(true);
    expect(snackbars.at(2).childAt(0).prop('severity')).toBe('info');
  });

  it('should render a custom classname', () => {
    const { enzymeWrapper } = setup({ ...initProps, openRevertDialog: true });

    const snackbar: ShallowWrapper = enzymeWrapper.find('.dialog-open');
    expect(snackbar).toBeTruthy();
  });

  it('publish message should dissapear in 2 seconds', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      openPublishState: true,
    });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    snackbars.at(0).simulate('close');
    expect(props.setOpenPublishState).toBeCalled();
  });

  it('revert message should dissapear in 2 seconds', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      openRevertState: true,
    });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    snackbars.at(1).simulate('close');
    expect(props.setOpenRevertState).toBeCalled();
  });

  it('should never close blocked message', () => {
    const { enzymeWrapper } = setup({ ...initProps, openBlocked: true });

    const snackbars: ShallowWrapper = enzymeWrapper.find('.alert-message');
    snackbars.at(2).simulate('close');
    expect(snackbars.at(2).prop('open')).toBe(true);
  });
});
