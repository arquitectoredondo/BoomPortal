import {  } from 'cypress';

Cypress.Commands.add("login", function (){
  cy.server()
  cy.visit('/')
  cy.route({
    method: 'POST',
    url: `/boom/services/rest/authmanagement/v1/auth/login`,
  }).as('login');
  cy.route('/site/portal').as('portal');
    cy.get('button').click()
  cy.wait('@login').then(({response:{body:{token}}})=>{
    window.localStorage.setItem('jwtToken', token);
  })   
})

Cypress.Commands.add('colorPickerWithButton', (button:string, colorSelector:string, expectedColorRgb:string, palette?:string,)=>{
  
  cy.get(button).click();
  if(palette){
    cy.get(palette)
    .should('exist')
    .within(()=>{
      cy.get(colorSelector)
      cy.get(colorSelector).should('have.css','background-color',expectedColorRgb)
      cy.get(colorSelector)
        .click({force: true});
    })
  }else{
    cy.get(colorSelector)
      cy.get(colorSelector).should('have.css','background-color',expectedColorRgb)
      cy.get(colorSelector)
        .click({force: true});
  }
});

Cypress.Commands.add('fileUpload',(inputUpload, fileRoute, fileType)=>{
  cy.fixture(fileRoute, 'base64').then(fixture => {
    Cypress.Blob.base64StringToBlob(fixture, fileType).then(blob => {
      cy.get(inputUpload).then($input => {
        const imageFile = new File([blob], fileRoute, { type:fileType })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(imageFile)
        $input[0].files = dataTransfer.files
      })
      .trigger('change', { force: true })
    })
  })
});

Cypress.Commands.add('openPortalFromList"', (portalName)=>{
  cy.route({
    method: 'GET',
    url: '/boom/services/rest/portalmanagement/v1/portal/settings/*',
  }).as('portal');
  cy.contains('td',portalName).click();
  cy.wait('@portal');
})

Cypress.Commands.add('dragAndDrop', (draggable, drop) => {
  cy.get(drop)
    .then($drop => {
      let finalCoord = $drop[0].getBoundingClientRect();
      cy.get(draggable)
        .then(draggable => {
          const initialCoord = draggable[0].getBoundingClientRect();
          cy.wrap(draggable)
            .trigger('mousedown', {
              button: 0,
              clientX: initialCoord.x,
              clientY: initialCoord.y,
              force: true
            })
            .trigger('mousemove', {
              button: 0,
              clientX: initialCoord.x + 10,
              clientY: initialCoord.y,
              force: true
            })
            .wait(200);
          cy.get('.settings-body')
            .trigger('mousemove', {
              button: 0,
              clientX: finalCoord.x,
              clientY: finalCoord.y,
              force: true            
            })
            .trigger('mouseup',{
              force:true
            })
            .wait(500);
        });
    });
});
Cypress.Commands.add('setHomePage',(mock)=>{
  cy.get('#menu-pages').click({force:true});
  cy.get('.MuiList-root > [tabindex="0"]').click({force:true});
  cy.get('#menu-label').type('home');
  cy.get('#save-button').click({force:true});
})