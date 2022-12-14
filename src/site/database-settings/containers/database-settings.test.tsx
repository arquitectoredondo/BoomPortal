import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { DatabaseSettingsComponent } from "./database-settings";

Enzyme.configure({ adapter: new Adapter() });

const mockDatabaseSettings = {
  uuid: "1",
  canRevert: false,
  name: "name",
  editedBy: "person",
  description: "test",
  visibility: true,
  openAccess: false,
  url: "url",
  boomDatabaseId: "1",
  eans: ["ean"],
};

const mockDatabaseSelected = {
  url: "url",
  id: "1",
};

const initProps: any = {
  loadDatabaseSettings: jest.fn(),
  loadDatabaseSettingsSuccess: jest.fn(),
  loadDatabaseSettingsFailure: jest.fn(),
  saveDatabaseSettings: jest.fn(),
  loading: false,
  error: false,
  databaseSettings: mockDatabaseSettings,
  databaseSelected: mockDatabaseSelected,
};

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ databaseId: "123" }),

  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../services/database-settings.service", () => ({
  getDatabaseSettings: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockDatabaseSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: "error" } } })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: mockDatabaseSettings,
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: "error" } } })
    ),
  revertDatabaseSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockDatabaseSettings,
    })
  ),
  publishDatabaseSettings: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: mockDatabaseSettings,
    })
  ),

  saveDraftDatabaseSettings: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        uuid: "1",
        canRevert: false,
        name: "name",
        editedBy: "person",
        description: "test",
        visibility: true,
        openAccess: false,
        url: "url",
        boomDatabaseId: "1",
      },
    })
  ),
  retrieveDatabaseList: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        id: "1",
        url: "url",
      },
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: any = shallow(<DatabaseSettingsComponent {...props} />);

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

  it("should call for database settings success on init", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadDatabaseSettingsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadDatabaseSettingsSuccess.mock.calls.length).toBe(1);
    expect(props.loadDatabaseSettingsSuccess.mock.calls[0][0]).toEqual(
      mockDatabaseSettings
    );
  });

  it("should trigger UseEffect and load failure", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadDatabaseSettingsFailure.mock.calls.length).toBe(1);
    expect(props.loadDatabaseSettingsFailure.mock.calls[0][0]).toEqual("error");
  });
  it("should show canRevert if true", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      databaseSettings: { ...mockDatabaseSettings, canRevert: true },
    });
    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeTruthy();
  });

  it("should dispatch revert action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      databaseSettings: { ...mockDatabaseSettings, canRevert: true },
    });
    props.saveDatabaseSettings.mockClear();
    props.loadDatabaseSettingsSuccess.mockClear();
    const revertButton: ShallowWrapper = enzymeWrapper.find("#revert-button");
    revertButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveDatabaseSettings.mock.calls.length).toBe(1);
    expect(props.loadDatabaseSettingsSuccess.mock.calls.length).toBe(1);
  });

  it("should dispatch publish action success on click", async () => {
    const { enzymeWrapper, props } = setup({
      ...initProps,
      databaseSettings: mockDatabaseSettings,
    });
    props.saveDatabaseSettings.mockClear();
    const publishButton: ShallowWrapper = enzymeWrapper.find(
      "#publish-changes-button"
    );
    publishButton.simulate("click");

    const flushPromises2 = () => new Promise(setImmediate);
    await flushPromises2();

    expect(props.saveDatabaseSettings.mock.calls.length).toBe(1);
  });

  it("should change the content on the name textField", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      databaseSettings: mockDatabaseSettings,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find("#settings-name");
    expect(nameInput.prop("value")).toBe("name");
    nameInput.simulate("change", { target: { value: "name2" } });
    const nameInput2: ShallowWrapper = enzymeWrapper.find("#settings-name");
    expect(nameInput2.prop("value")).toBe("name2");

    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeFalsy();
  });

  it("should change the content on the description textArea", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      databaseSettings: mockDatabaseSettings,
    });
    const nameInput: ShallowWrapper = enzymeWrapper.find("#description-input");
    expect(nameInput.prop("value")).toBe("test");
    nameInput.simulate("change", { target: { value: "descHasChanged" } });
    const nameInput2: ShallowWrapper = enzymeWrapper.find("#description-input");
    expect(nameInput2.prop("value")).toBe("descHasChanged");

    const canRevertButton: ShallowWrapper = enzymeWrapper.find(
      "#revert-button"
    );
    expect(canRevertButton.exists()).toBeFalsy();
  });

  it("should change the visbility", () => {
    const { enzymeWrapper } = setup({
      ...initProps,
      databaseSettings: mockDatabaseSettings,
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

  it("should handle ean delete", async () => {
    const { enzymeWrapper } = setup(initProps);
    const eanSelect: ShallowWrapper = enzymeWrapper.find("#deleteEan-button");

    eanSelect.simulate("click");
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should handle add ean", async () => {
    const { enzymeWrapper } = setup(initProps);
    const eanSelect: ShallowWrapper = enzymeWrapper.find("#addEan-button");

    eanSelect.simulate("click");
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should reload when clicking on reload after an error", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.loadDatabaseSettingsSuccess.mockClear();
    const container: ShallowWrapper = enzymeWrapper.find("#container-template");

    container.simulate("reload");

    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(props.loadDatabaseSettingsSuccess.mock.calls.length).toBe(1);
  });
});
