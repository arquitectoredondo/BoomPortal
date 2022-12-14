import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NewsCreation } from './news-creation';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  loadNewsDetails: jest.fn(),
  loadNewsDetailsFailure: jest.fn(),
  newData: undefined,
  loading: false,
  error: false,
};

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: '234' }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../services/news.service', () => ({
  createUpdateNew: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ data: { id: '123', title: 'label' } })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: 'error' } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<NewsCreation {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('NewsCreation', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should not load data if accesed as edit mode', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);

    const title: ShallowWrapper = enzymeWrapper.find('#new-title');
    expect(title.prop('value')).toEqual('');
  });

  it('should load data if accesed as edit mode', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup({
      ...initProps,
      newData: {
        id: 'createdMockId',
        title: 'title',
        image: '',
        description: '<p>content</p>',
        visibleOn: new Date(),
        eventDate: new Date('01/01/2019'),
        hideOn: new Date(),
      },
    });

    const title: ShallowWrapper = enzymeWrapper.find('#new-title');
    expect(title.prop('value')).toEqual('title');
  });

  it('should handleChanges and update newData', () => {
    const { enzymeWrapper } = setup(initProps);

    const title: ShallowWrapper = enzymeWrapper.find('#new-title');
    title.simulate('change', { target: { value: 'name' } });

    const image: ShallowWrapper = enzymeWrapper.find('#news-logo-button-file');
    image.simulate('change', {
      target: { files: [new File([''], 'file', { type: 'text/html' })] },
    });

    const picker1: ShallowWrapper = enzymeWrapper.find('#picker1');
    picker1.simulate('change', new Date('1995-12-18T03:24:00'));

    const picker2: ShallowWrapper = enzymeWrapper.find('#picker2');
    picker2.simulate('change', new Date('1995-12-19T03:24:00'));

    const picker3: ShallowWrapper = enzymeWrapper.find('#picker3');
    picker3.simulate('change', new Date('1995-12-20T03:24:00'));

    const titleChanged: ShallowWrapper = enzymeWrapper.find('#new-title');
    expect(titleChanged.prop('value')).toEqual('name');

    const imageName: ShallowWrapper = enzymeWrapper.find('#image-name');
    expect(imageName.text()).toEqual('file');

    const picker1Changed: ShallowWrapper = enzymeWrapper.find('#picker1');
    expect(picker1Changed.prop('value')).toEqual(
      new Date('1995-12-18T03:24:00')
    );

    const picker2Changed: ShallowWrapper = enzymeWrapper.find('#picker2');
    expect(picker2Changed.prop('value')).toEqual(
      new Date('1995-12-19T03:24:00')
    );

    const picker3Changed: ShallowWrapper = enzymeWrapper.find('#picker3');
    expect(picker3Changed.prop('value')).toEqual(
      new Date('1995-12-20T03:24:00')
    );
  });

  it('should save when button save is clicked', async () => {
    const { enzymeWrapper, props } = setup(initProps);

    const saveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    saveButton.simulate('click');
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetails.mock.calls.length).toBe(1);
    expect(props.loadNewsDetailsFailure.mock.calls.length).toBe(0);
  });

  it('should save failure when button save is clicked and service fails', async () => {
    const { enzymeWrapper, props } = setup(initProps);

    const saveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    saveButton.simulate('click');
    props.loadNewsDetails.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadNewsDetails.mock.calls.length).toBe(0);
    expect(props.loadNewsDetailsFailure.mock.calls.length).toBe(1);
  });

  it('should cancel edit', () => {
    const { enzymeWrapper, props } = setup(initProps);

    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    props.loadNewsDetails.mockClear();
    cancelButton.simulate('click');
    expect(props.loadNewsDetails.mock.calls.length).toBe(0);
  });
});
