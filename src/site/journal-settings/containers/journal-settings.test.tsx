import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JournalSettingsComponent } from "./journal-settings";

Enzyme.configure({ adapter: new Adapter() });

const mockJournalSettings = {
  uuid: "1",
  canRevert: false,
  name: "name",
  editedBy: "person",
  visibility: true,
  openAccess: false,
  journalBoomId: "1",
  menuItems: [],
  eans: ["ean"],
  titleSize: "64px",
  colorPrimary: "#95B3AB",
  colorSecondary: "#09C9CA",
  colorMainMenu: "#5DADDC",
  fontPrimary: "Helvetica",
  fontSecondary: "Roboto",
  colour: "#5DBEDC",
};

const initProps: any = {
  loadJournalSettings: jest.fn(),
  loadJournalSettingsSuccess: jest.fn(),
  loadJournalSettingsFailure: jest.fn(),
  saveJournalSettings: jest.fn(),
  loading: false,
  error: false,
  journalSettings: mockJournalSettings,
};

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ journalId: "123" }),

  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../services/journal-settings.service", () => ({
  getJournalSettings: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockJournalSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: "error" } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockJournalSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: "error" } } })
    ),
  revertJournalSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockJournalSettings,
    })
  ),
  publishJournalSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockJournalSettings,
    })
  ),

  saveDraftJournalSettings: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        uuid: "1",
        canRevert: false,
        name: "name",
        editedBy: "favicon",
        colour: "url",
        visibility: true,
        openAccess: false,
        menuItems: "#000",
      },
    })
  ),
  retrieveJournalList: jest.fn().mockReturnValue(
    Promise.resolve({
      data: [
        {
          id: "1",
          title: "name",
        },
      ],
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: any = shallow(<JournalSettingsComponent {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Settings", () => {
  it("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should call for journal settings success on init", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadJournalSettingsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(1);
    expect(props.loadJournalSettingsSuccess.mock.calls[0][0]).toEqual(
      mockJournalSettings
    );
  });

  it("should trigger UseEffect and load failure", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadJournalSettingsFailure.mock.calls.length).toBe(1);
    expect(props.loadJournalSettingsFailure.mock.calls[0][0]).toEqual("error");
  });

  it("should show canRevert if true", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      journalSettings: { ...mockJournalSettings, canRevert: true },
    });
    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeTruthy();
  });

  it("should dispatch revert action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      journalSettings: { ...mockJournalSettings, canRevert: true },
    });
    props.saveJournalSettings.mockClear();
    props.loadJournalSettingsSuccess.mockClear();
    const revertButton: ShallowWrapper = enzymeWrapper.find("#revert-button");
    revertButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveJournalSettings.mock.calls.length).toBe(1);
    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should dispatch publish action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      journalSettings: mockJournalSettings,
    });
    props.saveJournalSettings.mockClear();
    const publishButton: ShallowWrapper = enzymeWrapper.find(
      "#publish-changes-button"
    );
    publishButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveJournalSettings.mock.calls.length).toBe(1);
  });

  it("should change the content on the textField", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      journalSettings: mockJournalSettings,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find("#settings-name");
    expect(nameInput.prop("value")).toBe("name");
    nameInput.simulate("change", { target: { value: "name2" } });
    nameInput.simulate("blur");
    const nameInput2: ShallowWrapper = enzymeWrapper.find("#settings-name");
    expect(nameInput2.prop("value")).toBe("name2");

    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeFalsy();
  });

  it("should change the visbility", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      journalSettings: mockJournalSettings,
    });
    const visibilitySwitch: ShallowWrapper = enzymeWrapper.find(
      "#visibility-switch"
    );
    expect(visibilitySwitch.prop("checked")).toBe(true);
    visibilitySwitch.simulate("change", { target: { value: false } });
    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeFalsy();
  });

  it("should handle item menu dialog close without value", () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuSelector: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    menuSelector.simulate("addItem");
    const dialog: ShallowWrapper = enzymeWrapper.find("AddItemMenuDialog");

    dialog.simulate("closeDialog");
    expect(props.loadJournalSettings.mock.calls.length).toBe(2);
  });

  it("should handle add menu item dialog close with value", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuSelector: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    menuSelector.simulate("addItem");
    const dialog: ShallowWrapper = enzymeWrapper.find("AddItemMenuDialog");

    dialog.simulate("closeDialog", { id: "name" });
    expect(props.loadJournalSettings.mock.calls.length).toBe(2);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(3);
  });

  it("should handle delete menu item", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    props.loadJournalSettings.mockClear();
    menuItem.simulate("deleteItem", { val: "id" });
    expect(props.loadJournalSettings.mock.calls.length).toBe(0);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(3);
  });

  it("should handle delete menu item", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      journalSettings: undefined,
    });
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");
    props.loadJournalSettings.mockClear();
    menuItem.simulate("deleteItem", { val: "id" });
    expect(props.loadJournalSettings.mock.calls.length).toBe(0);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(3);
  });

  it("should handle dreorder menu item", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");

    menuItem.simulate("reorderItems", { val: "id" });
    expect(props.loadJournalSettings.mock.calls.length).toBe(0);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(4);
  });

  it("should handle dreorder menu item without settings", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      journalSettings: undefined,
    });
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");

    menuItem.simulate("reorderItems", { val: "id" });
    expect(props.loadJournalSettings.mock.calls.length).toBe(0);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(4);
  });

  it("should set homepage", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const menuItem: ShallowWrapper = enzymeWrapper.find("MenuSelector");

    menuItem.simulate("selectHomepage", { val: "id" });
    menuItem.simulate("editItem", { val: "id" });
    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(4);
  });

  it("should handle ean delete", async () => {
    const { enzymeWrapper } = setup(initProps);
    const eanSelect: ShallowWrapper = enzymeWrapper.find("#deleteEan-button");

    eanSelect.simulate("click");
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should handle add ean", async () => {
    const { enzymeWrapper } = setup(initProps);
    const eanSelect: ShallowWrapper = enzymeWrapper.find("#addYear-button");

    eanSelect.simulate("click");
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should reload when clicking on reload after an error", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadJournalSettingsSuccess.mockClear();
    const container: ShallowWrapper = enzymeWrapper.find("#container-template");

    container.simulate("reload");

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadJournalSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should have primary-color setted", async () => {
    const { enzymeWrapper } = setup(initProps);
    const color: any = enzymeWrapper
      .find("#main-color-button div")
      .first()
      .prop("style");
    expect(color).toHaveProperty("backgroundColor", "#95B3AB");
  });

  it("should have secondary-color setted", async () => {
    const { enzymeWrapper } = setup(initProps);
    const color: any = enzymeWrapper
      .find("#secondary-color-button div")
      .first()
      .prop("style");
    expect(color).toHaveProperty("backgroundColor", "#09C9CA");
  });

  it("should have color-main-menu setted", async () => {
    const { enzymeWrapper } = setup(initProps);
    const color: any = enzymeWrapper
      .find("#main-menu-button div")
      .first()
      .prop("style");
    expect(color).toHaveProperty("backgroundColor", "#5DADDC");
  });

  it("should contain a font selector with 3 options", async () => {
    const { enzymeWrapper } = setup(initProps);
    const font: any = enzymeWrapper.find("#settings-font-primary");
    expect(font.text()).toBe("Objectiv-mk2RobotoHelvetica");
  });
});
