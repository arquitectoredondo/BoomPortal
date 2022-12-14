import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Catalog from './catalog';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  data: undefined,
  onSaveChanges: jest.fn(),
  yearList: [],
};

const mockCatalog = {
  uuid: 'id',
  publications: [{ title: 'title', author: ['author'], type: 'book' }],
  openAccess: false,
  authorizingEbooks: true,
  authorizingJournals: false,
  authorizingJournalArticles: false,
  authorizingDatabases: false,
  authorizingDatabaseArticles: false,
  years: [2020],
  taxonomyTree: [],
  assignedTaxonomies: [],
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Catalog {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Catalog', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should place correctly already loaded fields', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const openAccesSwitch: ShallowWrapper = enzymeWrapper.find(
      '#allContent-switch'
    );
    expect(openAccesSwitch.prop('checked')).toBe(true);
    const bookCheckbox: ShallowWrapper = enzymeWrapper.find('#book-checkbox');
    expect(bookCheckbox.prop('checked')).toBe(true);

    const journalCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#journal-checkbox'
    );
    expect(journalCheckbox.prop('checked')).toBe(false);

    const journalArticleCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#journalArticle-checkbox'
    );
    expect(journalArticleCheckbox.prop('checked')).toBe(false);

    const dataBaseCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#database-checkbox'
    );
    expect(dataBaseCheckbox.prop('checked')).toBe(false);

    const databaseArticle: ShallowWrapper = enzymeWrapper.find(
      '#databaseArticle-checkbox'
    );
    expect(databaseArticle.prop('checked')).toBe(false);

    const yearSelected: ShallowWrapper = enzymeWrapper.find('#year-selected');
    expect(yearSelected.prop('value')).toBe(2020);

    const yearSelector: ShallowWrapper = enzymeWrapper.find('#year-selector');
    expect(yearSelector.prop('value')).toBe(undefined);

    const publicationTitle: ShallowWrapper = enzymeWrapper.find(
      '#publication-title'
    );
    expect(publicationTitle.text()).toEqual('title');
    const publicationAuthor: ShallowWrapper = enzymeWrapper.find(
      '#publication-author'
    );
    expect(publicationAuthor.text()).toEqual('author');
    const publicationType: ShallowWrapper = enzymeWrapper.find(
      '#publication-type'
    );
    expect(publicationType.text()).toEqual('book');
  });

  it('should handle changes on the fields', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const openAccesSwitch: ShallowWrapper = enzymeWrapper.find(
      '#allContent-switch'
    );
    openAccesSwitch.simulate('change', { target: { value: true } });

    const bookCheckbox: ShallowWrapper = enzymeWrapper.find('#book-checkbox');
    bookCheckbox.simulate('change', { target: { value: false } });

    const journalCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#journal-checkbox'
    );
    journalCheckbox.simulate('change', { target: { value: true } });

    const journalArticleCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#journalArticle-checkbox'
    );
    journalArticleCheckbox.simulate('change', { target: { value: true } });

    const dataBaseCheckbox: ShallowWrapper = enzymeWrapper.find(
      '#database-checkbox'
    );
    dataBaseCheckbox.simulate('change', { target: { value: true } });

    const databaseArticle: ShallowWrapper = enzymeWrapper.find(
      '#databaseArticle-checkbox'
    );
    databaseArticle.simulate('change', { target: { value: true } });

    const searchBar: ShallowWrapper = enzymeWrapper.find('SearchBar');
    searchBar.simulate('addPublications', {
      value: { title: 'title', author: ['author'], type: 'book' },
    });
    expect(props.onSaveChanges.mock.calls.length).toBe(0);
  });

  it('should add taxonomy', async () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    relatedTaxonomy.simulate('add', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    relatedTaxonomy.simulate('remove', 'id');
  });

  it('should remove taxonomy', async () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      yearList: [2013],
      data: {
        uuid: 'id',
        publications: [{ title: 'title', author: ['author'], type: 'book' }],
        openAccess: false,
        authorizingEbooks: true,
        authorizingJournals: false,
        authorizingJournalArticles: false,
        authorizingDatabases: false,
        authorizingDatabaseArticles: false,
        years: [],
        taxonomyTree: [],
        assignedTaxonomies: [],
      },
    });
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    relatedTaxonomy.simulate('remove', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
  });

  it('should add a yearFilter', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const addYearButton: ShallowWrapper = enzymeWrapper.find('#addYear-button');
    addYearButton.simulate('click');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.onSaveChanges.mock.calls.length).toBe(0);
  });

  it('should add a yearFilter', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      yearList: [2013],
      data: {
        uuid: 'id',
        publications: [{ title: 'title', author: ['author'], type: 'book' }],
        openAccess: false,
        authorizingEbooks: true,
        authorizingJournals: false,
        authorizingJournalArticles: false,
        authorizingDatabases: false,
        authorizingDatabaseArticles: false,
        years: [],
        taxonomyTree: [],
        assignedTaxonomies: [],
      },
    });
    const addYearButton: ShallowWrapper = enzymeWrapper.find('#addYear-button');
    addYearButton.simulate('click');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.onSaveChanges.mock.calls.length).toBe(0);
  });

  it('should delete a year', async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const addYearButton: ShallowWrapper = enzymeWrapper.find(
      '#deleteYear-button'
    );
    addYearButton.simulate('click', 'id');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.onSaveChanges.mock.calls.length).toBe(0);
  });

  it('should handle a year change', async () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      data: {
        uuid: 'id',
        publications: [{ title: 'title', author: ['author'], type: 'book' }],
        openAccess: false,
        authorizingEbooks: true,
        authorizingJournals: false,
        authorizingJournalArticles: false,
        authorizingDatabases: false,
        authorizingDatabaseArticles: false,
        years: [],
        taxonomyTree: [],
        assignedTaxonomies: [],
      },
    });
    const yearSelector: ShallowWrapper = enzymeWrapper.find('#year-selector');
    yearSelector.simulate('change', { target: { value: 2020 } });

    const addYearButton: ShallowWrapper = enzymeWrapper.find('#addYear-button');
    addYearButton.simulate('click');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    const yearSelected: ShallowWrapper = enzymeWrapper.find('#year-selected');
    expect(yearSelected).toBeTruthy();
    const yearDisplay: ShallowWrapper = enzymeWrapper.find('#year-display');
    expect(yearDisplay).toBeTruthy();
  });

  it('should delete publication', async () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      data: mockCatalog,
    });
    const deletePublication: ShallowWrapper = enzymeWrapper.find(
      '#deletePublication-button'
    );
    deletePublication.simulate('click', 'index');
  });

  it('should call initTaxonomy on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    expect(relatedTaxonomy).toBeTruthy();
  });

  it('should call initTaxonomy on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup({
      ...initProps,
      yearList: [2013],
      data: {
        uuid: 'id',
        publications: [{ title: 'title', author: ['author'], type: 'book' }],
        openAccess: false,
        authorizingEbooks: true,
        authorizingJournals: false,
        authorizingJournalArticles: false,
        authorizingDatabases: false,
        authorizingDatabaseArticles: false,
        years: [],
        taxonomyTree: [],
        assignedTaxonomies: [
          {
            uuid: 'c2cad5529cdc48f7be9b6d8a31e9a1f5',
            value: 'JU',
            description: 'Juridisch',
            level: 0,
            child: [
              {
                uuid: '0635f2d1e04542bab97aa13283fa6a89',
                value: 'JUARSR',
                description: 'Arbeidsrecht en socialezekerheidsrecht',
                parent: 'JU',
                level: 1,
                child: [],
              },
            ],
          },
        ],
      },
    });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    expect(relatedTaxonomy).toBeTruthy();
  });

  it('should display the list of years', async () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      yearList: [2013],
      data: {
        uuid: 'id',
        publications: [{ title: 'title', author: ['author'], type: 'book' }],
        openAccess: false,
        authorizingEbooks: true,
        authorizingJournals: false,
        authorizingJournalArticles: false,
        authorizingDatabases: false,
        authorizingDatabaseArticles: false,
        years: [],
        taxonomyTree: [],
        assignedTaxonomies: [],
      },
    });
    const yearList: ShallowWrapper = enzymeWrapper.find('#year-display');
    expect(yearList.text()).toEqual('2013');
  });
});
