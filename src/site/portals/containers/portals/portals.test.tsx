import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Portals } from "./portals";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  portalData: [
    {
      uuid: "91a3d84615e04ac38438273ad51764a7",
      name: "portal 05 name",
      createdBy: "admin",
      publishDate: "2020-04-06T10:28:15.168+0000",
      domain: "url",
    },
  ],
  openCloseCreationDialog: jest.fn(),
  portalSelected: jest.fn(),
  loadPortals: jest.fn(),
  loadPortalsSuccess: jest.fn(),
  loadPortalsFailure: jest.fn(),
  loading: false,
  error: false,
  dialogOpen: false,
};

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../services/portals.service", () => ({
  fetchPortalsData: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          content: [{ uuid: "123", name: "label", domain: "link" }],
          totalHits: 1,
        }
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMessage: "error" } } })
    ),
  createPortal: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        uuid: "id",
        name: "name",
        domain: "url",
        createdBy: "createdBy",
        publishDate: "creationDate",
      },
    })
  ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<Portals {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Portals", () => {
  it("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should call for portal list success on init", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadPortalsSuccess.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadPortalsSuccess.mock.calls.length).toBe(1);
    expect(props.loadPortalsSuccess.mock.calls[0][0]).toEqual([
      { uuid: "123", name: "label", domain: "link" },
    ]);
  });

  it("should call for page list failure on init", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f: any) => f());
    const { props } = setup(initProps);
    props.loadPortalsFailure.mockClear();
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.loadPortalsFailure.mock.calls.length).toBe(1);
    expect(props.loadPortalsFailure.mock.calls[0][0]).toEqual("error");
  });

  it("should convert data from pages array to good format", () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find("AdminTable");
    expect(table.prop("data")).toEqual([
      {
        uuid: "91a3d84615e04ac38438273ad51764a7",
        name: "portal 05 name",
        createdBy: "admin",
        publishDate: "Mon Apr 06 2020",
        domain: "url",
      },
    ]);
  });

  it("should select portal successfully", () => {
    const { enzymeWrapper, props } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find("AdminTable");
    table.simulate("rowClicked", {
      uuid: "91a3d84615e04ac38438273ad51764a7",
      name: "portal 05 name",
      createdBy: "admin",
      publishDate: "Mon Apr 06 2020",
      domain: "url",
    });
    expect(props.portalSelected.mock.calls.length).toBe(1);
    expect(props.portalSelected.mock.calls[0][0]).toEqual({
      uuid: "91a3d84615e04ac38438273ad51764a7",
      name: "portal 05 name",
      createdBy: "admin",
      publishDate: "Mon Apr 06 2020",
      domain: "url",
    });
  });

  it("should render the table with a Portal column", () => {
    const { enzymeWrapper } = setup(initProps);
    const table: ShallowWrapper = enzymeWrapper.find("AdminTable");
    table.find("#admin-table-header").first().contains("Portal");
  });

  it("add button opens dialog", () => {
    const { enzymeWrapper, props } = setup(initProps);

    const dialog: ShallowWrapper = enzymeWrapper.find("CreationDialog");
    expect(dialog.exists()).toBeTruthy();
    expect(dialog.prop("open")).toBeFalsy();

    const addButton: ShallowWrapper = enzymeWrapper.find("#add-button");
    addButton.simulate("click");

    expect(props.openCloseCreationDialog.mock.calls.length).toBe(1);
    expect(props.openCloseCreationDialog.mock.calls[0][0]).toBe(true);
  });

  it("closed dialog whith value should create it success", async () => {
    const { enzymeWrapper, props } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find("CreationDialog");
    props.portalSelected.mockClear();
    dialog.simulate("closeDialog", { val: "name" });
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(props.portalSelected.mock.calls.length).toBe(1);
    expect(props.portalSelected.mock.calls[0][0]).toEqual({
      uuid: "id",
      name: "name",
      domain: "url",
      createdBy: "createdBy",
      publishDate: "creationDate",
    });
  });

  it("closed dialog whitout value should do anything", () => {
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find("CreationDialog");
    dialog.simulate("closeDialog", undefined);
  });
});
