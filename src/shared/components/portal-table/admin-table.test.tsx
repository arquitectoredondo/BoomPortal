import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AdminTable, { AdminTableProps } from './admin-table';

Enzyme.configure({ adapter: new Adapter() });

const initProps: AdminTableProps = {
  headers: [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Value',
      value: 'value'
    }
  ],
  data: [
    {
      name: 'name1',
      value: 'value1'
    }
  ],
  onRowClicked: jest.fn()
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<AdminTable {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Admin table', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should show as much column headers as prop headers', () => {
    const { enzymeWrapper } = setup(initProps);
    const headers: ShallowWrapper = enzymeWrapper.find('#admin-table-header');
    expect(headers.exists()).toBeTruthy();
    expect(headers.length).toBe(2);
  });

  it('should show as much column rows as prop data', () => {
    const { enzymeWrapper } = setup(initProps);
    const rowCells: ShallowWrapper = enzymeWrapper.find('#admin-table-row');
    expect(rowCells.exists()).toBeTruthy();
    expect(rowCells.length).toBe(1);
  });
});
