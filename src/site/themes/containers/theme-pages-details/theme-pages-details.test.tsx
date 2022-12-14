import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ThemePageDetails } from './theme-pages-details';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  pageLayout: {
    lg: [
      {
        uuid: '05486c89931c495a9bba30d0a17c2b14',
        name: 'PageWidget1',
        id: 'bd15695e89c6486289cfa026b2db0a49',
        description: null,
        image: null,
        preview: null,
        sourceUrl: null,
        widgetType: 1,
        minH: 8,
        minW: 4,
        h: 8,
        w: 10,
        x: 0,
        y: 0,
      },
    ],
  },
  loadThemePageDetails: jest.fn(),
  loadThemePageDetailsSuccess: jest.fn(),
  loadThemePageDetailsFailure: jest.fn(),
  updateThemePageDetails: jest.fn(),
  updateThemePageDetailsSuccess: jest.fn(),
  updateThemePageDetailsFailure: jest.fn(),
  pageDetails: {},
  loading: false,
  error: false,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/theme-page-details.service', () => ({
  getThemePageDetails: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'PageWidget1',
            id: 'bd15695e89c6486289cfa026b2db0a49',
            description: null,
            image: null,
            preview: null,
            sourceUrl: null,
            widgetType: 1,
            minH: 8,
            minW: 4,
            h: 8,
            w: 10,
            x: 0,
            y: 0,
          },
        ],
      })
    )
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'PageWidget1',
            id: 'bd15695e89c6486289cfa026b2db0a49',
            description: null,
            image: null,
            preview: null,
            sourceUrl: null,
            widgetType: 1,
            minH: 8,
            minW: 4,
            h: 8,
            w: 10,
            x: 0,
            y: 0,
          },
        ],
      })
    ),
  updateThemePageLayout: jest
    .fn()
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.reject()),
  updateThemePageWidget: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.reject()),
  deletePageWidget: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'PageWidget1',
            id: 'bd15695e89c6486289cfa026b2db0a49',
            description: null,
            image: null,
            preview: null,
            sourceUrl: null,
            widgetType: 1,
            minH: 8,
            minW: 4,
            h: 8,
            w: 10,
            x: 0,
            y: 0,
          },
        ],
      })
    )
    .mockImplementationOnce(() => Promise.reject()),
  addThemePageWidget: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'PageWidget1',
            id: 'bd15695e89c6486289cfa026b2db0a49',
            description: null,
            image: null,
            preview: null,
            sourceUrl: null,
            widgetType: 1,
            minH: 8,
            minW: 4,
            h: 8,
            w: 10,
            x: 0,
            y: 0,
          },
        ],
      })
    )
    .mockImplementationOnce(() => Promise.reject()),
  revertThemePage: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: '127876271d5e4ae68a8a6f0e3a3d64da',
      label: 'Page1(serviceMock)',
      createdBy: 'admin',
      creationDate: '2020-04-23T10:06:06.939+0000',
      status: 'Gewijzigd',
      link: 'pageLink',
      pageWidgets: [
        {
          uuid: '05486c89931c495a9bba30d0a17c2b14',
          name: 'PageWidget1',
          id: 'bd15695e89c6486289cfa026b2db0a49',
          description: null,
          image: null,
          preview: null,
          sourceUrl: null,
          widgetType: 1,
          minH: 8,
          minW: 4,
          h: 8,
          w: 10,
          x: 0,
          y: 0,
        },
      ],
    })
  ),
  publishThemePage: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: '127876271d5e4ae68a8a6f0e3a3d64da',
      label: 'Page1(serviceMock)',
      createdBy: 'admin',
      creationDate: '2020-04-23T10:06:06.939+0000',
      status: 'Gewijzigd',
      link: 'pageLink',
      pageWidgets: [
        {
          uuid: '05486c89931c495a9bba30d0a17c2b14',
          name: 'PageWidget1',
          id: 'bd15695e89c6486289cfa026b2db0a49',
          description: null,
          image: null,
          preview: null,
          sourceUrl: null,
          widgetType: 1,
          minH: 8,
          minW: 4,
          h: 8,
          w: 10,
          x: 0,
          y: 0,
        },
      ],
    })
  ),
}));

jest.mock('../../../../shared/services/utils', () => ({
  useNotOnMountEffect: jest.fn().mockImplementationOnce((f: any) => f()),
  formatDate: jest.fn(),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ThemePageDetails {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('Theme page details', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for data success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup({
      ...initProps,
      pageDetails: {
        id: 'id',
      },
    });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemePageDetailsSuccess.mock.calls.length).toBe(1);
  });

  // it('should call for data failure on init', async () => {
  //   jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
  //   const { props } = setup(initProps);
  //   const flushPromises = () => new Promise(setImmediate);
  //   await flushPromises();
  //   expect(props.loadThemePageDetailsFailure.mock.calls.length).toBe(1);
  // });

  // it('should trigger action on layout change success', async () => {
  //   const { enzymeWrapper, props } = setup({
  //     ...initProps,
  //     pageDetails: {
  //       id: 'id',
  //     },
  //   });
  //   props.updateThemePageDetails.mockClear();
  //   const grid: ShallowWrapper = enzymeWrapper.find('#grid');
  //   grid.simulate('layoutChange');
  //   const flushPromises = () => new Promise(setImmediate);
  //   await flushPromises();
  //   const revert: ShallowWrapper = enzymeWrapper.find('#revert-button');
  //   expect(revert.prop('disabled')).toBeTruthy();
  // });

  // it('should trigger action on layout change failure', async () => {
  //   jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
  //   const { enzymeWrapper, props } = setup(initProps);
  //   const grid: ShallowWrapper = enzymeWrapper.find('#grid');
  //   grid.simulate('layoutChange');
  //   const flushPromises = () => new Promise(setImmediate);
  //   await flushPromises();
  //   expect(props.updateThemePageDetailsFailure.mock.calls.length).toBe(1);
  // });

  it('should trigger action on layout change failure', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateThemePageDetails.mockClear();
    const grid: ShallowWrapper = enzymeWrapper.find('#back-button');
    grid.simulate('click');
    expect(window.location).not.toBe('/pageDetails');
  });

  it('should open dialog if button clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateThemePageDetails.mockClear();
    const openButton: ShallowWrapper = enzymeWrapper.find(
      '#open-widget-selector'
    );
    openButton.simulate('click');
    const dialog2: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    expect(dialog2.prop('open')).toBeTruthy();
  });

  it('should close dialog when event emitted', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateThemePageDetails.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    dialog.simulate('closeDialog');
    const dialog2: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    expect(dialog2.prop('open')).toBeFalsy();
  });

  it('should open edit dialog', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      pageDetails: {
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [],
      },
    });
    props.updateThemePageDetails.mockClear();
    const openButton: ShallowWrapper = enzymeWrapper.find(
      '#open-settings-button'
    );
    openButton.simulate('click');
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog.prop('open')).toBeTruthy();
  });

  it('should close dialog when event emitted', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      pageDetails: {
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'Page1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [],
      },
    });
    props.updateThemePageDetails.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    dialog.simulate('closeDialog');
    dialog.simulate('closeDialog', { label: 'label' });
    const dialog2: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog2.prop('open')).toBeFalsy();
  });

  // it('should add widget success ', async () => {
  //   const { enzymeWrapper, props } = setup(initProps);
  //   const dialog: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
  //   expect(dialog.exists()).toBeTruthy();
  //   expect(dialog.prop('open')).toBeFalsy();
  //   const addWidgetButton: ShallowWrapper = enzymeWrapper.find(
  //     '#open-widget-selector'
  //   );
  //   props.loadThemePageDetailsSuccess.mockClear();
  //   addWidgetButton.simulate('click');
  //   const dialog2: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
  //   expect(dialog2.prop('open')).toBeTruthy();

  //   dialog2.simulate('save', { val: 'name' });
  //   dialog2.simulate('save', { uuid: 'id' });
  //   const flushPromises = () => new Promise(setImmediate);
  //   await flushPromises();
  //   expect(props.loadThemePageDetailsSuccess.mock.calls.length).toBe(2);
  // });

  it('should delete a widget  ', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const widget: ShallowWrapper = enzymeWrapper.find('WidgetElement');
    expect(widget.exists()).toBeTruthy();

    props.loadThemePageDetailsSuccess.mockClear();

    widget.simulate('deleteWidget', { val: 'id' });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemePageDetailsSuccess.mock.calls.length).toBe(0);
  });

  // it('should open revert dialog', async () => {
  //   const { enzymeWrapper } = setup({
  //     ...initProps,
  //     pageDetails: { canRevert: true },
  //   });
  //   const revertDialog: ShallowWrapper = enzymeWrapper.find(
  //     'ConfirmActionDialog'
  //   );
  //   expect(revertDialog.prop('open')).toBe(false);
  //   const revert: ShallowWrapper = enzymeWrapper.find('#revert-button');
  //   revert.simulate('click');
  //   const revertDialogOpen: ShallowWrapper = enzymeWrapper.find(
  //     'ConfirmActionDialog'
  //   );
  //   expect(revertDialogOpen.prop('open')).toBe(true);
  // });

  it('should publish changes', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const publish: ShallowWrapper = enzymeWrapper.find('#publish-button');
    publish.simulate('click');
    props.loadThemePageDetailsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const revert: ShallowWrapper = enzymeWrapper.find('#revert-button');
    expect(revert.prop('disabled')).toBeTruthy();
  });
});
