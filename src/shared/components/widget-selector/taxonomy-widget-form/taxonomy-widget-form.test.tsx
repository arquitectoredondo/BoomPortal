import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PageWidget } from '../../../models/layout.model';
import TaxonomyWidgetForm from './taxonomy-widget-form';

Enzyme.configure({ adapter: new Adapter() });
const mockBanner: PageWidget = {
  uuid: 'id',
  x: 0,
  y: 0,
  h: 3,
  w: 3,
  minH: 3,
  minW: 3,
  taxonomySource: 1,
  sortBy: 2,
  backgroundColor: 'red',
  widgetType: 7,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
};
const initProps: any = {
  open: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
  taxonomyWidgetData: mockBanner,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <TaxonomyWidgetForm {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('TaxonomyWidgetForm', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
  it('should handle close dialog without save', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCancel.mock.calls.length).toBe(1);
  });
  it('should handle save button', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();
    const colorButton: ShallowWrapper = enzymeWrapper.find('#background-color');
    colorButton.simulate('click');
    const topBorder: ShallowWrapper = enzymeWrapper.find('#top-border');
    topBorder.simulate('click');
    const rightBorder: ShallowWrapper = enzymeWrapper.find('#right-border');
    rightBorder.simulate('click');
    const bottomBorder: ShallowWrapper = enzymeWrapper.find('#bottom-border');
    bottomBorder.simulate('click');
    const leftBorder: ShallowWrapper = enzymeWrapper.find('#left-border');
    leftBorder.simulate('click');
    const form: ShallowWrapper = enzymeWrapper.find(".taxonomy-widget-body");
    form.simulate("submit");
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      uuid: 'id',
      x: 0,
      y: 0,
      h: 3,
      w: 3,
      minH: 3,
      minW: 3,
      backgroundColor: 'red',
      widgetType: 7,
      borderTop: false,
      borderRight: false,
      borderBottom: false,
      borderLeft: false,
    });
  });
});
