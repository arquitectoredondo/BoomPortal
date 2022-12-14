/// <reference types="../support" />
import cypress from 'cypress';

describe('Journal',()=>{
  beforeEach(()=>{
    cy.server();
    cy.login()
    cy.fixture('journals')
    .then(({list}) => {
      cy.route(
        'GET',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/list',
        list
      ).as('journalsList');
      cy.get('.sidebar-body')
        .contains('Journals')
        .should('have.attr','href','/site/journals')
        .click();
      cy.wait('@journalsList')
    })
  });
  it('should cancel before create a journal',()=>{
    cy.login()
    cy.fixture('journals')
    .then(({list}) => {
      cy.route(
        'GET',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/list',
        list
      ).as('journalsList');
      cy.get('.sidebar-body')
        .contains('Journals')
        .should('have.attr','href','/site/journals')
        .click();
      cy.wait('@journalsList')
    })
    cy.get('#add-button').click();
    cy.get('#save-button').should('be.disabled');
    cy.get('#journal-name').type('cancelede2e');
    cy.get('#cancel-button').click();
    cy.get('.MuiTableBody-root').should('not.contain.text','cancelede2e');
  });
  it('should create a journal',()=>{
    cy.server()
    cy.on('uncaught:exception', () => {
        return false
      });
    cy.fixture('journals')
      .then(({create}) => {
        cy.createJournal(create.name, create);
      })
  });
  it('should have a proper formated list',()=>{
    cy.server()
    cy.fixture('journals')
      .then(({list}) => {
        cy.contains('Select journal');
        cy.contains('.header-body','Manage Portals');
        cy.contains('#admin-table-header','Portal');
        cy.get('.admin-table > tbody').contains('#admin-table-row',list[0].name).within(()=>{
          cy.get('td').eq(0).should('contain',list[0].name);
          cy.get('td').eq(1).should('contain',list[0].editedBy);
          cy.get('td').eq(3).should('contain','Modified');
          cy.get('[data-icon=eye-slash]');
        });
        cy.get('.admin-table > tbody').contains('#admin-table-row',list[1].name).within(()=>{
          cy.get('td').eq(0).should('contain',list[1].name);
          cy.get('td').eq(1).should('contain',list[1].editedBy);
          cy.get('td').eq(3).should('contain','Published');
          cy.get('[data-icon=eye]');
        });
      })
  });
  it('should publish',()=>{
    cy.server()
    cy.fixture('journals')
      .then(({journalRaw}) => {
        cy.createJournal(journalRaw.name, journalRaw);
        cy.route(
          'GET',
          `/boom/services/rest/journalsitemanagement/v1/journalsite/publish/${journalRaw.uuid}`,
          journalRaw
        ).as('publish');
        cy.get('#publish-changes-button').click()
        cy.wait('@publish').its('status').should('equal',200);
      })
  });
  it('should change name and revert',()=>{
    cy.server()
    cy.fixture('journals')
      .then(({journal}) => {
        cy.createJournal(journal.name, journal);
        const oldName = journal.name
        journal.name = `${journal.name}u`;
        cy.route(
          'PUT',
          '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
          journal
        ).as('update');
        cy.get('#settings-name')
          .type('u');
          cy.get('#settings-name').should('have.value',journal.name);
        cy.wait('@update').then(()=>{
          journal.name=oldName;
        cy.route(
          'GET',
          `/boom/services/rest/journalsitemanagement/v1/journalsite/revert/${journal.uuid}`,
          journal
        ).as('revert');
          cy.get('#revert-button').click();
          cy.wait('@revert').then(()=>{
            cy.get('#settings-name')
            .should('have.value',oldName);
          })
        })
      })
  });

  it('[background-color]should change color picker button backgroud color',()=>{
    cy.fixture('journals').then(({journalRaw})  => {
      cy.createJournal(journalRaw.name, journalRaw).then(()=>{
        journalRaw.colour = '#fcb900';
      })
      cy.server();
      cy.route(
        'PUT',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
        journalRaw
      ).as('update');
      cy.colorPickerWithButton(
        '[data-cy=background-color-button]',
        'div[title="#FCB900"]',
        'rgb(252, 185, 0)'
      );
      cy.wait('@update');
      cy.wait('@update').then(({response})=>{
        const color = '#FCB900';
        expect(response.body.colour).to.eq(color.toLowerCase())
      });
    })
  })
  it('should create menu items',()=>{
    cy.server();
    cy.fixture('journals').then(({journalRaw})  => {
      cy.createJournal(journalRaw.name, journalRaw);
      journalRaw.menuItems=[{"id":"35325266c43a4fe2a39e6fb5274b35bc","label":"news1","pageId":null,"type":1,"folder":null},]
      cy.route(
        'GET',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
        journalRaw
      ).as('update');
      cy.get('#add-item-button').click();
      cy.get('#menu-controller').click();
      cy.get('.MuiPaper-root > .MuiList-root')
      .children()
      .contains('news')
      .click({force:true});
      cy.get('#menu-label').type('news1');
      cy.get('#save-button').click({force:true});
      cy.wait('@update');
    })
  });
  it('should move menu items',()=>{
    cy.fixture('journals').then(({journalRaw})  => {
      cy.createJournal(journalRaw.name, journalRaw);
        journalRaw.menuItems=[
        {"id":"1529002db42b44c8ad6e18ded3be0863","label":"news2","pageId":null,"type":1,"folder":null},
        {"id":"35325266c43a4fe2a39e6fb5274b35bc","label":"news1","pageId":null,"type":1,"folder":null}
      ]
      cy.route(
        'PUT',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
        journalRaw
      ).as('update');
      cy.dragAndDrop(':nth-child(2) > .MuiListItem-root',':nth-child(1) > .MuiListItem-root')
      cy.get(':nth-child(1) > .MuiListItem-root').should('contain','news2')
      cy.get(':nth-child(2) > .MuiListItem-root').should('contain','news1')
      cy.wait('@update');
    })
  })
  it('should change visibility',()=>{
    cy.server();
    cy.fixture('journals').then(({journalRaw})  => {
      cy.createJournal(journalRaw.name, journalRaw).then(()=>{
        journalRaw.visibility=true;
      });
      cy.get('#visibility-switch').should('not.have.attr','checked');
      cy.route(
        'PUT',
        '/boom/services/rest/journalsitemanagement/v1/journalsite/update',
        journalRaw
      ).as('update');
      cy.get('#visibility-switch').click();
      cy.wait('@update');
      cy.get('#visibility-switch').should('have.attr','checked');
    })
  });
})