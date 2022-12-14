import axios from 'axios';
import { fetchCoincidenceList } from './search.service';
import MockAdapter from 'axios-mock-adapter';
import { SearchCriteria } from '../models/search-criteria.model';

describe('Search service ', () => {
  var mock = new MockAdapter(axios);
  it('post successfully data to create theme', async () => {
    const data = [
      'rechtsgeschichte',
      'rechtsgeschaft',
      'rechtsgut',
      'rechtsgeleerdheid master',
      'rechtsgeleerdheid leiden',
    ];
    const searchCriteria: SearchCriteria = {
      searchValue: 'book',
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/listbooks`
      )
      .reply(200, data);

    fetchCoincidenceList(searchCriteria).then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
