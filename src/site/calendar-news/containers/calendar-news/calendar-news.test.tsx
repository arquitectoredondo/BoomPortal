import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CalendarNewsComponent } from './calendar-news';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  calendarNewData: [
    {
      uuid: 'result.data.content.uuid',
      name: 'result.data.content.name',
      editedBy: 'result.data.content.editedBy',
      creationDate: 'result.data.content.creationDate',
      canRevert: false,
      visibility: false,
      openAccess: false,
    },
  ],
  loadCalendarNews: jest.fn(),
  loadCalendarNewsSuccess: jest.fn(),
  loadCalendarNewsFailure: jest.fn(),
  openCloseCreationDialog: jest.fn(),
  calendarNewSelected: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/calendar-news.service', () => ({
  fetchCalendarNewsData: jest
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
    ),
  createCalendarNew: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        uuid: 'result.data.content.uuid',
        name: 'result.data.content.name',
        editedBy: 'result.data.content.editedBy',
        creationDate: 'result.data.content.creationDate',
        publicationDate: 'result.data.content.creationDate',
        canRevert: false,
        visibility: false,
        openAccess: false,
      },
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <CalendarNewsComponent {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('Calendar News', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should add button opens dialog', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');
    expect(dialog.exists()).toBeTruthy();
    expect(dialog.prop('open')).toBeFalsy();

    const addButton: ShallowWrapper = enzymeWrapper.find('#add-button');
    addButton.simulate('click');

    expect(props.openCloseCreationDialog.mock.calls.length).toBe(1);
    expect(props.openCloseCreationDialog.mock.calls[0][0]).toBe(true);
  });

  it('should trigger UseEffect an load success', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);

    expect(props.loadCalendarNews.mock.calls.length).toBe(1);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadCalendarNewsSuccess.mock.calls.length).toBe(1);
    expect(props.loadCalendarNewsSuccess.mock.calls[0][0]).toEqual([
      { id: '123', label: 'label', link: 'link' },
    ]);
  });

  it('should trigger UseEffect and load failure', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadCalendarNewsFailure.mock.calls.length).toBe(1);
    expect(props.loadCalendarNewsFailure.mock.calls[0][0]).toEqual('error');
  });

  it('should handle journal creation dialog close without value', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');
    props.openCloseCreationDialog.mockClear();

    dialog.simulate('closeDialog');
    expect(props.openCloseCreationDialog.mock.calls.length).toBe(1);
    expect(props.openCloseCreationDialog.mock.calls[0][0]).toBe(false);
  });

  it('should handle journal creation dialog close with value', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');

    props.openCloseCreationDialog.mockClear();

    dialog.simulate('closeDialog', { val: 'name' });
    expect(props.openCloseCreationDialog.mock.calls.length).toBe(1);
    expect(props.openCloseCreationDialog.mock.calls[0][0]).toBe(false);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.calendarNewSelected.mock.calls.length).toBe(1);
    expect(props.calendarNewSelected.mock.calls[0][0]).toEqual({
      uuid: 'result.data.content.uuid',
      name: 'result.data.content.name',
      editedBy: 'result.data.content.editedBy',
      publicationDate: 'result.data.content.creationDate',
      canRevert: false,
      visibility: false,
      openAccess: false,
    });
  });

  it('should render the table with a Portal column', () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find('AdminTable');
    table.find('#admin-table-header').first().contains('Portal');
  });

  it('should select journal successfully', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find('AdminTable');
    table.simulate('rowClicked', {
      uuid: 'result.data.content.uuid',
      name: 'result.data.content.name',
      editedBy: 'result.data.content.editedBy',
      publicationDate: 'result.data.content.creationDate',
      canRevert: false,
      visibility: false,
      openAccess: false,
    });
    expect(props.calendarNewSelected.mock.calls.length).toBe(2);
    expect(props.calendarNewSelected.mock.calls[0][0]).toEqual({
      uuid: 'result.data.content.uuid',
      name: 'result.data.content.name',
      editedBy: 'result.data.content.editedBy',
      publicationDate: 'result.data.content.creationDate',
      canRevert: false,
      visibility: false,
      openAccess: false,
    });
  });

  it('should convert data from pages array to good format', () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find('AdminTable');
    expect(table.prop('data')).toEqual([
      {
        uuid: 'result.data.content.uuid',
        name: 'result.data.content.name',
        editedBy: 'result.data.content.editedBy',
        creationDate: 'result.data.content.creationDate',
        publicationDate: '',
        canRevert: false,
        visibility: false,
        openAccess: false,
      },
    ]);
  });
});
