import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Settings } from './settings';

Enzyme.configure({ adapter: new Adapter() });

const mockPortalSettings = {
  id: '1',
  canRevert: false,
  name: 'name',
  htmlFavicon: 'favicon',
  logo: 'logo',
  domain: 'domain',
  menuItems: [{ id: 'id' }],
  background: 'background',
  homepage: {
    label: 'asd',
    pageId: 'asd',
  },
  colorPrimary: '#000',
  colorSecondary: '#000',
  colorMainMenu: '#000',
  colorSecondaryMenu: '#000',
  fontPrimary: 'helvetica',
  fontSecondary: 'helvetica2',
};
const initProps: any = {
  themeIsSelected: jest.fn(),
  resetThemeSettings: jest.fn(),
  loadPortalSettings: jest.fn(),
  loadPortalSettingsSuccess: jest.fn(),
  loadPortalSettingsFailure: jest.fn(),
  savePortalSettings: jest.fn(),
  portalSelected: jest.fn(),
  loading: false,
  error: false,
  portalSettings: mockPortalSettings,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
  }),
}));

jest.mock('../../services/settings.service', () => ({
  getPortalSettings: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockPortalSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockPortalSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockPortalSettings,
      })
    ),
  revertPortalSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockPortalSettings,
    })
  ),
  publishPortalSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockPortalSettings,
    })
  ),
  publishPortalSettinretrieveMenuPagesgs: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockPortalSettings,
    })
  ),
  saveDraftPortalSettings: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        id: '1',
        canRevert: false,
        name: 'name',
        htmlFavicon: 'favicon',
        logo: 'logo',
        domain: 'domain',
        menuItems: [{ id: 'id' }],
        background: 'background',
        homepage: {
          label: 'asd',
          pageId: 'asd',
        },
        colorPrimary: '#000',
        colorSecondary: '#000',
        colorMainMenu: '#000',
        colorSecondaryMenu: '#000',
        fontPrimary: 'helvetica',
        fontSecondary: 'helvetica2',
      },
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: any = shallow(<Settings {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Settings', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for portal settings success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadPortalSettings.mockClear();
    props.loadPortalSettingsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadPortalSettingsSuccess.mock.calls.length).toBe(1);
    expect(props.loadPortalSettingsSuccess.mock.calls[0][0]).toEqual(
      mockPortalSettings
    );
  });

  it('should trigger UseEffect and load failure', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadPortalSettingsFailure.mock.calls.length).toBe(1);
    expect(props.loadPortalSettingsFailure.mock.calls[0][0]).toEqual();
  });

  it('should place correctly already loaded fields', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      portalSettings: mockPortalSettings,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find('#settings-name');
    nameInput.simulate('blur');
    expect(nameInput.prop('value')).toBe('name');
    nameInput.simulate('change', { target: { value: 'name2' } });
    const nameInput2: ShallowWrapper = enzymeWrapper.find('#settings-name');
    expect(nameInput2.prop('value')).toBe('name2');

    const urlInput: ShallowWrapper = enzymeWrapper.find('#settings-url');
    urlInput.simulate('blur');
    expect(urlInput.prop('value')).toBe('domain');
    urlInput.simulate('change', { target: { value: 'url2' } });
    const urlInput2: ShallowWrapper = enzymeWrapper.find('#settings-url');
    expect(urlInput2.prop('value')).toBe('url2');

    const favIcon: ShallowWrapper = enzymeWrapper.find('#settings-favicon');
    expect(favIcon.prop('src')).toBe('favicon');

    const logo: ShallowWrapper|any = enzymeWrapper.find('#settings-logo');
    expect(logo.prop('style').backgroundImage).toBe('url("logo")');
    
    const background: ShallowWrapper|any = enzymeWrapper.find('#settings-background');
    expect(background.prop('style').backgroundImage).toBe('url("background")');

    const fontPrimary: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-primary'
    );
    expect(fontPrimary.prop('value')).toBe('helvetica');

    const fontSecondary: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-secondary'
    );
    expect(fontSecondary.prop('value')).toBe('helvetica2');

    const canRevertButton: ShallowWrapper =
      enzymeWrapper.find('#revert-button');
    expect(canRevertButton.exists()).toBeFalsy();
  });

  it('should place correctly already loaded fields', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      portalSettings: mockPortalSettings,
    });
    props.savePortalSettings.mockClear();
    props.loadPortalSettingsSuccess.mockClear();

    const nameInput: ShallowWrapper = enzymeWrapper.find('#settings-name');
    expect(nameInput.prop('value')).toBe('name');

    const urlInput: ShallowWrapper = enzymeWrapper.find('#settings-url');
    expect(urlInput.prop('value')).toBe('domain');

    const favIcon: ShallowWrapper = enzymeWrapper.find('#settings-favicon');
    expect(favIcon.prop('src')).toBe('favicon');

    const logo: ShallowWrapper|any = enzymeWrapper.find('#settings-logo');
    expect(logo.prop('style').backgroundImage).toBe('url("logo")');
    
    const background: ShallowWrapper|any = enzymeWrapper.find('#settings-background');
    expect(background.prop('style').backgroundImage).toBe('url("background")');

    const fontPrimary: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-primary'
    );
    fontPrimary.simulate('blur');
    expect(fontPrimary.prop('value')).toBe('helvetica');

    const fontSecondary: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-secondary'
    );
    fontSecondary.simulate('blur');
    expect(fontSecondary.prop('value')).toBe('helvetica2');

    const canRevertButton: ShallowWrapper =
      enzymeWrapper.find('#revert-button');
    expect(canRevertButton.exists()).toBeFalsy();
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.savePortalSettings.mock.calls.length).toBe(2);
    expect(props.loadPortalSettingsSuccess.mock.calls.length).toBe(2);
  });

  it('should show canRevert if true', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      portalSettings: { ...mockPortalSettings, canRevert: true },
    });
    const canRevertButton: ShallowWrapper =
      enzymeWrapper.find('#revert-button');
    expect(canRevertButton.exists()).toBeTruthy();
  });

  it('should dispatch revert action success on click', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      portalSettings: { ...mockPortalSettings, canRevert: true },
    });
    props.savePortalSettings.mockClear();
    props.loadPortalSettingsSuccess.mockClear();
    const revertButton: ShallowWrapper = enzymeWrapper.find('#revert-button');
    revertButton.simulate('click');

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.savePortalSettings.mock.calls.length).toBe(1);
    expect(props.loadPortalSettingsSuccess.mock.calls.length).toBe(1);
  });

  it('should dispatch publish action success on click', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      portalSettings: mockPortalSettings,
    });
    props.savePortalSettings.mockClear();
    const publishButton: ShallowWrapper = enzymeWrapper.find(
      '#publish-changes-button'
    );
    publishButton.simulate('click');

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.savePortalSettings.mock.calls.length).toBe(1);
  });

  it('should handle item menu dialog close without value', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuSelector: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    menuSelector.simulate('addItem');
    const dialog: ShallowWrapper = enzymeWrapper.find('MenuAdditionDialog');
    props.loadPortalSettings.mockClear();
    props.loadPortalSettingsSuccess.mockClear();
    dialog.simulate('closeDialog');
    expect(props.loadPortalSettingsSuccess.mock.calls.length).toBe(0);
  });

  it('should handle item menu dialog edit value', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const menuSelector: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    menuSelector.simulate('addItem');
    menuSelector.simulate('editItem', 'id');
    const dialog: ShallowWrapper = enzymeWrapper.find('MenuAdditionDialog');
    expect(dialog.prop('item')).toBe(undefined);
  });

  it('should handle delete menu item', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    props.loadPortalSettings.mockClear();
    props.loadPortalSettingsSuccess.mockClear();
    menuItem.simulate('deleteItem', 'id');
    const menuItem2: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    expect(menuItem2.prop('items')).toEqual([]);
  });

  it('should handle add menu item dialog close with value', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const menuSelector: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    menuSelector.simulate('addItem');
    const dialog: ShallowWrapper = enzymeWrapper.find('MenuAdditionDialog');
    dialog.simulate('closeDialog', { id: 'id' });
    const menuItem2: ShallowWrapper = enzymeWrapper.find('MenuSelector');
    expect(menuItem2.prop('items')).toEqual([{ id: 'id' }]);
  });

  it('should handleChanges if empty settings', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      portalSettings: undefined,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find('#settings-name');
    nameInput.simulate('change', { target: { value: 'name2' } });
    const nameInput2: ShallowWrapper = enzymeWrapper.find('#settings-name');
    expect(nameInput2.prop('value')).toBe('');
  });

  it('should handleChanges if empty settings', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      portalSettings: undefined,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find('#settings-name');
    nameInput.simulate('blur');
    const nameInput2: ShallowWrapper = enzymeWrapper.find('#settings-name');
    expect(nameInput2.prop('value')).toBe('');
  });

  it('should handleChanges on favicon', () => {
    const { enzymeWrapper } = setup(initProps);
    const input: ShallowWrapper = enzymeWrapper.find(
      '#portal-favicon-button-file'
    );
    input.simulate('change', {
      target: { files: [new File([''], 'file', { type: 'text/html' })] },
    });
    const faviconButton: ShallowWrapper = enzymeWrapper.find('#favicon-button');
    faviconButton.simulate('click');
    const favicon: ShallowWrapper = enzymeWrapper.find('#settings-favicon');
    expect(favicon.exists()).toBeFalsy();
  });

  it('should handleChanges on logo', () => {
    const { enzymeWrapper } = setup(initProps);
    const input: ShallowWrapper = enzymeWrapper.find(
      '#portal-logo-button-file'
    );
    input.simulate('change', {
      target: { files: [new File([''], 'file', { type: 'text/html' })] },
    });
    const faviconButton: ShallowWrapper = enzymeWrapper.find('#logo-button');
    faviconButton.simulate('click');
    const favicon: ShallowWrapper = enzymeWrapper.find('#settings-logo');
    expect(favicon.exists()).toBeFalsy();
  });

  it('should handleChanges on background', () => {
    const { enzymeWrapper } = setup(initProps);
    const input: ShallowWrapper = enzymeWrapper.find(
      '#portal-background-button-file'
    );
    input.simulate('change', {
      target: { files: [new File([''], 'file', { type: 'text/html' })] },
    });
    const faviconButton: ShallowWrapper =
      enzymeWrapper.find('#background-button');
    faviconButton.simulate('click');
    const favicon: ShallowWrapper = enzymeWrapper.find('#settings-background');
    expect(favicon.exists()).toBeFalsy();
  });

  it('should open main color', () => {
    const { enzymeWrapper } = setup(initProps);
    const button: ShallowWrapper = enzymeWrapper.find('#main-color-button');
    button.simulate('click');
    const mainColor: ShallowWrapper = enzymeWrapper.find('#main-color');
    expect(mainColor.exists()).toBeTruthy();
  });

  it('should open secondary color', () => {
    const { enzymeWrapper } = setup(initProps);
    const button: ShallowWrapper = enzymeWrapper.find(
      '#secondary-color-button'
    );
    button.simulate('click');
    const secondaryColor: ShallowWrapper =
      enzymeWrapper.find('#secondary-color');
    expect(secondaryColor.exists()).toBeTruthy();
  });

  it('should open main menu', () => {
    const { enzymeWrapper } = setup(initProps);
    const button: ShallowWrapper = enzymeWrapper.find('#main-menu-button');
    button.simulate('click');
    const mainColor: ShallowWrapper = enzymeWrapper.find('#menu-main');
    expect(mainColor.exists()).toBeTruthy();
  });

  it('should change font primary', () => {
    const { enzymeWrapper } = setup(initProps);
    const select: ShallowWrapper = enzymeWrapper.find('#settings-font-primary');
    select.simulate('change', { target: { value: 'val' } });
    const select2: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-primary'
    );
    expect(select2.prop('value')).toEqual('val');
  });

  it('should change font secondary', () => {
    const { enzymeWrapper } = setup(initProps);
    const select: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-secondary'
    );
    select.simulate('change', { target: { value: 'val' } });
    const select2: ShallowWrapper = enzymeWrapper.find(
      '#settings-font-secondary'
    );
    expect(select2.prop('value')).toEqual('val');
  });
});
