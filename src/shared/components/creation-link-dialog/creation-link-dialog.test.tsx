import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreationLinkDialog from './creation-link-dialog';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  title: 'title',
  canDelete: false,
  onConfirmDelete: jest.fn(),
  onCloseDialog: jest.fn(),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <CreationLinkDialog {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe('CreationLinkDialog', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('save button only enables when name and permalink set', () => {
    const { enzymeWrapper } = setup(initProps);
    const saveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
    expect(saveButton.prop('disabled')).toBe(true);
    const nameInput: ShallowWrapper = enzymeWrapper.find('#page-name');
    const linkInput: ShallowWrapper = enzymeWrapper.find('#page-link');
    const seoTitleInput: ShallowWrapper = enzymeWrapper.find('#page-seo-title');
    const seoDescriptionInput: ShallowWrapper = enzymeWrapper.find('#page-seo-description');
    nameInput.simulate('change', { target: { value: 'name' } });
    linkInput.simulate('change', { target: { value: 'link' } });
    seoTitleInput.simulate('change', { target: { value: 'seoTitle' } });
    seoDescriptionInput.simulate('change', { target: { value: 'seoDescription' } });
    const saveButton2: ShallowWrapper = enzymeWrapper.find('#save-button');
    expect(saveButton2.prop('disabled')).toBe(false);
  });

  it('cancel button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('close dialog should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('#dialog-page-creation');
    dialog.simulate('close');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('close button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#close-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('save button should close dialog with data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const nameInput: ShallowWrapper = enzymeWrapper.find('#page-name');
    const linkInput: ShallowWrapper = enzymeWrapper.find('#page-link');
    const seoTitleInput: ShallowWrapper = enzymeWrapper.find('#page-seo-title');
    const seoDescriptionInput: ShallowWrapper = enzymeWrapper.find('#page-seo-description');
    nameInput.simulate('change', { target: { value: 'name' } });
    linkInput.simulate('change', { target: { value: 'link' } });
    seoTitleInput.simulate('change', { target: { value: 'seoTitle' } });
    seoDescriptionInput.simulate('change', { target: { value: 'seoDescription' } });
    const saveButton2: ShallowWrapper = enzymeWrapper.find('#save-button');
    saveButton2.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toEqual({
      label: 'name',
      link: 'link',
      visibility: false,
      seoTitle: 'seoTitle',
      seoDescription: 'seoDescription',
    });
  });

  it('delete button should only be visible when canDelete', () => {
    const { enzymeWrapper } = setup({ initProps, canDelete: true });
    const removeButton: ShallowWrapper = enzymeWrapper.find('#remove-button');
    expect(removeButton.exists()).toBeTruthy();
  });

  it('delete button should dispatch onDelete', () => {
    const { enzymeWrapper, props } = setup({ ...initProps, canDelete: true });
    const removeButton: ShallowWrapper = enzymeWrapper.find('#remove-button');
    removeButton.simulate('click');

    expect(props.onConfirmDelete.mock.calls.length).toBe(1);
  });
});
