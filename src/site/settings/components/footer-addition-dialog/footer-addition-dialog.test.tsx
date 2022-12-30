import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MenuAdditionDialog from "./footer-addition-dialog";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: true,
  portalUuid: "id",
  onCloseDialog: jest.fn(),
};

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ portalUuid: "123" }),
}));

jest.mock("../../services/settings.service", () => ({
  retrieveMenuThemes: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ data: [{ label: "theme", uuid: "123" }] })
    ),
  getPages: jest
    .fn()
    .mockReturnValue(
      Promise.resolve({ data: [{ label: "page", uuid: "123" }] })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <MenuAdditionDialog {...props} />
  );

  return {
    props,
    enzymeWrapper,
  };
}

describe("MenuAdditionDialog", () => {
  it("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should not show page selector until controller page is selected", () => {
    const { enzymeWrapper } = setup(initProps);

    expect(enzymeWrapper.find("#menu-theme").exists()).toBeFalsy();

    const nameInput: ShallowWrapper = enzymeWrapper.find("#menu-controller");
    nameInput.simulate("change", { target: { value: 0 } });
    expect(enzymeWrapper.find("#menu-pages").exists()).toBeTruthy();
  });

  it("should not show theme selector until controller theme is selected", () => {
    const { enzymeWrapper } = setup(initProps);

    expect(enzymeWrapper.find("#menu-theme").exists()).toBeFalsy();

    const nameInput: ShallowWrapper = enzymeWrapper.find("#menu-controller");
    nameInput.simulate("change", { target: { value: 2 } });
    expect(enzymeWrapper.find("#menu-themes").exists()).toBeTruthy();
  });

  it("should disable save if form not filled", () => {
    const { enzymeWrapper } = setup(initProps);
    const saveButton: ShallowWrapper = enzymeWrapper.find("#save-button");
    expect(saveButton.prop("disabled")).toBe(true);
    const nameInput: ShallowWrapper = enzymeWrapper.find("#menu-controller");
    nameInput.simulate("change", { target: { value: 0 } });
    const labelnl: ShallowWrapper = enzymeWrapper.find("#menu-label-nl");
    labelnl.simulate("change", { target: { value: "name" } });
    const labelen: ShallowWrapper = enzymeWrapper.find("#menu-label-en");
    labelen.simulate("change", { target: { value: "name" } });
    const saveButton2: ShallowWrapper = enzymeWrapper.find("#save-button");
    expect(saveButton2.prop("disabled")).toBe(false);
  });

  it("should retrieve pages when page controller option selected", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const menuController: ShallowWrapper =
      enzymeWrapper.find("#menu-controller");
    menuController.simulate("change", { target: { value: 1 } });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const menuPages: ShallowWrapper = enzymeWrapper.find("#menu-pages");
    expect(menuPages.children).not.toEqual(0);
  });

  it("should retrieve themes when theme controller option selected", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { enzymeWrapper } = setup(initProps);
    const menuController: ShallowWrapper =
      enzymeWrapper.find("#menu-controller");
    menuController.simulate("change", { target: { value: 3 } });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    const menuThemes: ShallowWrapper = enzymeWrapper.find("#menu-themes");
    expect(menuThemes.children).not.toEqual(0);
  });

  it("should handle close dialog without save", () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();

    const mainDialog: ShallowWrapper = enzymeWrapper.find("#main-dialog");
    mainDialog.simulate("close");
    expect(props.onCloseDialog.mock.calls.length).toBe(1);

    props.onCloseDialog.mockClear();
    const closeButton: ShallowWrapper = enzymeWrapper.find("#close-button");
    closeButton.simulate("click");
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    props.onCloseDialog.mockClear();

    const cancelButton: ShallowWrapper = enzymeWrapper.find("#cancel-button");
    cancelButton.simulate("click");
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
  });

  it("should handle save button", () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const menuController: ShallowWrapper =
      enzymeWrapper.find("#menu-controller");
    menuController.simulate("change", {
      target: { value: 2 },
    });

    const labelInput: ShallowWrapper = enzymeWrapper.find("#menu-label-nl");
    labelInput.simulate("change", {
      target: { value: "label" },
    });

    const saveButton: ShallowWrapper = enzymeWrapper.find("#save-button");
    saveButton.simulate("click");
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toEqual({
      pageId: undefined,
      type: 2,
      label: {
        en: "",
        nl: "label",
      },
    });
  });
});
