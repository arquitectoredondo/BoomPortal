import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ThemeCatalogComponent } from './themes-catalog';

Enzyme.configure({ adapter: new Adapter() });

const mockThemeCatalog = {
  uuid: '1',
  taxonomyTree: [],
  assignedTaxonomies: [],
  publications: [],
  openAccess: true,
  authorizingEbooks: true,
  authorizingJournals: true,
  authorizingJournalArticles: false,
  authorizingDatabases: false,
  authorizingDatabaseArticles: true,
  years: [],
};

const initProps: any = {
  loadThemeCatalog: jest.fn(),
  loadThemeCatalogSuccess: jest.fn(),
  loadThemeCatalogFailure: jest.fn(),
  saveThemeCatalog: jest.fn(),
  loading: false,
  error: false,
  themeCatalog: mockThemeCatalog,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ themeId: '123' }),
  useHistory: () => ({
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
  }),
}));

jest.mock('../../services/themeCatalog.service', () => ({
  getThemeCatalog: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockThemeCatalog,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockThemeCatalog,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  updateThemeCatalog: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          uuid: '1',
          taxonomyTree: [],
          assignedTaxonomies: [],
          publications: [],
          openAccess: true,
          authorizingEbooks: true,
          authorizingJournals: true,
          authorizingJournalArticles: false,
          authorizingDatabases: false,
          authorizingDatabaseArticles: true,
          years: [],
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          uuid: '1',
          taxonomyTree: [],
          assignedTaxonomies: [],
          publications: [],
          openAccess: true,
          authorizingEbooks: true,
          authorizingJournals: true,
          authorizingJournalArticles: false,
          authorizingDatabases: false,
          authorizingDatabaseArticles: true,
          years: [],
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ThemeCatalogComponent {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('ThemesCatalog', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
  it('should call for theme catalog success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemeCatalogSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemeCatalogSuccess.mock.calls.length).toBe(1);
    expect(props.loadThemeCatalogSuccess.mock.calls[0][0]).toEqual({
      uuid: '1',
      taxonomyTree: [],
      assignedTaxonomies: [],
      publications: [],
      openAccess: true,
      authorizingEbooks: true,
      authorizingJournals: true,
      authorizingJournalArticles: false,
      authorizingDatabases: false,
      authorizingDatabaseArticles: true,
      years: [],
    });
  });

  it('should trigger UseEffect and load failure', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemeCatalogFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadThemeCatalogFailure.mock.calls.length).toBe(1);
    expect(props.loadThemeCatalogFailure.mock.calls[0][0]).toEqual("error");
  });

  it('should handle save changes from catalog component', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadThemeCatalogFailure.mockClear();
    const catalog: ShallowWrapper = enzymeWrapper.find('Catalog');
    catalog.simulate('saveChanges');
    expect(props.loadThemeCatalogSuccess.mock.calls.length).toBe(1);
  });
});
