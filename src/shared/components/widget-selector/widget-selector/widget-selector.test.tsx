import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WidgetSelector from './widget-selector';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  onTypeSelected: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<WidgetSelector {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('WidgetSelector', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should trigger click when catalog widget clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const catalog: any = enzymeWrapper.find('#widget-catalog');
    expect(catalog.exists()).toBeTruthy();
    catalog.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('1');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when publications widget clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const publications: any = enzymeWrapper.find('#widget-publications');
    expect(publications.exists()).toBeTruthy();
    publications.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('2');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when search widget clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const search: any = enzymeWrapper.find('#widget-search');
    expect(search.exists()).toBeTruthy();
    search.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('3');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when kpi widget clicked', () => {
    const { enzymeWrapper, props } = setup({...initProps, type: 'portal'});
    const kpi: any = enzymeWrapper.find('#widget-kpi');
    expect(kpi.exists()).toBeTruthy();
    kpi.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('4');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when text widget clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const text: any = enzymeWrapper.find('#widget-text');
    expect(text.exists()).toBeTruthy();
    text.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('5');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when banner widget clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const banner: any = enzymeWrapper.find('#widget-banner');
    expect(banner.exists()).toBeTruthy();
    banner.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('6');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when taxonomy widget clicked', () => {
    const { enzymeWrapper, props } = setup({ ...initProps, type: 'portal' });
    const taxonomy: any = enzymeWrapper.find('#widget-taxonomy');
    expect(taxonomy.exists()).toBeTruthy();
    taxonomy.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('7');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when events widget clicked', () => {
    const { enzymeWrapper, props } = setup({ ...initProps, type: 'portal' });
    const events: any = enzymeWrapper.find('#widget-events');
    expect(events.exists()).toBeTruthy();
    events.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('8');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when news widget clicked', () => {
    const { enzymeWrapper, props } = setup({ ...initProps, type: 'portal' });
    const news: any = enzymeWrapper.find('#widget-news');
    expect(news.exists()).toBeTruthy();
    news.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('9');
    props.onTypeSelected.mockClear();
  });

  it('should trigger click when read on widget clicked', () => {
    const { enzymeWrapper, props } = setup({ ...initProps, type: 'portal' });
    const read: any = enzymeWrapper.find('#widget-read-on');
    expect(read.exists()).toBeTruthy();
    read.simulate('click');
    expect(props.onTypeSelected.mock.calls[0][0]).toEqual('10');
    props.onTypeSelected.mockClear();
  });
});
