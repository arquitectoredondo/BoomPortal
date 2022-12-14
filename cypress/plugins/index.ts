import Cypress from "cypress";
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

module.exports = (on: (arg0: string, arg1: any) => void) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
}
