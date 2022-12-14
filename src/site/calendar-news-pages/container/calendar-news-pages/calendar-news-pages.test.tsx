import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CalendarNewsPages } from './calendar-news-pages';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  pages: [
    {
      id: '91a3d84615e04ac38438273ad51764a7',
      label: 'Page 05 label',
      createdBy: 'admin',
      creationDate: '2020-04-06T10:28:15.168+0000',
      link: null,
      visibility: true,
      canRevert: true,
    },
  ],
  loadCalendarNewsPages: jest.fn(),
  loadCalendarNewsPagesSuccess: jest.fn(),
  loadCalendarNewsPagesFailure: jest.fn(),
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/calendar-news-pages.service', () => ({
  createCalendarNewsPage: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ data: { id: '123', label: 'label', link: 'link' } })
    ),
  getPages: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          content: [{ id: '123', label: 'label', link: 'link' }],
          totalHits: 1,
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ id: '123', label: 'label', link: 'link' }],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <CalendarNewsPages {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('Pages', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for page list success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadCalendarNewsPagesSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadCalendarNewsPagesSuccess.mock.calls.length).toBe(1);
    expect(props.loadCalendarNewsPagesSuccess.mock.calls[0][0]).toEqual([
      { id: '123', label: 'label', link: 'link' },
    ]);
  });

  it('should call for page list failure on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadCalendarNewsPagesFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadCalendarNewsPagesFailure.mock.calls.length).toBe(1);
    expect(props.loadCalendarNewsPagesFailure.mock.calls[0][0]).toEqual(
      'error'
    );
  });

  it('should convert data from pages array to good format', () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find('AdminTable');
    expect(table.prop('data')).toEqual([
      {
        id: '91a3d84615e04ac38438273ad51764a7',
        label: 'Page 05 label',
        createdBy: 'admin',
        creationDate: '',
        link: null,
        visibility: true,
        canRevert: true,
      },
    ]);
  });

  it('add button opens dialog', () => {
    const { enzymeWrapper } = setup(initProps);

    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog.exists()).toBeTruthy();
    expect(dialog.prop('open')).toBeFalsy();

    const addButton: ShallowWrapper = enzymeWrapper.find('#add-button');
    addButton.simulate('click');

    const dialog2: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog2.prop('open')).toBeTruthy();
  });

  it('closed dialog whith value should create it success', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    props.loadCalendarNewsPagesSuccess.mockClear();
    dialog.simulate('closeDialog', { val: { name: 'name', link: 'link' } });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadCalendarNewsPagesSuccess.mock.calls.length).toBe(1);
    expect(props.loadCalendarNewsPagesSuccess.mock.calls[0][0]).toEqual([]);
  });

  it('closed dialog whitout value should do anything', () => {
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    dialog.simulate('closeDialog', undefined);
  });
});
