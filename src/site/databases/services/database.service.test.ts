import axios from "axios";
import { fetchDatabasesData, createDatabase } from "./database.service";
import MockAdapter from "axios-mock-adapter";

describe("Database service ", () => {
  var mock = new MockAdapter(axios);
  it("fetches the list of Databases", async () => {
    const data: any = {
      data: [
        {
          uuid: "1",
          name: "Database1",
          editedBy: "Me",
          publicationDate: "15 april 2019",
          canRevert: false,
          visibility: false,
          openAccess: false,
          colour: "",
        },
        {
          uuid: "2",
          name: "Database2",
          editedBy: "you",
          publicationDate: "30 november 2019",
          canRevert: true,
          visibility: false,
          openAccess: false,
          colour: "",
        },
        {
          uuid: "3",
          name: "Database3",
          editedBy: "he",
          canRevert: false,
          visibility: true,
          openAccess: false,
          colour: "",
        },
        {
          uuid: "4",
          name: "Database4",
          editedBy: "she",
          publicationDate: "01 november 2020",
          canRevert: true,
          visibility: true,
          openAccess: false,
          colour: "",
        },
        {
          uuid: "5",
          name: "Database5",
          editedBy: "We",
          publicationDate: "11 december 2019",
          canRevert: false,
          visibility: true,
          openAccess: false,
          colour: "",
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/list`
      )
      .reply(200, data);

    fetchDatabasesData().then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it("post successfully data to create database", async () => {
    const data = {
      uuid: "5",
      name: "new database",
      editedBy: "We",
      publicationDate: "11 december 2019",
      canRevert: false,
      visibility: true,
      openAccess: false,
      colour: "",
    };
    const name = "new database";
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/databasemanagement/v1/database/create`
      )
      .reply(200, data);

    createDatabase(name).then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
