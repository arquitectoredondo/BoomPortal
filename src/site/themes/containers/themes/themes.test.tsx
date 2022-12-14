import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Themes } from './themes';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  resetThemeSettings: jest.fn(),
  loadThemeSelectedID: jest.fn(),
  loadThemes: jest.fn(),
  loadThemesSuccess: jest.fn(),
  loadThemesFailure: jest.fn(),
  themeIsSelected: jest.fn(),
  themes: [
    {
      id: '1',
      name: 'Theme1',
      createdBy: 'Sander',
      status: 'Gepubliceerd',
      publishDate: '15 april 2019',
      visibility: true,
    },
  ],
  pending: false,
  error: false,
  portal: '1',
  themeSelectedID: '',
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: 'host/uuid/themes/' },
    listen: jest.fn(),
  }),
}));

jest.mock('../../services/theme.service', () => ({
  createTheme: jest.fn().mockReturnValue(
    Promise.resolve({
      data: '1',
    })
  ),
  fetchThemeData: jest
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
              publishDate: '15 april 2019',
            },
          ],
          totalHits: 1,
        },
      })
    )
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: '1',
            name: 'Theme1',
            createdBy: 'Sander',
            status: 'Gepubliceerd',
            publishDate: '15 april 2019',
          },
        ],
      })
    )
    .mockImplementationOnce(() => Promise.reject()),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Themes {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Themes', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
  it('add button opens dialog', () => {
    const { enzymeWrapper } = setup(initProps);

    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');
    expect(dialog.exists()).toBeTruthy();
    expect(dialog.prop('open')).toBeFalsy();

    const addButton: ShallowWrapper = enzymeWrapper.find('#add-button');
    addButton.simulate('click');
  });

  it('should call for theme list success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemes.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemesSuccess.mock.calls.length).toBe(1);
    expect(props.loadThemesSuccess.mock.calls[0][0]).toEqual([
      {
        id: '1',
        name: 'Theme1',
        createdBy: 'Sander',
        status: 'Gepubliceerd',
        publishDate: '15 april 2019',
      },
    ]);
  });

  it('should call for theme list failure on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemesFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemesFailure.mock.calls.length).toBe(1);
    expect(props.loadThemesFailure.mock.calls[0][0]).toEqual();
  });

  it('should convert data from theme array to good format', () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find('AdminTable');
    expect(table.prop('data')).toEqual([
      {
        id: '1',
        name: 'Theme1',
        createdBy: 'Sander',
        status: 'Gepubliceerd',
        publishDate: 'Mon Apr 15 2002',
        visibility: true,
      },
    ]);
  });

  it('closed dialog whitout value should do anything', () => {
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');
    dialog.simulate('closeDialog', undefined);
  });

  it('closed dialog whith value should create it success', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('CreationDialog');
    props.loadThemeSelectedID.mockClear();
    dialog.simulate('closeDialog', 'create new theme');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemeSelectedID.mock.calls.length).toBe(1);
  });
});
