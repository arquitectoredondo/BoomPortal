import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MenuSelector from './menu-selector';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  items: [],
  onReorderItems: jest.fn(),
  onDeleteItem: jest.fn(),
  onAddItem: jest.fn(),
  onSelectHomepage: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<MenuSelector {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('MenuSelector', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should emit open event when clicked', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onAddItem.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#add-item-button');
    cancelButton.simulate('click');
    expect(props.onAddItem.mock.calls.length).toBe(1);
    expect(props.onAddItem.mock.calls[0][0]).toBe();
  });

  it('should emit reorderItems with correct indexes on correct drag', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onReorderItems.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('DragDropContext');
    cancelButton.simulate('dragEnd', {
      source: { index: 0 },
      destination: { index: 1 },
    });
    expect(props.onReorderItems.mock.calls.length).toBe(1);
    expect(props.onReorderItems.mock.calls[0][0]).toBe(props.items, 0, 1);
  });

  it('should not emit reorderItems on incorrect drag', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onReorderItems.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('DragDropContext');
    cancelButton.simulate('dragEnd', {});
    expect(props.onReorderItems.mock.calls.length).toBe(0);
  });

  it('should select homepage on click', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onReorderItems.mockClear();
    const homepage: ShallowWrapper = enzymeWrapper.find('#select-home-page');
    homepage.simulate('click');
    expect(props.onSelectHomepage.mock.calls.length).toBe(1);
  });

  it('should be disabled adding menuItems over 7', () => {
    const { enzymeWrapper } = setup({ ...initProps, items: [{}, {}, {}, {}, {}, {}, {}] });
    const addButton: ShallowWrapper = enzymeWrapper.find('#add-item-button');
    expect(addButton.prop('className')).toBe('disabled-item');
  });
});
