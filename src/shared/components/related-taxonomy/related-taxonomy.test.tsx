import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RelatedTaxonomy from './related-taxonomy';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '234' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../../site/news/services/news.service', () => ({
  getSelectedChilds: jest.fn().mockReturnValue([
    {
      child: [],
      description: 'Juridisch2',
      level: 0,
      uuid: '2',
      value: 'JU',
    },
  ]),
}));

jest.mock('../../../shared/services/utils', () => ({
  useNotOnMountEffect: jest.fn().mockReturnValue((f: any) => f()),
}));

const initProps: any = {
  selectedTaxonomy: {
    child: [
      {
        child: [
          {
            child: [],
            description: 'Juridisch3',
            level: 0,
            uuid: '1',
            value: 'JU',
          },
        ],
        description: 'Juridisch2',
        level: 0,
        uuid: '2',
        value: 'JU',
      },
    ],
    description: 'Juridisch',
    level: 0,
    uuid: '3',
    value: 'JU',
  },
  taxonomyTree: [
    {
      child: [
        {
          child: [
            {
              child: [],
              description: 'Juridisch1',
              level: 0,
              uuid: '1',
              value: 'JU',
            },
          ],
          description: 'Juridisch2',
          level: 0,
          uuid: '2',
          value: 'JU',
        },
      ],
      description: 'Juridisch3',
      level: 0,
      uuid: '3',
      value: 'JU',
    },
  ],
  onChange: jest.fn(),
  onRemove: jest.fn(),
  onAdd: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<RelatedTaxonomy {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('RelatedTaxonomy', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render self and subcomponents without taxonomyTree', () => {
    const { enzymeWrapper } = setup({ ...initProps, taxonomyTree: undefined });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should domain change', () => {
    const { enzymeWrapper } = setup(initProps);
    const select: ShallowWrapper = enzymeWrapper.find('#domain-taxonomy');
    select.simulate('change', {
      target: { value: '1' },
    });
    const selectChanged: ShallowWrapper = enzymeWrapper.find(
      '#domain-taxonomy'
    );
    expect(selectChanged.prop('value')).toEqual('1');
  });

  it('should category change', () => {
    const { enzymeWrapper } = setup(initProps);
    const select: ShallowWrapper = enzymeWrapper.find('#category-taxonomy');
    select.simulate('change', {
      target: { value: '2' },
    });
    const selectChanged: ShallowWrapper = enzymeWrapper.find(
      '#category-taxonomy'
    );
    expect(selectChanged.prop('value')).toEqual('2');
  });

  it('should subject change', () => {
    const { enzymeWrapper } = setup(initProps);
    const select: ShallowWrapper = enzymeWrapper.find('#subject-taxonomy');
    select.simulate('change', {
      target: { value: '3' },
    });
    const selectChanged: ShallowWrapper = enzymeWrapper.find(
      '#subject-taxonomy'
    );
    expect(selectChanged.prop('value')).toEqual('3');
  });

  it('should select correctly the taxonomy when init', () => {
    const { enzymeWrapper } = setup(initProps);
    const selectD: ShallowWrapper = enzymeWrapper.find('#domain-taxonomy');
    const selectC: ShallowWrapper = enzymeWrapper.find('#category-taxonomy');
    const selectS: ShallowWrapper = enzymeWrapper.find('#subject-taxonomy');

    expect(selectD.prop('value')).toEqual('3');
    expect(selectC.prop('value')).toEqual('2');
    expect(selectS.prop('value')).toEqual('1');
  });

  it('should select correctly the taxonomy when init empty', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      selectedTaxonomy: undefined,
    });
    const selectD: ShallowWrapper = enzymeWrapper.find('#domain-taxonomy');
    const selectC: ShallowWrapper = enzymeWrapper.find('#category-taxonomy');
    const selectS: ShallowWrapper = enzymeWrapper.find('#subject-taxonomy');

    expect(selectD.prop('value')).toEqual('');
    expect(selectC.prop('value')).toEqual('');
    expect(selectS.prop('value')).toEqual('');
  });

  it('should select correctly the taxonomy without subject when init empty', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      selectedTaxonomy: {
        child: [
          {
            child: [],
            description: 'Juridisch2',
            level: 0,
            uuid: '2',
            value: 'JU',
          },
        ],
        description: 'Juridisch',
        level: 0,
        uuid: '3',
        value: 'JU',
      },
    });
    const selectD: ShallowWrapper = enzymeWrapper.find('#domain-taxonomy');
    const selectC: ShallowWrapper = enzymeWrapper.find('#category-taxonomy');
    const selectS: ShallowWrapper = enzymeWrapper.find('#subject-taxonomy');

    expect(selectD.prop('value')).toEqual('3');
    expect(selectC.prop('value')).toEqual('2');
    expect(selectS.prop('value')).toEqual('');
  });

  it('should remove on click', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const trashButton: ShallowWrapper = enzymeWrapper.find('FontAwesomeIcon');
    trashButton.simulate('click');
    expect(props.onRemove.mock.calls.length).toEqual(1);
    props.onRemove.mockClear();
  });

  it('should not remove on click if its add', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      onRemove: undefined,
    });
    const trashButton: ShallowWrapper = enzymeWrapper.find('FontAwesomeIcon');
    trashButton.simulate('click');
    expect(props.onRemove).toEqual(undefined);
  });
});
