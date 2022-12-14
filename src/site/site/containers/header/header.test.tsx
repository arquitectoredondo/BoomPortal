import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SiteHeader, SiteHeaderProps } from './header';
import { Portal } from '../../models/portal.model';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const initProps: SiteHeaderProps = {
  user: undefined,
  portal: undefined,
  journal: undefined,
  portalSelected: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<SiteHeader {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Site Header', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should show default title if no portal selected', () => {
    const { enzymeWrapper } = setup(initProps);
    const title: any = enzymeWrapper.find('#portal-not-selected');
    expect(title.exists()).toBeTruthy();
  });

  // it('should show portal selected if selected', () => {
  //   const portalMock: Portal = {
  //     id: 0,
  //     portal: 'portal',
  //     url: 'url',
  //     createdBy: 'user',
  //     creationDate: 'date'
  //   };

  //   const { enzymeWrapper } = setup({
  //     ...initProps,
  //     portal: portalMock
  //   });
  //   const portalSelected: any = enzymeWrapper.find('#portal-selected');
  //   const portalName: any = enzymeWrapper.find('#portal-name');
  //   expect(portalSelected.exists()).toBeTruthy();
  //   expect(portalName.text()).toEqual(portalMock.portal);
  // });

  it('should emit deselect portal when button clicked', () => {
    const portalMock: Portal = {
      uuid: 'id',
      domain: 'dom',
      name: 'portal',
      createdBy: 'user',
      creationDate: new Date(),
    };

    const { props, enzymeWrapper } = setup({
      ...initProps,
      portal: portalMock,
    });
    const backButton: any = enzymeWrapper.find('#back-button');
    backButton.simulate('click');
    expect(props.portalSelected.mock.calls.length).toBe(1);
    expect(props.portalSelected.mock.calls[0][0]).toBe(undefined);
  });
});
