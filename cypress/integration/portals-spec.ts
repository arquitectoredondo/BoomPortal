/// <reference types="../support" />
import cypress from 'cypress';

describe('Portal', ()=>{
  beforeEach(()=>{
    cy.server();
    cy.login();
    cy.fixture('portals')
    .then(({settings,list}) => {
      const token = `Bearer ${window.localStorage.getItem('jwtToken')}`;
      cy.route({
        method:'GET',
        url:`/boom/services/rest/portalmanagement/v1/portal/list`,
        headers: {'Authorization': `Bearer ${token}`},
        response:list
      }).as('list');
      cy.visit('/site/portals');
      cy.get('button').click();
      cy.wait('@list');
      cy.route({
        method:'GET',
        url:`/boom/services/rest/portalmanagement/v1/portal/settings/${settings.uuid}`,
        response:settings
      }).as('portal');
      cy.route({
        method:'POST',
        url:`/boom/services/rest/portalmanagement/v1/portal/settings/update`,
        response:settings
      }).as('update');
      cy.contains(settings.name).click({force:true});
      cy.wait('@portal');
      cy.wait('@update');
    })
  })
  it('should cancel before create a portal',()=>{
    cy.login();
    cy.get('#add-button').click();
    cy.get('#portal-name').type('cancelPage');
    cy.get('#cancel-button').click({force:true});
    cy.get('.MuiTableBody-root').should('not.contain.text','cancelPage');
  })
  it('should create a portal', ()=>{
    cy.login();
    cy.fixture('portals')
      .then(({create}) => {
        cy.server();
        cy.route('POST', '/boom/services/rest/portalmanagement/v1/portal/create', create).as('newPortal');
        cy.get('#add-button').click();
        cy.get('#save-button').should('be.disabled');
        cy.get('#portal-name').type('e2etest');
        cy.get('#save-button').click();
        cy.wait('@newPortal').its('status').should('equal',200);
      })
  })
  it('should have a proper formated list',()=>{
    cy.fixture('portals')
    .then(({list}) => {
      cy.login();
      const token = `Bearer ${window.localStorage.getItem('jwtToken')}`;
      cy.route({
        method:'GET',
        url:`/boom/services/rest/portalmanagement/v1/portal/list`,
        headers: {'Authorization': token},
        response:list
      }).as('list');
      cy.contains('Select portal');
      cy.contains('.header-body','Manage Portals');
      cy.contains('#admin-table-header','Portal');
      cy.get('.admin-table > tbody').contains('#admin-table-row',list[0].name).within(()=>{
        cy.get('td').eq(0).should('contain',list[0].name);
        cy.get('td').eq(1).should('contain',list[0].createdBy);
        cy.get('td').eq(2).should('contain',list[0].domain);
        cy.get('td').eq(4).should('contain','Published');
        cy.get('[data-icon=eye-slash]')
      }).click({force:true})
      cy.get('[data-cy=visibility-button]').click();
      cy.get('[data-cy=publish-button]').click();
      cy.get('#back-button').click({force:true});
      cy.get('.admin-table > tbody').contains('#admin-table-row',list[0].name).within(()=>{
        cy.get('td').eq(4).should('not.contain','Modified');
        cy.get('[data-icon=eye]')
      });
    })
  });

  it('should change the domain',()=>{
    cy.fixture('portals').then(({settings})  => {
      const updatedDomain = `${settings.domain}-updated`;
      settings.domain = updatedDomain;
      cy.route('POST','/boom/services/rest/portalmanagement/v1/portal/settings/update',settings)
        .as('update');
      cy.get('#settings-url')
        .clear()
        .type(settings.domain);
      cy.get('#settings-name').click();
      cy.wait('@update').then(({status,response:{body:{domain}}})=>{
        expect(status).to.eq(200);
        expect(domain).to.eq(settings.domain);
      })
    })
  })
  
  it('[main-color]should change color picker button backgroud color',()=>{
    cy.fixture('portals').then(({settings})  => {
      settings.primaryColor = '#ff6900';
      cy.get('.color-section').within(()=>{
        cy.server();
        cy.route(
          'POST',
          '/boom/services/rest/portalmanagement/v1/portal/settings/update',
          settings
        ).as('update');
        cy.colorPickerWithButton(
          '[data-cy=main-color-button]',
          'div[title="#FF6900"]',
          'rgb(255, 105, 0)',
          '[data-cy=main-color-palette]',
        );
        cy.wait('@update').then(({response})=>{
          const color = '#FF6900';
          expect(response.body.primaryColor).to.eq(color.toLowerCase())
        });
      })
    })
  })
  it('[main-menu]should change color picker button backgroud color',()=>{
    cy.fixture('portals').then(({settings})  => {
      settings.colorMainMenu = '#fcb900';
      cy.get('.color-section').within(()=>{
        cy.server();
        cy.route(
          'POST',
          '/boom/services/rest/portalmanagement/v1/portal/settings/update',
          settings
        ).as('update');
        cy.colorPickerWithButton(
          '[data-cy=main-menu-button]',
          'div[title="#FCB900"]',
          'rgb(252, 185, 0)',
          '[data-cy=menu-main-color-palette]',
        );
        cy.wait('@update').then(({response})=>{
          const color = '#FCB900';
          expect(response.body.colorMainMenu).to.eq(color.toLowerCase())
        });
      })
    })
  })
  it('[secondary-color]should change color picker button backgroud color',()=>{
    cy.fixture('portals').then(({settings})  => {
      settings.colorSecondary = '#7bdcb5';
    cy.get('.color-section').within(()=>{
        cy.server();
        cy.route(
          'POST',
          '/boom/services/rest/portalmanagement/v1/portal/settings/update',
          settings
        ).as('update');
        cy.colorPickerWithButton(
          '[data-cy=secondary-color-button]',
          'div[title="#7BDCB5"]',
          'rgb(123, 220, 181)',
          '[data-cy=secondary-color-palette]',
        );
        cy.wait('@update').then(({response})=>{
          const color = '#7BDCB5';
          expect(response.body.colorSecondary).to.eq(color.toLowerCase())
        });
      })
    })
  })
  it('should upload a favicon and revert',()=>{
    cy.server();
    cy.fixture('portals').then(({settings, settingsRaw})  => {
      cy.route(
        'POST',
        '/boom/services/rest/portalmanagement/v1/portal/settings/update',
        settingsRaw
        ).as('favicon');
      cy.get('[data-cy=favicon]')
        .should('have.attr','src');
      cy.get('[data-cy=favicon-revert-button]').click();
      cy.get('[data-cy=favicon]')
        .wait('@favicon')
        .should('not.have.attr','src');
      cy.route(
        'POST',
        '/boom/services/rest/portalmanagement/v1/portal/settings/update',
        settings
      ).as('favicon');
      cy.fileUpload('[data-cy=portal-favicon-button-file]','img.png','image/png');
      cy.wait('@favicon')
    })
  })
  it('should upload a portal logo and revert',()=>{
    cy.server();
    cy.fixture('portals').then(({settings, settingsRaw})  => {
      cy.route(
        'POST',
        '/boom/services/rest/portalmanagement/v1/portal/settings/update',
        settingsRaw
        ).as('logo');
      cy.get('[data-cy=logo]')
        .should('have.attr','src');
      cy.get('[data-cy=logo-revert-button]').click();
      cy.get('[data-cy=logo]')
        .wait('@logo')
        .should('not.have.attr','src');
      cy.route(
        'POST',
        '/boom/services/rest/portalmanagement/v1/portal/settings/update',
        settings
      ).as('logo');
      cy.fileUpload('#portal-logo-button-file','img.png','image/png');
      cy.wait('@logo');
    })
  })
  
  it('should create and move menu items',()=>{
    cy.fixture('portals').then(({settings})  => {
      cy.get('#add-item-button').click();
      cy.get('#menu-controller').click();
      cy.get('.MuiPaper-root > .MuiList-root')
        .children()
        .contains('news')
        .click({force:true});
      cy.get('#menu-label').type('news1');
      cy.get('#save-button').click({force:true});
      cy.get('#add-item-button').click();
      cy.get('#menu-controller').click();
      cy.get('.MuiPaper-root > .MuiList-root')
        .children()
        .contains('news')
        .click({force:true});
      cy.get('#menu-label').type('news2');
      cy.get('#save-button').click({force:true});
      cy.get(':nth-child(1) > .MuiListItem-root').should('contain','news1');
      cy.get(':nth-child(2) > .MuiListItem-root').should('contain','news2');
      cy.server();
      settings.menuItems=[
        {"id":"1529002db42b44c8ad6e18ded3be0863","label":"news2","pageId":null,"type":1,"folder":null},
        {"id":"35325266c43a4fe2a39e6fb5274b35bc","label":"news1","pageId":null,"type":1,"folder":null}
      ]
      cy.route(
        'POST',
        '/boom/services/rest/portalmanagement/v1/portal/settings/*',
        settings
      ).as('update');
      cy.dragAndDrop(':nth-child(2) > .MuiListItem-root',':nth-child(1) > .MuiListItem-root')
      cy.wait('@update').then(()=>{
        cy.get(':nth-child(1) > .MuiListItem-root').should('contain','news2')
        cy.get(':nth-child(2) > .MuiListItem-root').should('contain','news1')
      });
    })
  });
});