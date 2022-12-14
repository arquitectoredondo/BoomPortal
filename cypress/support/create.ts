import react from 'react';

Cypress.Commands.add('createTheme',(mock)=>{
  console.log(mock)
  cy.route(
    'POST',
    '/boom/services/rest/thememanagement/v1/create',
    mock
  ).as('newTheme');
  cy.route(
    'GET',
    `/boom/services/rest/thememanagement/v1/settings/${mock.uuid}}`,
    mock
  ).as('theme');
  cy.route(
    'POST',
    `/boom/services/rest/thememanagement/v1/settings/update`,
    mock
  ).as('update');
  cy.get('#add-button').click();
  cy.get('#theme-name').type(mock.name);
  // cy.get('.MuiSwitch-input').click();
  cy.get('#save-button').click();
  cy.wait('@newTheme').its('status').should('equal',200);
  cy.wait('@theme');
  cy.wait('@update');
});

Cypress.Commands.add('createPage',(name?: string, link?:string)=>{
  cy.fixture('pages')
    .then(({page}) => {
      cy.server();
      cy.route(
        'POST',
        '/boom/services/rest/pagemanagement/v1/create',
        page
      ).as('page');
      cy.get('#add-button').click();
      cy.get('#save-button').should('be.disabled');
      cy.get('#page-name').type(page.label);
      cy.get('#save-button').should('be.disabled');
      cy.get('#page-link').type(page.link);
      cy.get('#save-button').click();
      cy.wait('@page').its('status').should('equal',200);
  })
});

Cypress.Commands.add('createPortal',()=>{
  cy.fixture('portals')
    .then(({create}) => {
    cy.route(
      'POST',
      '/boom/services/rest/portalmanagement/v1/portal/create',
      create
    ).as('newPortal');
    cy.get('#add-button').click();
    cy.get('#save-button').should('be.disabled');
    cy.get('#portal-name').type(create.name);
    cy.get('#save-button').click();
    cy.wait('@newPortal').its('status').should('equal',200);
  })
});

Cypress.Commands.add('createJournal',(name,mock)=>{
  cy.route(
    'POST',
    '/boom/services/rest/journalsitemanagement/v1/journalsite/create',
    mock
  ).as('newJournal');
  cy.route(
    'GET',
    `/boom/services/rest/journalsitemanagement/v1/journalsite/${mock.uuid}`,
    mock
  ).as('journal');
  cy.route(
    'PUT',
    '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
    mock
  ).as('update');
  cy.get('#add-button').click();
  cy.get('#save-button').should('be.disabled');
  cy.get('#journal-name').type(name);
  cy.get('#save-button').click({force:true});
  cy.wait('@newJournal').its('status').should('equal',200)
  cy.wait('@journal');
})

Cypress.Commands.add('createPortalMockSetup',()=>{
  cy.fixture('portals')
    .then(({settings,list}) => {
      const token = `Bearer ${window.localStorage.getItem('jwtToken')}`;
      cy.route({
        method:'GET',
        url:`/boom/services/rest/portalmanagement/v1/portal/list`,
        headers: {'Authorization': `Bearer ${token}`},
        response:list
      }).as('list');
      cy.visit('/site/portals')
      cy.get('button').click();
      cy.wait('@list');
      cy.route({
        method:'GET',
        url:`/boom/services/rest/portalmanagement/v1/portal/settings/${settings.uuid}`,
        headers: {'Authorization': token},
        response:settings
      }).as('portal');
      cy.route({
        method:'POST',
        url:`/boom/services/rest/portalmanagement/v1/portal/settings/update`,
        headers: {'Authorization': token},
        response:settings
      }).as('update');
      cy.contains(settings.name).click({force:true});
      cy.wait('@portal');
      cy.wait('@update');
    })
})
