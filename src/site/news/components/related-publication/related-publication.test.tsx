import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RelatedPublication from './related-publication';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '234' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/news.service', () => ({
  searchNewsPublications: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 'string;',
            title: 'ring;',
            author: 'string;',
            type: 'string;',
            uuid: 'string;',
          },
        ],
      })
    )
    .mockImplementationOnce(() => Promise.reject())
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 'string;',
            title: 'ring;',
            author: 'string;',
            type: 'string;',
            uuid: 'string;',
          },
        ],
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 'string;',
            title: 'ring;',
            author: 'string;',
            type: 'string;',
            uuid: 'string;',
          },
        ],
      })
    ),
}));

const initProps: any = {
  relatedPublications: [
    {
      id: '0',
      title: 'title',
      author: 'author',
      type: 'type',
    },
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <RelatedPublication {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('RelatedPublication', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should load list of books on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const publications: ShallowWrapper = enzymeWrapper.find('#publications');
    expect(publications.length).toBe(1);
  });

  it('should load list of books on init failure', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup({
      ...initProps,
      relatedPublications: undefined,
    });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const publications: ShallowWrapper = enzymeWrapper.find('#publications');
    expect(publications.length).toBe(0);
  });

  it('should load empty list of books on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup({ ...initProps, relatedPublications: [] });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const publications: ShallowWrapper = enzymeWrapper.find('#publications');
    expect(publications.length).toBe(0);
  });

  it('should trigger remove', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const removeButton: ShallowWrapper = enzymeWrapper.find('FontAwesomeIcon');
    removeButton.simulate('click');
    expect(props.onRemove.mock.calls.length).toBe(1);
  });

  it('should handle selection empty', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const search: ShallowWrapper = enzymeWrapper.find('#search');
    search.simulate('change', { event: undefined, value: undefined });
    expect(props.onAdd.mock.calls.length).toBe(0);
    props.onAdd.mockClear();
  });

  it('should handle selection', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    const search: ShallowWrapper = enzymeWrapper.find('#search');
    search.simulate('change', undefined, 'value');
    expect(props.onAdd.mock.calls.length).toBe(1);
    props.onAdd.mockClear();
  });
});
