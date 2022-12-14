import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Sidebar, SidebarProps } from './sidebar';
import { Portal } from '../../models/portal.model';

Enzyme.configure({ adapter: new Adapter() });

const initProps: SidebarProps = {
  portal: undefined,
  journal: undefined,
  sidebarCollapsed: false,
  changeSidebarLayout: jest.fn(),
  database: undefined,
  themeSelected: false,
  themeSelectedID: '',
  theme: {
    uuid: 'string',
    permalink: 'string',
    name: 'string',
    previewImage: 'string',
    homepage: { label: 'label', pageId: 'id' },
    description: 'string',
    canRevert: true,
    visibility: true,
    menuItems: [],
    headerImage: 'string',
    headerColour: 'string',
  },
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Sidebar {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('sidebar', () => {
  let portalMock: Portal = {
    uuid: '0',
    name: 'portal',
    domain: 'url',
    createdBy: 'user',
    publishDate: new Date(),
  };
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render with sidebarCollapsed', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      portal: portalMock,
      sidebarCollapsed: true,
      theme: {
        id: '',
        name: 'name',
        createdBy: '',
        status: '',
        creationDate: '',
      },
    });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render with journals', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      sidebarCollapsed: true,
      theme: undefined,
      portal: undefined,
      journal: {
        uuid: 'string;',
        name: 'string;',
        editedBy: 'string;',
        visibility: true,
      },
    });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should show main navigation if no portal selected', () => {
    const { enzymeWrapper } = setup(initProps);
    const mainNav: any = enzymeWrapper.find('#portal-main');
    expect(mainNav.exists()).toBeTruthy();
  });

  it('should show portal navigation if portal selected', () => {
    portalMock = {
      uuid: '0',
      name: 'portal',
      domain: 'url',
      createdBy: 'user',
      publishDate: new Date(),
    };

    const { enzymeWrapper } = setup({ ...initProps, portal: portalMock });
    const portalNav: any = enzymeWrapper.find('#portal-nav');
    expect(portalNav.exists()).toBeTruthy();
  });

  it('should emit collapse sidebar when button clicked', () => {
    portalMock = {
      uuid: '0',
      name: 'portal',
      domain: 'url',
      createdBy: 'user',
      publishDate: new Date(),
    };

    const { props, enzymeWrapper } = setup({
      ...initProps,
      portal: portalMock,
    });
    const collapseButton: any = enzymeWrapper.find('#collapse-button');
    collapseButton.simulate('click');
    expect(props.changeSidebarLayout.mock.calls.length).toBe(1);
    expect(props.changeSidebarLayout.mock.calls[0][0]).toBe(true);
  });
});
