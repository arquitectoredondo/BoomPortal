import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NewsDetails, NewsDetailsProps } from './news-details';

Enzyme.configure({ adapter: new Adapter() });

const mockNewsDetails = {
  id: 'ecec51a63207d6',
  title: 'Asdf qwerty',
  eventDate: '2020-05-20',
  visibleOn: '2020-05-17',
  hideOn: '2020-05-21',
  description: '<div>hola</div>',
  image: 'iVBORw0KGgoAAAANSUhEUgAAAwAAAAF9CAIAAAA8wJ',
  canRevert: true,
  relatedPublications: [
    {
      author: 'Boeve, Marlon,Groothuijse, Frank',
      id: 'd88d4f58-77e5-4015-a956-151c5ad3e11a',
      title:
        'Citizen Participation in the Dutch Environment and Planning Act: Participation without (serious) legal obligation',
      type: 'journal-article',
      uuid: 'ad5deb',
    },
  ],
  assignedTaxonomies: [
    {
      uuid: 'efe947f6c0804c03aa9b38ec9888fe14',
      value: 'JU',
      description: 'Juridisch',
      level: 0,
      child: [
        {
          uuid: 'b906201dd8ec438b8e168f9572b50195',
          value: 'JUARSR',
          description: 'Arbeidsrecht en socialezekerheidsrecht',
          parent: 'JU',
          level: 1,
          child: [
            {
              uuid: '6b48b5d2dbbf4b8a8232d5ae7b58dd4e',
              value: 'JUARSRAOZ',
              description: 'Arbeidsongeschiktheid en ziekte',
              parent: 'JUARSR',
              level: 2,
              child: [],
            },
          ],
        },
      ],
    },
  ],
  portalTaxonomyTree: [
    {
      uuid: 'efe947f6c0804c03aa9b38ec9888fe14',
      value: 'JU',
      description: 'Juridisch',
      level: 0,
      child: [
        {
          uuid: 'b906201dd8ec438b8e168f9572b50195',
          value: 'JUARSR',
          description: 'Arbeidsrecht en socialezekerheidsrecht',
          parent: 'JU',
          level: 1,
          child: [
            {
              uuid: '6b48b5d2dbbf4b8a8232d5ae7b58dd4e',
              value: 'JUARSRAOZ',
              description: 'Arbeidsongeschiktheid en ziekte',
              parent: 'JUARSR',
              level: 2,
              child: [],
            },
          ],
        },
      ],
    },
  ],
};

const initProps: NewsDetailsProps = {
  loadNewsDetails: jest.fn(),
  loadNewsDetailsSuccess: jest.fn(),
  loadNewsDetailsFailure: jest.fn(),
  closeErrorNewsDetails: jest.fn(),
  loadNewsTaxonomySuccess: jest.fn(),
  loadNewsPublicationsSuccess: jest.fn(),
  errorMsg: '',
  newData: mockNewsDetails,
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
  getNewDetails: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: mockNewsDetails,
    })
  ),
  // .mockImplementationOnce(() => Promise.reject()),
  getTaxonomyLowerLevel: jest.fn().mockReturnValue('uuid'),
  revertNewDetails: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  publishNewDetails: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
  saveNewDetailsPublications: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails,
      })
    ),
  saveNewDetailsTaxonomy: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails.assignedTaxonomies,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockNewsDetails.assignedTaxonomies,
      })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<NewsDetails {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('NewsDetails', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper, props } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
    props.loadNewsDetails.mockClear();
  });

  it('should load data success', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetails.mock.calls.length).toBe(1);
    expect(props.loadNewsDetailsSuccess.mock.calls.length).toBe(1);
    props.loadNewsDetails.mockClear();
    props.loadNewsDetailsSuccess.mockClear();
  });

  it('should open edit on click', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#edit-button');
    cancelButton.simulate('click');
    expect(props.loadNewsDetails.mock.calls.length).toBe(0);
  });

  it('should revert on click', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const revert: ShallowWrapper = enzymeWrapper.find('#revert-button');
    revert.simulate('click');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsSuccess.mock.calls.length).toBe(1);
    props.loadNewsDetailsSuccess.mockClear();
  });

  it('should revert on click failure', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const revert: ShallowWrapper = enzymeWrapper.find('#revert-button');
    revert.simulate('click');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsFailure.mock.calls.length).toBe(1);
    props.loadNewsDetailsFailure.mockClear();
  });

  it('should publish on click', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const publish: ShallowWrapper = enzymeWrapper.find('#publish-button');
    publish.simulate('click');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsSuccess.mock.calls.length).toBe(1);
    props.loadNewsDetailsSuccess.mockClear();
    props.loadNewsDetailsFailure.mockClear();
  });

  it('should publish on click failure', async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const publish: ShallowWrapper = enzymeWrapper.find('#publish-button');
    publish.simulate('click');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.closeErrorNewsDetails.mock.calls.length).toBe(1);
    props.loadNewsDetailsFailure.mockClear();
    props.loadNewsDetailsFailure.mockClear();
  });

  it('should save publication add', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);
    const relatedPublications: ShallowWrapper = enzymeWrapper.find(
      'RelatedPublications'
    );
    relatedPublications.simulate('add', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsSuccess.mock.calls.length).toBe(1);
    props.loadNewsDetailsSuccess.mockClear();
    props.loadNewsDetailsFailure.mockClear();
  });

  it('should save publication add failure', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);
    const relatedPublications: ShallowWrapper = enzymeWrapper.find(
      'RelatedPublications'
    );
    relatedPublications.simulate('add', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsFailure.mock.calls.length).toBe(1);
    props.loadNewsDetailsFailure.mockClear();
    props.loadNewsDetailsSuccess.mockClear();
  });

  it('should remove publication', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);
    const relatedPublications: ShallowWrapper = enzymeWrapper.find(
      'RelatedPublications'
    );
    relatedPublications.simulate('remove', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsSuccess.mock.calls.length).toBe(1);
    props.loadNewsDetailsSuccess.mockClear();
    props.loadNewsDetailsFailure.mockClear();
  });

  it('should add taxonomy', async () => {
    const { enzymeWrapper, props } = setup({
      loadNewsTaxonomySuccess: jest.fn(),
      loadNewsDetails: jest.fn(),
      loadNewsDetailsFailure: jest.fn(),
    });
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    relatedTaxonomy.simulate('add', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsTaxonomySuccess.mock.calls.length).toBe(1);
    props.loadNewsTaxonomySuccess.mockClear();
  });

  it('should add taxonomy failure', async () => {
    const { enzymeWrapper, props } = setup({
      loadNewsDetailsFailure: jest.fn(),
      loadNewsDetails: jest.fn(),
    });
    const relatedTaxonomy: ShallowWrapper = enzymeWrapper.find(
      'RelatedTaxonomy'
    );
    relatedTaxonomy.simulate('add', 'id');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetailsFailure.mock.calls.length).toBe(1);
    props.loadNewsDetailsFailure.mockClear();
  });
});
