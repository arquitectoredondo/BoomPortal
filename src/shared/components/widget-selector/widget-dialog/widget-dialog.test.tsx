import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WidgetDialog from './widget-dialog';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  onCloseDialog: jest.fn(),
  onSave: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<WidgetDialog {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('WidgetDialog', () => {
  it('should render self and subcomponents', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should close dialog when clicked outside of the window', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: any = enzymeWrapper.find('#main-dialog');
    dialog.simulate('close');
    const confirmDialogYes: any = enzymeWrapper.find(
      '#confirm-dialog .main-green-button'
    );
    confirmDialogYes.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    props.onCloseDialog.mockClear();
  });

  it('should close dialog when clicked on the cross at the header', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const crossButton: any = enzymeWrapper.find('#close-button');
    crossButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    props.onCloseDialog.mockClear();
  });

  it('should change type status when typeSelected', () => {
    const { props, enzymeWrapper } = setup(initProps);
    const typeSelector: any = enzymeWrapper.find('WidgetSelector');

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '1');
    const catalog: any = enzymeWrapper.find('#catalog');
    expect(catalog.exists()).toBeTruthy();
    catalog.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '2');
    const pub: any = enzymeWrapper.find('#publication');
    expect(pub.exists()).toBeTruthy();
    pub.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '3');
    const search: any = enzymeWrapper.find('#search');
    expect(search.exists()).toBeTruthy();
    search.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '4');
    const kpi: any = enzymeWrapper.find('#kpi');
    expect(kpi.exists()).toBeTruthy();
    search.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '5');
    const text: any = enzymeWrapper.find('#text');
    expect(text.exists()).toBeTruthy();
    text.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '6');
    const banner: any = enzymeWrapper.find('#banner');
    expect(banner.exists()).toBeTruthy();
    banner.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '7');
    const taxonomy: any = enzymeWrapper.find('#taxonomy');
    expect(taxonomy.exists()).toBeTruthy();
    taxonomy.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '8');
    const event: any = enzymeWrapper.find('#event');
    expect(event.exists()).toBeTruthy();
    event.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '9');
    const news: any = enzymeWrapper.find('#news');
    expect(news.exists()).toBeTruthy();
    news.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '10');
    const readOn: any = enzymeWrapper.find('#readOn');
    expect(readOn.exists()).toBeTruthy();
    readOn.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });

  it('should change type status when typeSelected with a widget selected', () => {
    const { props, enzymeWrapper } = setup({
      ...initProps,
      widgetSelected: { widgetType: 1 },
    });
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());

    const typeSelector: any = enzymeWrapper.find('WidgetSelector');

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '1');
    const catalog: any = enzymeWrapper.find('#catalog');
    expect(catalog.exists()).toBeTruthy();
    catalog.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '2');
    const pub: any = enzymeWrapper.find('#publication');
    expect(pub.exists()).toBeTruthy();
    pub.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '3');
    const search: any = enzymeWrapper.find('#search');
    expect(search.exists()).toBeTruthy();
    search.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '5');
    const text: any = enzymeWrapper.find('#text');
    expect(text.exists()).toBeTruthy();
    text.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '6');
    const banner: any = enzymeWrapper.find('#banner');
    expect(banner.exists()).toBeTruthy();
    banner.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '7');
    const taxonomy: any = enzymeWrapper.find('#taxonomy');
    expect(taxonomy.exists()).toBeTruthy();
    taxonomy.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '8');
    const event: any = enzymeWrapper.find('#event');
    expect(event.exists()).toBeTruthy();
    event.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    typeSelector.simulate('typeSelected', '9');
    const news: any = enzymeWrapper.find('#news');
    expect(news.exists()).toBeTruthy();
    news.simulate('cancel');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });

  it('should save banner when save event triggered', () => {
    const { enzymeWrapper, props } = setup(initProps);
    const typeSelector: any = enzymeWrapper.find('WidgetSelector');
    typeSelector.simulate('typeSelected', '6');
    const banner: any = enzymeWrapper.find('#banner');
    banner.simulate('save', { form: 'form' });
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({ form: 'form' });
  });
});
