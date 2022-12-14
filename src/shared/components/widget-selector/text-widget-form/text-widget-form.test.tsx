import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextWidgetForm from './text-widget-form';
import { PageWidget } from '../../../models/layout.model';

Enzyme.configure({ adapter: new Adapter() });
const mockBanner: PageWidget = {
  uuid: 'id',
  title: 'title',
  x: 0,
  y: 0,
  h: 3,
  w: 3,
  minH: 3,
  minW: 3,
  widgetType: 6,
  borderTop: true,
  borderRight: false,
  borderBottom: false,
  borderLeft: false,
};
const initProps: any = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  textWidgetData: mockBanner,
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<TextWidgetForm {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('TextWidgetForm', () => {
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
  it('should handle save button', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCancel.mockClear();

    const titleInput: ShallowWrapper = enzymeWrapper.find('#text-title');
    titleInput.simulate('change', {
      target: { value: 'title' },
    });
    const topBorder: ShallowWrapper = enzymeWrapper.find('#top-border');
    topBorder.simulate('click');
    const rightBorder: ShallowWrapper = enzymeWrapper.find('#right-border');
    rightBorder.simulate('click');
    const bottomBorder: ShallowWrapper = enzymeWrapper.find('#bottom-border');
    bottomBorder.simulate('click');
    const leftBorder: ShallowWrapper = enzymeWrapper.find('#left-border');
    leftBorder.simulate('click');
    const form: ShallowWrapper = enzymeWrapper.find('.widget-text-body');
    form.simulate('submit');
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      backgroundColor: undefined,
      title: {
        en: undefined,
        nl: undefined,
        undefined: 'title',
      },
      text: undefined,
      borderTop: true,
      borderRight: true,
      borderBottom: true,
      borderLeft: true,
      uuid: 'id',
      widgetType: 5,
      x: 0,
      y: 0,
      h: 3,
      w: 3,
      minH: 3,
      minW: 3,
      videoFormat: false,
    });
  });
  it('should handle render the textbannerdata in the fields', async () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper, props } = setup(initProps);

    props.onSave.mockClear();

    const titleInput: ShallowWrapper = enzymeWrapper.find('#text-title');
    expect(titleInput.prop('value')).toBe('');
    const form: ShallowWrapper = enzymeWrapper.find('.widget-text-body');
    form.simulate('submit');
    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      title: {},
      borderTop: false,
      borderRight: false,
      borderBottom: false,
      borderLeft: false,
      uuid: 'id',
      widgetType: 5,
      x: 0,
      y: 0,
      h: 3,
      w: 3,
      minH: 3,
      minW: 3,
      videoFormat: false,
    });
  });
  it('should handle save button when dialog opens empty', () => {
    const emptyProps: any = {
      open: true,
      onSave: jest.fn(),
      onCancel: jest.fn(),
    };
    const { enzymeWrapper, props } = setup(emptyProps);
    props.onCancel.mockClear();

    const titleInput: ShallowWrapper = enzymeWrapper.find('#text-title');
    titleInput.simulate('change', {
      target: { value: 'title' },
    });
    const form: ShallowWrapper = enzymeWrapper.find('.widget-text-body');
    form.simulate('submit');

    expect(props.onSave.mock.calls.length).toBe(1);
    expect(props.onSave.mock.calls[0][0]).toEqual({
      backgroundColor: undefined,
      title: {
        en: undefined,
        nl: undefined,
        undefined: 'title',
      },
      text: undefined,
      borderTop: false,
      borderRight: false,
      borderBottom: false,
      borderLeft: false,
      widgetType: 5,
      videoFormat: false,
    });
  });
});
