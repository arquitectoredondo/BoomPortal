
declare namespace Cypress {
    interface Chainable<Subject> {
      login():Chainable<void>
      setToken():Chainable<void>
      colorPickerWithButton(button:string, expectedColorRgb:string, colorSelector:string, palette?:string, ):Chainable<void>
      colorPickerClean(buttonPosition:number, finalColoredDiv:string):Chainable<void>
      fileUpload(inputUpload:string, fileRoute:string, fileType:string):Chainable<void>
      openPortalFromList(portalName:string):Chainable<void>
      dragAndDrop(draggable:string, drop:string):Chainable<void>
      createPage(name?:string, link?:string):Chainable<void>
      createTheme(mock:object):Chainable<void>
      createPortal(name?:string):Chainable<void>
      createJournal(name:string, mock:object):Chainable<void>
      setHomePage(pageName:string):Chainable<void>
      createPortalMockSetup():Chainable<void>
    }
  }