// const { first } = require("cypress/types/lodash");
/// <reference types="cypress"/>


const baseUrl = 'https://master.d2edn1not0aeaf.amplifyapp.com';
const testData = require('./testData.json');
const testMethods = require('./functions.js');
const generalSelectors = testData.selectors.generalSelectors;





describe('form1', () => {
  beforeEach(() => { 
      cy.visit(baseUrl,{failOnStatusCode:false});
      cy.wait(1000);
      cy.window().then((win) => {
        win.location.href = '/business-licensing/999';
      })
    })

    it("test",() =>{
      testMethods.enterRequestDetails();
      testMethods.seconedPage();
      testMethods.thiredPage();
      testMethods.fourthPage();
      testMethods.fifthPage();
      testMethods.sixthPage();
  })

})
  