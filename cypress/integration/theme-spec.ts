/// <reference types="../support" />
import cypress from 'cypress';

describe('Theme taxonomy', ()=>{
  beforeEach(()=>{
    cy.server();
    cy.login();
    cy.createPortalMockSetup();
    cy.fixture('themes')
      .then(({list}) => {
        cy.route(
          'POST',
          `/boom/services/rest/thememanagement/v1/list/`,
          list
        ).as('list');
        cy.get('[data-cy=side-themes] > div').click();
        cy.wait('@list');
      });
  })
  
  it.skip('should set homepage',()=>{
    cy.server();
    cy.fixture('themes').then(({theme, listHomePage})=>{
      cy.createTheme(theme);
      cy.route(
        'POST',
        '/boom/services/rest/pagemanagement/v1/list',
        listHomePage
      ).as('list');
      cy.get('[data-cy=add-homepage] > .MuiButtonBase-root').click({force:true});
      cy.wait('@list').then(()=>{
        theme.homepage = {"label":`${listHomePage.label}`,"pageId":`${listHomePage.id}`}
        cy.route(
          'GET',
          `/boom/services/rest/thememanagement/v1/settings/${theme.uuid}`,
          theme
        ).as('theme');
        cy.wait('@theme');
        cy.route(
          'POST',
          '/boom/services/rest/thememanagement/v1/settings/update',
          theme
        ).as('update');
        cy.setHomePage(listHomePage);
        cy.wait('@update').then(()=>{
          cy.get('[data-cy=listItemHomepage]').contains('home');
        });
      });
      
    })
  })

  it.skip('should set images',()=>{
    cy.server();
    cy.fixture('themes').then(({theme,image})=>{
      // cy.createTheme(theme);
      //cy.visit( url)
      theme.headerImage = image;
      theme.previewImage = image;
      cy.route(
        'POST',
        '/boom/services/rest/thememanagement/v1/settings/update',
        theme
      ).as('update');
      cy.fileUpload('[data-cy=header-img]','../fixtures/img.png','image/png');
      cy.wait('@update').then(()=>{
        cy.get('[alt=theme header]').should('have.attr','src',image);
      });
      cy.fileUpload('[data-cy=preview-image]','../fixtures/img.png','image/png');
      cy.wait('@update').then(()=>{
        theme.headerImage = null;
        theme.previewImage = null;
      })
    })
  })
  
  it.skip('should set domain on settings and create portalhomepage',()=>{
    cy.server();
    cy.fixture('themes').then(({theme})=>{
      const updatedDomain = `${theme.domain}-updated`;
      theme.domain = updatedDomain;
      // cy.route(
      //   'POST',
      //   '/boom/services/rest/thememanagement/v1/settings/update',
      //   theme
      // ).as('update');
      cy.get('#settings-url').type(updatedDomain);
      cy.get('.header-title').should('eq',updatedDomain)
      // cy.get('[data-cy=side-pages]').click();
      // cy.createPage(pageName,'link');
      // cy.get('[data-cy=side-settings]').click({force:true});
      // cy.setHomePage(pageName);
    })
  })

  it.skip('should have a pages proper formated list',()=>{
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.contains('Manage pages');
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).within(()=>{
      cy.get('td').eq(0).should('contain',pageName);
      cy.get('td').eq(1).should('contain',Cypress.env('user'));
      cy.get('td').eq(3).should('contain','Modified');
      cy.get('[data-icon=eye-slash]')
    });
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).click({force:true});
    cy.get('#open-settings-button').click();
    cy.get('[type=checkbox]').click();
    cy.get('#save-button').click();
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).within(()=>{
      cy.get('[data-icon=eye]')
    });
  });
  it.skip('should delete page',()=>{
    cy.server()
    cy.route({
      method: 'DELETE',
      url: '/boom/services/rest/pagemanagement/v1/*'
    }).as('delete');
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).click({force:true});
    cy.get('#open-settings-button').click();
    cy.get('#remove-button').click();
    cy.wait('@delete').its('status').should('equal',200);
  });

  it.skip('should change OpenAccess portal catalog',()=>{
    cy.server();
    cy.route({
      method: 'POST',
      url: '/boom/services/rest/portalmanagement/v1/portal/catalog/update'
    }).as('update');
    cy.get('[data-cy=side-catalog]').click();
    cy.get('[data-cy=openAccess]').click()
    cy.wait('@update')
      .then(( {response:{body:{openAccess}}})=>{
        expect(openAccess).to.eq(false);
      })
  })
  it.skip('should change the types',()=>{
    cy.server();
    cy.route({
      method: 'POST',
      url: '/boom/services/rest/portalmanagement/v1/portal/catalog/update'
    }).as('update');
    cy.get('[data-cy=side-catalog]').click();
    cy.get('[data-cy=book]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingEbooks}}})=>{
        expect(authorizingEbooks).to.eq(true);
      })
    cy.get('[data-cy=journal]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingJournals}}})=>{
        expect(authorizingJournals).to.eq(true);
      })
    cy.get('[data-cy=journalArticle]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingJournalArticles}}})=>{
        expect(authorizingJournalArticles).to.eq(true);
      })
    cy.get('[data-cy=database]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingDatabases}}})=>{
        expect(authorizingDatabases).to.eq(true);
      })
    cy.get('[data-cy=databaseArticle]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingDatabaseArticles}}})=>{
        expect(authorizingDatabaseArticles).to.eq(true);
      })
    cy.get('[data-cy=journalArticle]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingJournalArticles}}})=>{
        expect(authorizingJournalArticles).to.eq(false);
      })
    cy.get('[data-cy=databaseArticle]').click()
    cy.wait('@update')
      .then(( {response:{body:{authorizingDatabaseArticles}}})=>{
        expect(authorizingDatabaseArticles).to.eq(false);
      })
  })
  it.skip('should change the year',()=>{
    cy.server();
    cy.route({
      method: 'POST',
      url: '/boom/services/rest/portalmanagement/v1/portal/catalog/update'
    }).as('update');
    cy.get('[data-cy=side-catalog]').click();
    cy.get('#year-selector').select('2014');
    cy.get('[data-cy=addYear-button]').click()
    cy.wait('@update')
      .then(( {response:{body:{years}}})=>{
        expect(years).to.contain(2014);
      })
    cy.get('#deleteYear-button').click()
  })
  it.skip('should add taxonomy to the catalog',()=>{
    cy.server();
    cy.route({
      method: 'POST',
      url: '/boom/services/rest/portalmanagement/v1/portal/catalog/update'
    }).as('update');
    cy.get('[data-cy=side-catalog]').click();
    cy.get('#domain-taxonomy').click({force:true});
    cy.get('[data-value="f0fc3f0fb2c848868ed78c3dd25f2c31"]').click();
    cy.get('#category-taxonomy').click();
    cy.get('[data-value="df4e81a3493d4bc29f6fb4378a02ea91"]').click();
    cy.get('[data-cy=save-domain-taxonomy]').click();
    cy.wait('@update')
  })

  it.skip('should have a pages proper formated list',()=>{
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.contains('Manage pages');
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).within(()=>{
      cy.get('td').eq(0).should('contain',pageName);
      cy.get('td').eq(1).should('contain',Cypress.env('user'));
      cy.get('td').eq(3).should('contain','Modified');
      cy.get('[data-icon=eye-slash]')
    });
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).click({force:true});
    cy.get('[data-cy=settings-button]').click();
    cy.get('[type=checkbox]').click();
    cy.get('#save-button').click();
    cy.get('[data-cy=publish-button]').click();
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).within(()=>{
      cy.get('td').eq(3).should('not.contain','Modified');
      cy.get('[data-icon=eye]')
    });
  });
  it.skip('should delete page',()=>{
    cy.server()
    cy.route({
      method: 'DELETE',
      url: '/boom/services/rest/pagemanagement/v1/*'
    }).as('delete');
    cy.get('[data-cy=side-pages]').click({force:true});
    cy.get('.admin-table > tbody').contains('#admin-table-row',pageName).click({force:true});
    cy.get('#open-settings-button').click();
    cy.get('#remove-button').click();
    cy.wait('@delete').its('status').should('equal',200);
  });
});