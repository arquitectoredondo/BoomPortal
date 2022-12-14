import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from './login';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@react-keycloak/web', () => ({
  useKeycloak: () => [
    {
      authenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    },
  ],
}));

const initProps: any = {};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Login {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Login', () => {
  it('should render self and subcomponents', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
});
