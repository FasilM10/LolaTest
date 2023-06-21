/// <reference types="cypress"/>
const baseUrl = 'https://master.d2edn1not0aeaf.amplifyapp.com';
const testData = require('./testData.json');
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
    cy.wait(3000);
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
  
  
  function enterRequestDetails(firstName, lastName, idNumber, email, phone, valid=true, type=1, owner=1,) {
    hoverAndClick(generalSelectors.ulsSelector,true);
    // cy.wait(5000);
    clickOptionOnUl(generalSelectors.ulsSelector, testData.bussinesType);
    checkCheckBox(selectors.businnes_holder_down);
    checkCheckBox(selectors.applicant_up)
    cy.get(selectors.first_name).type(firstName);
    cy.get(selectors.last_name).type(lastName);
    checkCheckBox('[name="recognitionTypeId"]',true);
    cy.get(selectors.identification_number).type(idNumber);
    cy.get(selectors.email).type(email);
    cy.get(selectors.mobile).type(phone);
    cy.get(selectors.otp_btn).click('left');
  }
  