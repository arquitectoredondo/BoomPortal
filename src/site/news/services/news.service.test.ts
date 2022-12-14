import axios from 'axios';
import {
  getNewDetails,
  getNews,
  createUpdateNew,
  saveNewDetailsTaxonomy,
  searchNewsPublications,
  saveNewDetailsPublications,
  publishNewDetails,
  revertNewDetails,
  getTaxonomyLowerLevel,
  getSelectedChilds,
} from './news.service';
import MockAdapter from 'axios-mock-adapter';

describe('news service ', () => {
  var mock = new MockAdapter(axios);
  const taxonomy = {
    uuid: '1',
    value: 'JU',
    description: 'Juridisch',
    level: 0,
    child: [
      {
        uuid: '2',
        value: 'JUARSR',
        description: 'Arbeidsrecht en socialezekerheidsrecht',
        parent: 'JU',
        level: 1,
        child: [
          {
            uuid: '3',
            value: 'JUARSRAOZ',
            description: 'Arbeidsongeschiktheid en ziekte',
            parent: 'JUARSR',
            level: 2,
            child: [],
          },
        ],
      },
    ],
  };

  it('fetches successfully data from news', async () => {
    expect(true).toBeTruthy();
  });

  it('fetches successfully data from news list', async () => {
    const data: any = {
      data: [
        {
          id: '2',
          name: 'name',
          createdBy: 'someone',
          creationDate: '01/01/01',
          status: 'status',
        },
      ],
    };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/list/`
      )
      .reply(200, data);

    getNews({}).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully data to create/edit a new', async () => {
    const data = { response: 'ok' };
    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/`
      )
      .reply(200, data);

    createUpdateNew({
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    }).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully retrieve news details', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onGet(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/id`
      )
      .reply(200, data);

    getNewDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully save news taxonomy', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/id/taxonomy`
      )
      .reply(200, data);

    saveNewDetailsTaxonomy('id', []).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully search news publications', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/portalmanagement/v1/portal/publications/id?searchTerm=searchterm`
      )
      .reply(200, data);

    searchNewsPublications('id', 'searchterm').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully save news details publications', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/id/publications`
      )
      .reply(200, data);

    saveNewDetailsPublications('id', []).then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully publish news details', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/publish/id`
      )
      .reply(200, data);

    publishNewDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('post successfully revert news details', async () => {
    const data = {
      id: 'createdMockId',
      title: 'title',
      description: '<p>content</p>',
      visibleOn: new Date(),
      eventDate: new Date('01/01/2019'),
      hideOn: new Date(),
    };

    mock
      .onPost(
        `${process.env.REACT_APP_BASE_URL}/boom/services/rest/newsmanagement/v1/revert/id`
      )
      .reply(200, data);

    revertNewDetails('id').then((response) => {
      expect(response.data).toEqual(data);
    });
  });

  it('return lowest taxonomyLevel', async () => {
    expect(getTaxonomyLowerLevel(undefined)).toEqual(undefined);
    expect(getTaxonomyLowerLevel({ ...taxonomy, child: [] })).toEqual('1');
    expect(
      getTaxonomyLowerLevel({
        ...taxonomy,
        child: [
          {
            uuid: '2',
            value: 'JUARSR',
            description: 'Arbeidsrecht en socialezekerheidsrecht',
            parent: 'JU',
            level: 1,
            child: [],
          },
        ],
      })
    ).toEqual('2');
    expect(getTaxonomyLowerLevel(taxonomy)).toEqual('3');
  });

  it('return selected child', async () => {
    expect(getSelectedChilds([taxonomy], '1')).toEqual([
      {
        uuid: '2',
        value: 'JUARSR',
        description: 'Arbeidsrecht en socialezekerheidsrecht',
        parent: 'JU',
        level: 1,
        child: [
          {
            uuid: '3',
            value: 'JUARSRAOZ',
            description: 'Arbeidsongeschiktheid en ziekte',
            parent: 'JUARSR',
            level: 2,
            child: [],
          },
        ],
      },
    ]);

    expect(getSelectedChilds([taxonomy], '1', '2')).toEqual([
      {
        uuid: '3',
        value: 'JUARSRAOZ',
        description: 'Arbeidsongeschiktheid en ziekte',
        parent: 'JUARSR',
        level: 2,
        child: [],
      },
    ]);

    expect(getSelectedChilds([taxonomy], '4')).toEqual([]);
  });
});
