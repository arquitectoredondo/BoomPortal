import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { WidgetElement } from './widget-element';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  widget: {
    title: 'title',
    id: 'ead4a9a74a6648e1b7fe8d7d207a7d2b',
    name: 'Widget_2',
    description: null,
    image: null,
    preview: null,
    sourceUrl: null,
    widgetType: 3,
    minH: 2,
    minW: 2,
  },
  onDeleteWidget: jest.fn(),
  onEditWidget: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<WidgetElement {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('WidgetElement', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render self and subcomponents with type 7', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      widget: { widgetType: 7, title: undefined },
    });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render self and subcomponents with type 7', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      widget: { widgetType: 3, title: undefined },
    });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render self and subcomponents with type 5', () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      widget: { widgetType: 5, title: undefined },
    });
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should change type status when typeSelected with a widget selected', () => {
    const { props, enzymeWrapper } = setup(initProps);

    const editButton: any = enzymeWrapper.find('#edit-button');
    editButton.simulate('click');
    expect(props.onEditWidget.mock.calls.length).toBe(1);
  });

  it('should open delete dialog', () => {
    const { enzymeWrapper } = setup(initProps);

    const deleteButton: any = enzymeWrapper.find('#delete-button');
    deleteButton.simulate('click');
    const deleteDialog: any = enzymeWrapper.find('ConfirmActionDialog');
    expect(deleteDialog.prop('open')).toBe(true);
  });
});
