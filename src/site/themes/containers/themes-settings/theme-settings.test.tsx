import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { ThemesSettingsComponent } from "./themes-settings";

Enzyme.configure({ adapter: new Adapter() });

const mockThemeSettings = {
  uuid: "1",
  canRevert: false,
  previewImage: "image",
  headerImage: "header-image",
  logoImage: "logo-image",
  description: "description",
  name: "name",
  visibility: true,
  permalink: "string;",
  homepage: { label: "label", id: "id" },
  menuItems: [],
};

const initProps: any = {
  loadThemeSettings: jest.fn(),
  loadThemeSettingsSuccess: jest.fn(),
  loadThemeSettingsFailure: jest.fn(),
  saveThemeSettings: jest.fn(),
  themeIsSelected: jest.fn(),
  loading: false,
  error: false,
  themeSettings: mockThemeSettings,
};

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ themeId: "123" }),
  useHistory: () => ({
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
  }),
}));

jest.mock("../../services/theme-settings.service", () => ({
  fetchThemeById: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: mockThemeSettings,
    })
  ),
  // .mockImplementationOnce(() => Promise.reject()),

  saveDrafThemeSettings: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        id: "1",
        canRevert: false,
        previewImage: "image",
        description: "description",
        name: "name",
        visibility: true,
      },
    })
  ),
  publishThemeSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockThemeSettings,
    })
  ),
  revertThemeSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockThemeSettings,
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <ThemesSettingsComponent {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("Themes settings component", () => {
  it("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });
  it("should trigger useEffect and load success on init", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemeSettingsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(0);
  });

  it("should trigger UseEffect an load failure", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadThemeSettingsFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemeSettingsFailure.mock.calls.length).toBe(0);
  });

  it("should show canRevert if true", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      themeSettings: { ...mockThemeSettings, canRevert: true },
    });
    const canRevertButton: ShallowWrapper =
      enzymeWrapper.find("#revert-button");
    expect(canRevertButton.exists()).toBeTruthy();
  });

  it("should dispatch revert action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: { ...mockThemeSettings, canRevert: true },
    });
    props.saveThemeSettings.mockClear();
    props.loadThemeSettingsSuccess.mockClear();
    const revertButton: ShallowWrapper = enzymeWrapper.find("#revert-button");
    revertButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveThemeSettings.mock.calls.length).toBe(1);
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should dispatch publish action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: mockThemeSettings,
    });
    props.saveThemeSettings.mockClear();
    const publishButton: ShallowWrapper = enzymeWrapper.find(
      "#publish-changes-button"
    );
    publishButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveThemeSettings.mock.calls.length).toBe(1);
  });

  it("Shoudl turn theme selected to false when click back arrow", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: mockThemeSettings,
    });
    props.saveThemeSettings.mockClear();
    const backButton: ShallowWrapper = enzymeWrapper.find("#back-button");
    backButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.themeIsSelected.mock.calls.length).toBe(1);
  });

  it("Should set the description field changes ", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: mockThemeSettings,
    });
    props.saveThemeSettings.mockClear();
    const description: ShallowWrapper =
      enzymeWrapper.find("#description-input");
    description.simulate("change", { target: { value: "hi" } });
    description.simulate("blur");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(2);
  });

  it("Shoudl set the name changes ", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: mockThemeSettings,
    });
    props.saveThemeSettings.mockClear();
    const name: ShallowWrapper = enzymeWrapper.find("#name");
    name.simulate("change", { target: { value: "New name" } });
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(2);
  });

  it("Shoudl update the visibility changes ", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: mockThemeSettings,
    });
    props.saveThemeSettings.mockClear();
    const visibility: ShallowWrapper = enzymeWrapper.find("#visibility-switch");
    visibility.simulate("change", { target: { value: false } });
    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(2);
  });

  it("should handle item menu dialog close without value", () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuSelector: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    menuSelector.simulate("addItem");
    const dialog: ShallowWrapper = enzymeWrapper.find("AddItemMenuDialog");

    dialog.simulate("closeDialog");
    expect(props.loadThemeSettings.mock.calls.length).toBe(0);
  });

  it("should handle add menu item dialog close with value", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuSelector: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    menuSelector.simulate("addItem");
    const dialog: ShallowWrapper = enzymeWrapper.find("AddItemMenuDialog");

    dialog.simulate("closeDialog", { id: "name" });
    expect(props.loadThemeSettings.mock.calls.length).toBe(0);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(3);
  });

  it("should handle delete menu item", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    props.loadThemeSettings.mockClear();
    menuItem.simulate("deleteItem", { val: "id" });
    expect(props.loadThemeSettings.mock.calls.length).toBe(0);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(3);
  });

  it("should handle dreorder menu item", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");

    menuItem.simulate("reorderItems", { val: "id" });
    expect(props.loadThemeSettings.mock.calls.length).toBe(0);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(4);
  });

  it("should reload when clicking on reload after an error", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadThemeSettingsSuccess.mockClear();
    const container: ShallowWrapper = enzymeWrapper.find("#container-template");

    container.simulate("reload");

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should handle dreorder menu item without settings", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      themeSettings: undefined,
    });
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");

    menuItem.simulate("reorderItems", { val: "id" });
    expect(props.loadThemeSettings.mock.calls.length).toBe(1);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadThemeSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should handle closeConfirm", () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadThemeSettings.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find("ConfirmDialog");

    dialog.simulate("close", false);
    expect(props.loadThemeSettings.mock.calls.length).toBe(0);

    dialog.simulate("close", true);
    expect(props.loadThemeSettings.mock.calls.length).toBe(1);
  });

  it("should show preview image", async () => {
    const { enzymeWrapper } = setup(initProps);
    const previewImageSrc: ShallowWrapper | any = enzymeWrapper.find(
      "#settings-preview-image"
    );
    expect(previewImageSrc.prop("style").backgroundImage).toBe('url("image")');
  });

  it("should show header image", async () => {
    const { enzymeWrapper } = setup(initProps);
    const headerImageSrc: ShallowWrapper | any = enzymeWrapper.find(
      "#settings-header-image"
    );
    expect(headerImageSrc.prop("style").backgroundImage).toBe(
      'url("header-image")'
    );
  });

  it("should show logo image", async () => {
    const { enzymeWrapper } = setup(initProps);
    const logoImageSrc: ShallowWrapper | any = enzymeWrapper.find(
      "#settings-logo-image"
    );
    expect(logoImageSrc.prop("style").backgroundImage).toBe(
      'url("logo-image")'
    );
  });

  it("should show preview image additional text", async () => {
    const { enzymeWrapper } = setup(initProps);
    const previewImage: ShallowWrapper = enzymeWrapper
      .find(".preview-image-title")
      .first();
    expect(previewImage.text()).toBe("(theme index page)");
  });
});
