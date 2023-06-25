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
      cy.debug().log
      cy.wait(1500);
      testMethods.thiredPage();
      cy.wait(1500);
      testMethods.fourthPage();
      cy.wait(1500);
      testMethods.fifthPage();
      cy.wait(1500);
      testMethods.sixthPage();
  })

})
  