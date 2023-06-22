// const { first } = require("cypress/types/lodash");
/// <reference types="cypress"/>


const baseUrl = 'https://master.d2edn1not0aeaf.amplifyapp.com';
const testData = require('./testData.json');
const testMethods = require('./functions.js');
const ownerData = testData.owners[0];
const firstPageSelectors = testData.selectors.firstPageSelectors;
const seconedPageSelectors = testData.selectors.seconedPageSelectors;
const generalSelectors = testData.selectors.generalSelectors;





function enter_otp(valid=true) {
  cy.wait(3500);
  if(valid){
    for (let index = 1; index <= 5; index++) {
      cy.get(`:nth-child(${index}) > input`).type('1');
      
    }
  }else{
    for (let index = 1; index <= 5; index++) {
      cy.get(`:nth-child(${index}) > input`).type(`${index}`);
      
    }
  }
  cy.get('.MuiButton-containedPrimary').click();
}

function hoverAndClick(selector,first=false) {
  cy.wait(7000);
  if(first){
    let elem = cy.get(`${selector}`).first().should('be.visible',{ timeout: 50000 }).trigger('mouseover').as('button').click({force:true});
  }else{
    let elem = cy.get(`${selector}`).should('be.visible',{ timeout: 50000 }).trigger('mouseover').as('button').click({force:true});
  }
  cy.wait(1500);
}

function checkCheckBox(selector, first=false) {
  if(first){
    let elem = cy.get(`${selector}`).first().check().should('be.checked');
  }else{
    let elem = cy.get(`${selector}`).check().should('be.checked');
  }
  
}

function clickOptionOnUl(ulselector,option,cssfix=false) {
  if(cssfix){
  let elem = cy.get(`${ulselector}`).scrollIntoView().contains('li', `${option}`).scrollIntoView().click(); 
  }else{
  let elem = cy.get(`${ulselector}`).scrollIntoView().should('be.visible', { timeout: 50000}).contains('li', `${option}`).click();
  }
}

function goNextStep(){
  let a = cy.document()
  cy.get(generalSelectors.nextButton).click();
  cy.window().then((win)=>{cy.document({timeout:15000}) != a});
}



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
      enter_otp(testData.validOTP);
      testMethods.seconedPage();
      testMethods.thiredPage();
      testMethods.fourthPage();
      testMethods.fifthPage();
      testMethods.sixthPage();


  })

})
  