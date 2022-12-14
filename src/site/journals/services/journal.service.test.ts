import axios from 'axios';
import { fetchJournalsData, createJournal } from './journals.service';
import MockAdapter from 'axios-mock-adapter';

describe('Journal service ', () => {
  var mock = new MockAdapter(axios);
  it('fetches the list of journals', async () => {
    const data: any = {
      data: [
        {
          uuid: '1',
          name: 'Journal1',
          editedBy: 'Me',
          publicationDate: '15 april 2019',
          canRevert: false,
          visibility: false,
          openAccess: false,
          colour: '',
        },
        {
          uuid: '2',
          name: 'Journal2',
          editedBy: 'you',
          publicationDate: '30 november 2019',
          canRevert: true,
          visibility: false,
          openAccess: false,
          colour: '',
        },
        {
          uuid: '3',
          name: 'Journal3',
          editedBy: 'he',
          canRevert: false,
          visibility: true,
          openAccess: false,
          colour: '',
        },
        {
          uuid: '4',
          name: 'Journal4',
          editedBy: 'she',
          publicationDate: '01 november 2020',
          canRevert: true,
          visibility: true,
          openAccess: false,
          colour: '',
        },
        {
          uuid: '5',
          name: 'Journal5',
          editedBy: 'We',
          publicationDate: '11 december 2019',
          canRevert: false,
          visibility: true,
          openAccess: false,
          colour: '',
        },
      ],
    };
    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/list`
      )
      .reply(200, data);

    fetchJournalsData().then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to create page', async () => {
    const data = {
      uuid: '5',
      name: 'new journal',
      editedBy: 'We',
      publicationDate: '11 december 2019',
      canRevert: false,
      visibility: true,
      openAccess: false,
      colour: '',
    };
    const name = 'new journal';
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/journalsitemanagement/v1/journalsite/create`
      )
      .reply(200, data);

    createJournal(name).then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
