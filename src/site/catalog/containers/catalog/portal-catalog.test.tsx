import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PortalCatalogComponent } from './portal-catalog';

Enzyme.configure({ adapter: new Adapter() });

const mockPortalCatalog = {
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
  themeIsSelected: jest.fn(),
  resetThemeSettings: jest.fn(),
  loadPortalCatalog: jest.fn(),
  loadPortalCatalogSuccess: jest.fn(),
  loadPortalCatalogFailure: jest.fn(),
  savePortalCatalog: jest.fn(),
  loading: false,
  error: false,
  portalCatalog: mockPortalCatalog,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '123' }),
}));

jest.mock('../../services/portal-catalog.service', () => ({
  getPortalCatalog: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockPortalCatalog,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  getYearsList: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [2020, 2028],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  saveDraftPortalCatalog: jest.fn().mockReturnValue(
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
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <PortalCatalogComponent {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('PortalCatalogComponent', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for portal catalog success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadPortalCatalogSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadPortalCatalogSuccess.mock.calls.length).toBe(1);
    expect(props.loadPortalCatalogSuccess.mock.calls[0][0]).toEqual({
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
    props.loadPortalCatalogFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadPortalCatalogFailure.mock.calls.length).toBe(1);
    expect(props.loadPortalCatalogFailure.mock.calls[0][0]).toEqual('error');
  });

  it('should handle save changes from catalog component', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadPortalCatalogFailure.mockClear();
    const catalog: ShallowWrapper = enzymeWrapper.find('Catalog');
    catalog.simulate('saveChanges');
    expect(props.loadPortalCatalogSuccess.mock.calls.length).toBe(1);
  });
});
