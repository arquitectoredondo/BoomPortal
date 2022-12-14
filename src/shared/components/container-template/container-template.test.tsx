import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContainerTemplate from './container-template';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  children: [],
  loading: false,
  error: false,
  content: {},
  empty: false
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ContainerTemplate {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('ContainerTemplate', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('error is shown', () => {
    const { enzymeWrapper } = setup({ ...initProps, error: true });
    const error: any = enzymeWrapper.find('ErrorAlert').exists();
    expect(error).toBeTruthy();
  });

  it('loading is shown', () => {
    const { enzymeWrapper } = setup({ ...initProps, loading: true });
    const loading: any = enzymeWrapper.find('#loading-default').exists();
    expect(loading).toBeTruthy();
  });

  it('error and loading is not shown for content', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      error: false,
      loading: false
    });
    const loading: any = enzymeWrapper.find('#loading-default').exists();
    const error: any = enzymeWrapper.find('#error-default').exists();
    expect(error || loading).toBeFalsy();
  });
});
