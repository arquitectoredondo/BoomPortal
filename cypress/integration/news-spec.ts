/// <reference types="../support" />
import cypress from 'cypress';

describe('News', ()=>{
  beforeEach(()=>{
    cy.server();
    cy.login()
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
        cy.fixture('news').then(({list: listNews}) => {
          cy.route('POST', '/boom/services/rest/newsmanagement/v1/list',listNews).as('news');
          cy.get('.sidebar-body')
            .contains('News')
            .click();
        })
        cy.wait('@news');
      })
  });
  it('should cancel before create a new',()=>{
    cy.get('#add-button').click();
    cy.get('#new-title').type('canceledNew');
    cy.get('#picker1').clear().type('11/05/2020');
    cy.get('#picker2').clear().type('11/05/2020');
    cy.get('#picker3').clear().type('11/05/2020');
    cy.get('.rdw-editor-main').type('content');
    cy.get('#cancel-button').click();
    cy.get('.MuiTableBody-root').should('not.contain.text','canceledNew');
  });
  it('should create a new', ()=>{
    cy.server();
    cy.fixture('news')
      .then(({create}) => {
        cy.route('POST', '/boom/services/rest/newsmanagement/v1', create).as('news');
        cy.get('#add-button').click();
        cy.get('#save-button').should('be.disabled');
        cy.get('#new-title').type(create.title);
        cy.get('#picker1').clear().type('11/05/2020');
        cy.get('#picker2').clear().type('11/05/2020');
        cy.get('#picker3').clear().type('11/05/2020');
        cy.get('.rdw-editor-main').type('descriptionHere');
        cy.get('#save-button').click();
        cy.wait('@news').its('status').should('equal',200);
      })
  });
  it('should have a proper formated list',()=>{
    cy.fixture('news').then(({list})=>{
      cy.get('.admin-table > tbody').contains('#admin-table-row',list[0].title).within(()=>{
        cy.get('td').eq(0).should('contain',list[0].title);
        cy.get('td').eq(1).should('contain','admin');
        if(list[0].publicationDate && list[0].canRevert){
          cy.get('td').eq(3).should('contain','Published');
        } else {
          cy.get('td').eq(3).should('contain','Modified');
        }
        cy.get('[data-icon=eye]')
      });
      cy.get('.admin-table > tbody').contains('#admin-table-row',list[1].title).within(()=>{
        cy.get('td').eq(0).should('contain',list[0].title);
        cy.get('td').eq(1).should('contain','admin');
        if(list[0].publicationDate && list[1].canRevert){
          cy.get('td').eq(3).should('contain','Published');
        } else {
          cy.get('td').eq(3).should('contain','Modified');
        }
        cy.get('[data-icon=eye-slash]')
      });
    });
  });
});
