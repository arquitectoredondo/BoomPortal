import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BannerWidgetForm from './banner-widget-form';
import { PageWidget } from '../../../models/layout.model';

Enzyme.configure({ adapter: new Adapter() });
const mockBanner: PageWidget = {
  uuid: 'id',
  label: { nl: 'label', en: '' },
  internal: true,
  title: { nl: 'title', en: '' },
  type: 1,
  x: 0,
  y: 0,
  h: 3,
  w: 3,
  minH: 3,
  minW: 3,
  name: 'name',
  id: 'id',
  pageId: '123',
  text: { nl: 'text', en: '' },
  backgroundColor: 'red',
  fontColor: 'black',
  widgetType: 6,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
  image: 'image',
  isButtonVisible: true,
  openNewTab: true,
};
const initProps: any = {
  open: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
  bannerData: mockBanner,
};
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
}));

jest.mock('../../../../site/settings/services/settings.service', () => ({
  getAllPages: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ data: { pages: [{ label: 'page', uuid: '123' }] } })
    ),
  retrieveMenuThemes: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ data: [{ label: 'page', uuid: '123' }] })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <BannerWidgetForm {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('BannerWidgetForm', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
  it('should not show page selector until controller page is selected', () => {
    const { enzymeWrapper } = setup(initProps);

    expect(enzymeWrapper.find('#menu-pages').exists()).toBeFalsy();

    const nameInput: ShallowWrapper = enzymeWrapper.find(
      '#menu-controller-txt'
    );
    nameInput.simulate('change', { target: { value: 0 } });
    expect(enzymeWrapper.find('#menu-pages').exists()).toBeTruthy();
  });

  it('should not show url field until external option is selected', () => {
    const { enzymeWrapper } = setup(initProps);

    expect(enzymeWrapper.find('#menu-url').exists()).toBeFalsy();
    const internalSwitch: ShallowWrapper =
      enzymeWrapper.find('#internal-switch');
    internalSwitch.simulate('change', { target: { value: true } });
    expect(enzymeWrapper.find('#menu-url').exists()).toBeTruthy();
  });
  it('should retrieve pages when page controller option selected', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup({ ...initProps, bannerData: undefined });
    const controller: ShallowWrapper = enzymeWrapper.find(
      '#menu-controller-txt'
    );
    controller.simulate('change', { target: { value: 0 } });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const menuPages: ShallowWrapper = enzymeWrapper.find('#menu-pages');
    expect(menuPages.children).not.toEqual(0);
  });

  it('should handle close dialog without save', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCancel.mock.calls.length).toBe(1);
  });

  it('should handle save button when widget receive data', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);

    props.onSave.mockClear();

    const internalSwitch: ShallowWrapper =
      enzymeWrapper.find('#internal-switch');
    internalSwitch.simulate('change', { target: { value: true } });

    const scalableImageSwitch: ShallowWrapper =
      enzymeWrapper.find('#scalable-switch');
    scalableImageSwitch.simulate('change', { target: { value: true } });

    const url: ShallowWrapper = enzymeWrapper.find('#menu-url');
    url.simulate('change', { target: { value: 'url' } });

    const labelInput: ShallowWrapper = enzymeWrapper.find('#menu-label');
    labelInput.simulate('change', {
      target: { value: 'label' },
    });

    const textInput: ShallowWrapper = enzymeWrapper.find('#text-label');
    textInput.simulate('change', {
      target: { value: 'text' },
    });

    const titleInput: ShallowWrapper = enzymeWrapper.find('#banner-title');
    titleInput.simulate('change', {
      target: { value: 'title' },
    });
    const topBorder: ShallowWrapper = enzymeWrapper.find('#top-border');
    topBorder.simulate('click');
    const rightBorder: ShallowWrapper = enzymeWrapper.find('#right-border');
    rightBorder.simulate('click');
    const bottomBorder: ShallowWrapper = enzymeWrapper.find('#bottom-border');
    bottomBorder.simulate('click');
    const leftBorder: ShallowWrapper = enzymeWrapper.find('#left-border');
    leftBorder.simulate('click');
    const form: ShallowWrapper = enzymeWrapper.find('.widget-banner-body');
    form.simulate('submit');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      uuid: 'id',
      label: { nl: 'label', en: '', undefined: 'label' },
      internal: false,
      title: { nl: 'title', en: '', undefined: 'title' },
      x: 0,
      y: 0,
      h: 3,
      w: 3,
      minH: 3,
      minW: 3,
      text: { nl: 'text', en: '', undefined: 'text' },
      backgroundColor: 'red',
      fontColor: 'black',
      widgetType: 6,
      borderRight: false,
      borderBottom: false,
      borderLeft: false,
      borderTop: false,
      image: 'image',
      url: 'url',
      isButtonVisible: true,
      pageId: undefined,
      scalableImage: true,
      type: undefined,
      openNewTab: true,
    });
  });
  it('should handle save button when widget opens empty', async () => {
    const emptyProps: any = {
      open: true,
      onSave: jest.fn(),
      onCancel: jest.fn(),
    };
    const { enzymeWrapper, props } = setup(emptyProps);
    props.onCancel.mockClear();
    const controller: ShallowWrapper = enzymeWrapper.find(
      '#menu-controller-txt'
    );
    controller.simulate('change', { target: { value: 1 } });

    const menuPages: ShallowWrapper = enzymeWrapper.find('#menu-pages');
    expect(menuPages.children).not.toEqual(0);

    const labelInput: ShallowWrapper = enzymeWrapper.find('#menu-label');
    labelInput.simulate('change', {
      target: { value: 'label' },
    });
    const form: ShallowWrapper = enzymeWrapper.find('.widget-banner-body');
    form.simulate('submit');

    const fileButton: ShallowWrapper = enzymeWrapper.find(
      '#contained-button-file'
    );
    fileButton.simulate('change', {
      target: { files: [new File([''], 'file', { type: 'text/html' })] },
    });

    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      internal: true,
      pageId: '',
      scalableImage: false,
      widgetType: 6,
      type: 1,
      fontColor: '#000',
      borderTop: false,
      borderRight: false,
      borderBottom: false,
      borderLeft: false,
      image: '',
      isButtonVisible: true,
      openNewTab: true,
      text: { en: '', nl: '' },
      title: {},
      label: { nl: '', undefined: 'label', en: '' },
    });
  });
});
