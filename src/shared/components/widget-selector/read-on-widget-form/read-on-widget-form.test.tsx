import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PageWidget } from '../../../models/layout.model';
import ReadOnWidgetForm from './read-on-widget-form';

Enzyme.configure({ adapter: new Adapter() });
const mockBanner: PageWidget = {
  uuid: 'id',
  x: 0,
  y: 0,
  h: 3,
  w: 3,
  minH: 3,
  minW: 3,
  title: 'title',
  backgroundColor: 'red',
  widgetType: 10,
  vertical: false,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
};
const initProps: any = {
  open: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
  readOnWidgetData: mockBanner,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ themeId: '123' }),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ReadOnWidgetForm {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('ReadOnWidgetFormForm', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should call for portal settings success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    setup(initProps);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
  });

  it('should call for portal settings success on init', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    setup({ ...initProps, catalogWidgetData: undefined });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
  });

  it('should handle close dialog without save', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCancel.mock.calls.length).toBe(1);
  });

  it('should handle close dialog saving', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onSave.mockClear();

    const form: ShallowWrapper = enzymeWrapper.find(".widget-catalog-body");
    form.simulate("submit");
    expect(props.onSave.mock.calls.length).toBe(1);
  });

  it('should handle changes', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();

    const text: ShallowWrapper = enzymeWrapper.find('#text-title');
    text.simulate('change', { target: { value: 'text' } });
    const text2: ShallowWrapper = enzymeWrapper.find('#text-title');
    expect(text2.prop('value')).toEqual('text');

    const backColor: ShallowWrapper = enzymeWrapper.find('#background-color');
    backColor.simulate('click');

    const topBorder: ShallowWrapper = enzymeWrapper.find('#top-border');
    topBorder.simulate('click');

    const rightBorder: ShallowWrapper = enzymeWrapper.find('#right-border');
    rightBorder.simulate('click');

    const bottomBorder: ShallowWrapper = enzymeWrapper.find('#bottom-border');
    bottomBorder.simulate('click');

    const leftBorder: ShallowWrapper = enzymeWrapper.find('#left-border');
    leftBorder.simulate('click');
  });
});
