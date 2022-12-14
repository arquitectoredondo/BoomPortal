import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  logInSuccess: jest.fn(),
};

jest.mock('@react-keycloak/web', () => ({
  useKeycloak: () => [
    {
      token: 'token',
    },
    true,
  ],
}));

jest.mock('../../services/auth.service', () => ({
  authenticateRegisteredUser: jest
    .fn()
    .mockReturnValue(Promise.resolve({ data: { token: '' } })),
  getUserInfo: jest.fn().mockReturnValue(Promise.resolve({ data: {} })),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('App root', () => {
  it('should render self and subcomponents', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
});
