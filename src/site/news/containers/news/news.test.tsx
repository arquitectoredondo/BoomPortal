import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { News } from './news';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  news: [
    {
      id: '91a3d84615e04ac38438273ad51764a7',
      name: 'Page 05 label',
      createdBy: 'admin',
      creationDate: '2020-04-06T10:28:15.168+0000',
      status: 'Gewijzigd',
    },
  ],
  themeIsSelected: jest.fn(),
  resetThemeSettings: jest.fn(),
  loadNews: jest.fn(),
  loadNewsSuccess: jest.fn(),
  loadNewsFailure: jest.fn(),
  resetNewsDetails: jest.fn(),
  loading: false,
  error: false,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '234' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/news.service', () => ({
  getNews: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          content: [
            {
              id: '91a3d84615e04ac38438273ad51764a7',
              name: 'Page 05 label',
              createdBy: 'admin',
              creationDate: '2020-04-06T10:28:15.168+0000',
              status: 'Gewijzigd',
            },
          ],
          totalHits: 1,
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<News {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('News', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for news list success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadNewsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsSuccess.mock.calls.length).toBe(1);
    expect(props.loadNewsSuccess.mock.calls[0][0]).toEqual([
      {
        id: '91a3d84615e04ac38438273ad51764a7',
        name: 'Page 05 label',
        createdBy: 'admin',
        creationDate: '2020-04-06T10:28:15.168+0000',
        status: 'Gewijzigd',
      },
    ]);
  });

  it('should call for news list failure on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadNewsFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsFailure.mock.calls.length).toBe(1);
    expect(props.loadNewsFailure.mock.calls[0][0]).toEqual('error');
  });

  it('should manage only Events filter changes', async () => {
    const { enzymeWrapper } = setup(initProps);

    const check: ShallowWrapper = enzymeWrapper.find('#event-checkbox');
    check.simulate('change', { target: { checked: true } });

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const check2: ShallowWrapper = enzymeWrapper.find('#event-checkbox');
    expect(check2.prop('checked')).toBe(true);
  });

  it('should manage domain filter changes', async () => {
    const { enzymeWrapper } = setup(initProps);

    const news: ShallowWrapper = enzymeWrapper.find('#news-domain');
    news.simulate('change', { target: { value: 'domain' } });

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const news2: ShallowWrapper = enzymeWrapper.find('#news-domain');
    expect(news2.prop('value')).toBe('domain');
  });

  it('should manage search text filter changes', async () => {
    const { enzymeWrapper } = setup(initProps);

    const search: ShallowWrapper = enzymeWrapper.find('#search-field');
    search.simulate('change', { target: { value: 'val' } });

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const search2: ShallowWrapper = enzymeWrapper.find('#search-field');
    expect(search2.prop('value')).toBe('val');
  });

  it('should reset newData store before going to creation', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const addButton: ShallowWrapper = enzymeWrapper.find('#add-button');
    addButton.simulate('click');

    expect(props.resetNewsDetails.mock.calls.length).toBe(1);
    props.resetNewsDetails.mockClear();
  });

  it('should navigate to details on row clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const addButton: ShallowWrapper = enzymeWrapper.find('AdminTable');
    addButton.simulate('rowClicked', { id: '1' });

    expect(props.resetNewsDetails.mock.calls.length).toBe(0);
  });
});
