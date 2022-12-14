import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CalendarNewsPageDetails } from './calendar-news-page-details';

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
  loadCalendarNewsPageDetails: jest.fn(),
  loadCalendarNewsPageDetailsSuccess: jest.fn(),
  loadCalendarNewsPageDetailsFailure: jest.fn(),
  updateCalendarNewsPageDetails: jest.fn(),
  updateCalendarNewsPageDetailsSuccess: jest.fn(),
  updateCalendarNewsPageDetailsFailure: jest.fn(),
  pageDetails: undefined,
  loading: false,
  error: false,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/calendar-news-page-details.service', () => ({
  getCalendarNewsPageDetails: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'CalendarNewsPage1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'CalendarNewsPageWidget1',
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
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  updateCalendarNewsPageLayout: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  updateCalendarNewsPageWidget: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  deleteCalendarNewsPageWidget: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'CalendarNewsPage1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'CalendarNewsPageWidget1',
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
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  addCalendarNewsPageWidget: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        id: '127876271d5e4ae68a8a6f0e3a3d64da',
        label: 'CalendarNewsPage1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [
          {
            uuid: '05486c89931c495a9bba30d0a17c2b14',
            name: 'CalendarNewsPageWidget1',
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
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <CalendarNewsPageDetails {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('CalendarNewsPageDetails', () => {
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
    expect(props.loadCalendarNewsPageDetailsSuccess.mock.calls.length).toBe(1);
  });

  it('should call for data failure on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadCalendarNewsPageDetailsFailure.mock.calls.length).toBe(1);
  });

  it('should trigger action on layout change success', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      pageDetails: {
        id: 'id',
      },
    });
    props.updateCalendarNewsPageDetails.mockClear();
    const grid: ShallowWrapper = enzymeWrapper.find('#grid');
    grid.simulate('layoutChange');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.updateCalendarNewsPageDetailsSuccess.mock.calls.length).toBe(
      0
    );
  });

  it('should trigger action on layout change failure', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateCalendarNewsPageDetails.mockClear();
    const grid: ShallowWrapper = enzymeWrapper.find('#back-button');
    grid.simulate('click');
    expect(window.location).not.toBe('/pageDetails');
  });

  it('should open dialog if button clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateCalendarNewsPageDetails.mockClear();
    const openButton: ShallowWrapper = enzymeWrapper.find(
      '#open-widget-selector'
    );
    openButton.simulate('click');
    const dialog2: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    expect(dialog2.prop('open')).toBeTruthy();
  });

  it('should close dialog when event emitted', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.updateCalendarNewsPageDetails.mockClear();
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
        label: 'CalendarNewsPage1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [],
      },
    });
    props.updateCalendarNewsPageDetails.mockClear();
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
        label: 'CalendarNewsPage1(serviceMock)',
        createdBy: 'admin',
        creationDate: '2020-04-23T10:06:06.939+0000',
        status: 'Gewijzigd',
        link: 'pageLink',
        pageWidgets: [],
      },
    });
    props.updateCalendarNewsPageDetails.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    dialog.simulate('closeDialog');
    const dialog2: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog2.prop('open')).toBeFalsy();
  });

  it('should add widget success ', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    expect(dialog.exists()).toBeTruthy();
    expect(dialog.prop('open')).toBeFalsy();
    const addWidgetButton: ShallowWrapper = enzymeWrapper.find(
      '#open-widget-selector'
    );
    props.loadCalendarNewsPageDetailsSuccess.mockClear();
    addWidgetButton.simulate('click');
    const dialog2: ShallowWrapper = enzymeWrapper.find('WidgetDialog');
    expect(dialog2.prop('open')).toBeTruthy();

    dialog2.simulate('save', { val: 'name' });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadCalendarNewsPageDetailsSuccess.mock.calls.length).toBe(1);
  });
});
