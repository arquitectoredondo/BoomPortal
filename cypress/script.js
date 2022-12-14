const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

function runTests() {
  fse.remove('mochawesome-report').then(()=>{
    cypress.run().then((results)=>{
      const reporterOptions = {
      reportDir: results.config.reporterOptions.reportDir,
      }
      generateReport(reporterOptions)
      
      if(results.totalFailed !== 0){
        process.exit(2);
      }
    })
  })
  
}
const generateReport = (options)=> {
    return merge(options).then((jsonReport)=>{
        generator.create(jsonReport).then(()=>{
          process.exit()
        })
    })
}

runTests()
