/// <reference types="../support" />
import cypress from 'cypress';

describe('Pages', ()=>{
  beforeEach(()=>{
    cy.server();
    cy.login()
    cy.createPortalMockSetup()
    cy.fixture('pages').then(({list})=>{
      cy.route(
        'GET',
        '/boom/services/rest/pagemanagement/v1/list/*',
        list
      ).as('pages');
      cy.get('[data-cy=side-pages]').click({force:true});
      cy.wait('@pages');
    })
  });
  it('should cancel before create page',()=>{
    cy.get('#add-button').click();
    cy.get('#page-name').type('cancele2e');
    cy.get('#page-link').type('cancele2e');
    cy.get('#cancel-button').click();
    cy.get('.MuiTableBody-root').should('not.contain.text','cancele2e');
  })
  it('should create a page',()=>{
    cy.server();
    cy.createPage();
  })
  it('should publish > update name and link > revert',()=>{
    cy.server();
    cy.createPage();        
    cy.fixture('pages').then(({page})=>{
      const pageLabel = page.label;
      const pageLink = page.link;
      cy.route(
        'POST',
        '/boom/services/rest/pagemanagement/v1/publish/*',
        page
      ).as('publish');
      cy.get('[data-cy=publish-button').click();
      cy.wait('@publish').then(()=>{
        page.label = page.label+'-updated';
        page.link = page.link+'-updated';
        page.canRevert = true;
        cy.route(
          'POST',
          '/boom/services/rest/pagemanagement/v1/update',
          page
        ).as('update');
        cy.get('#open-settings-button').click();
        cy.get('#page-name').type('-updated');
        cy.get('#page-link').type('-updated');
        cy.get('#save-button').click();
        cy.wait('@update').then(()=>{
          cy.get('.title-header').contains(page.label);
          cy.get('#open-settings-button').click();
          cy.get('#page-name').should('have.value',page.label);
          cy.get('#page-link').should('have.value',page.link);
          cy.get('#close-button').click({force:true});
          page.label = pageLabel;
          page.link = pageLink;
          cy.route(
            'POST',
            '/boom/services/rest/pagemanagement/v1/revert/*',
            page
          ).as('revert');
          cy.get('#revert-button').click();
          cy.wait('@revert').then(()=>{
            cy.get('.title-header').contains(page.label);
            cy.get('#open-settings-button').click();
            cy.get('#page-name').should('have.value',page.label);
            cy.get('#page-link').should('have.value',page.link);
          })
        })
      })
    })
  })
  it('should have a correct widget menu',()=>{
    cy.createPage();
    cy.get('.page-details-editor').within(()=>{
      cy.contains('button','Add widget').click();
    })
    cy.get('#widget-search').within(()=>{
      cy.get('div > svg').should('have.class', 'fa-search');
      cy.get('span').should('have.text','Search');
    })
    cy.get('#widget-text').within(()=>{
      cy.get('div > svg').should('have.class', 'fa-file-alt');
      cy.get('span').should('have.text','Flat text');
    })
  })
  it('should close onclick the "x"',()=>{
    cy.createPage()
    cy.get('.page-details-editor').within(()=>{
      cy.contains('button','Add widget').click();
    })
    cy.get('.widget-selector-body').should('exist');
    cy.get('.layout-dialog-title').within(()=>{
      cy.get('#close-button').click();
    });
    cy.get('.widget-selector-body').should('not.exist');
  })
  it('should create widget text',()=>{
    cy.server();
    cy.createPage();
    cy.fixture('pages').then(({page, textWidget})=>{
      page.pageWidgets=page.pageWidgets[textWidget];
      cy.route(
        'POST',
        '/boom/services/rest/pagemanagement/v1/*',
        page
      ).as('widget');
      cy.get('.page-details-editor').within(()=>{
        cy.contains('button','Add widget').click();
      })
      cy.get('#widget-text').click({force:true});
      cy.get('#text-title').type(textWidget.title);
      cy.get('.DraftEditor-editorContainer').type('Content');
      cy.get('#save-button').click();
      cy.wait('@widget');
      cy.get('.react-grid-item').contains(textWidget.title);
    })
  })
})
