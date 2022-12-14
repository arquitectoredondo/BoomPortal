import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ThemePages } from './theme-pages';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  loadThemePages: jest.fn(),
  loadThemePagesSuccess: jest.fn(),
  loadThemePagesFailure: jest.fn(),
  themePages: [],
  pending: false,
  error: false,
  user: { name: 'name test' },
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
  }),
}));

jest.mock('../../services/theme-pages.service', () => ({
  createThemePage: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {},
    })
  ),
}));

jest.mock('../../../pages/services/pages.service', () => ({
  getPages: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          content: [
            {
              id: '1',
              name: 'Theme1',
              createdBy: 'Sander',
              status: 'Gepubliceerd',
              creationDate: '15 april 2019',
            },
          ],
          totalHits: 1,
        },
      })
    )
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() => Promise.reject()),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<ThemePages {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Theme Pages', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for theme page list success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemePagesSuccess.mock.calls.length).toBe(1);
    expect(props.loadThemePagesSuccess.mock.calls[0][0]).toEqual([
      {
        id: '1',
        name: 'Theme1',
        createdBy: 'Sander',
        status: 'Gepubliceerd',
        creationDate: '15 april 2019',
      },
    ]);
  });

  it('should call for theme list failure on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemePagesFailure.mock.calls.length).toBe(1);
    expect(props.loadThemePagesFailure.mock.calls[0][0]).toEqual();
  });

  it('add button opens dialog', () => {
    const { enzymeWrapper } = setup(initProps);

    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog.prop('open')).toBeFalsy();

    const addButton: ShallowWrapper = enzymeWrapper.find('#add-button');
    addButton.simulate('click');

    const dialog2: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    expect(dialog2.prop('open')).toBeTruthy();
  });

  it('closed dialog whitout value should do anything', () => {
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    dialog.simulate('closeDialog', undefined);
  });

  it('closed dialog whith value should create it success', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationLinkDialog');
    props.loadThemePagesSuccess.mockClear();
    dialog.simulate('closeDialog', { name: 'create new page' });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemePagesSuccess.mock.calls.length).toBe(0);
  });
});
