import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './search-bar';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  onAddPublications: jest.fn(),
  isPortal: true,
  isWidget: false,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<SearchBar {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ themeId: '123' }),
}));

jest.mock('../../services/utils', () => ({
  useNotOnMountEffect: jest.fn().mockImplementationOnce((f: any) => f()),
}));

jest.mock('../../../site/pages/services/page-details.service', () => ({
  searchPortalWidgetPublication: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

jest.mock('../../../site/catalog/services/portal-catalog.service', () => ({
  searchPublication: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

jest.mock('../../../site/themes/services/themeCatalog.service', () => ({
  searchThemePublication: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

describe('SearchBar', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should handle init component with effect success', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const autocomplete: ShallowWrapper = enzymeWrapper.find('#search');
    autocomplete.simulate('change', { target: { value: 'text' } });
    expect(props.onAddPublications.mock.calls.length).toBe(0);
  });

  it('should handle init component with effect success 2', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      isPortal: true,
      isWidget: true,
    });
    const autocomplete: ShallowWrapper = enzymeWrapper.find('#search');
    autocomplete.simulate('change', { target: { value: 'text' } });
    expect(props.onAddPublications.mock.calls.length).toBe(0);
  });

  it('should handle init component with effect success 3', () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      isPortal: false,
      isWidget: true,
    });
    const autocomplete: ShallowWrapper = enzymeWrapper.find('#search');
    autocomplete.simulate('change', { target: { value: 'text' } });
    expect(props.onAddPublications.mock.calls.length).toBe(0);
  });

  it('should handle search change', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const autocomplete: ShallowWrapper = enzymeWrapper.find('#search');
    autocomplete.simulate('change', { target: { value: 'text' } });
    expect(props.onAddPublications.mock.calls.length).toBe(0);
  });
});
