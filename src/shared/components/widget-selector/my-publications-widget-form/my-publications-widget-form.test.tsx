import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PageWidget } from '../../../models/layout.model';
import MyPublicationsWidgetForm from './my-publications-widget-form';

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
  widgetType: 12,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
};
const initProps: any = {
  open: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
  myPublicationsWidgetData: mockBanner,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <MyPublicationsWidgetForm {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('MyPublicationsWidgetForm', () => {
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
    const form: ShallowWrapper = enzymeWrapper.find(
      '.my-publications-widget-body'
    );
    form.simulate('submit');
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      title: {},
      text: {},
      titleNotLogged: {},
      noAvailablePublications: {},
      catalogLink: {},
      activationTitle: {},
      activationDescription: {},
      activationFieldPlaceholder: {},
      uuid: 'id',
      x: 0,
      y: 0,
      h: 3,
      w: 3,
      minH: 3,
      minW: 3,
      widgetType: 12,
      borderTop: true,
      borderRight: true,
      borderBottom: true,
      borderLeft: true,
    });
  });
});
