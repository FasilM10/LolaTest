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
    if(first){
        cy.wait(7000);
        let elem = cy.get(`${selector}`).first().should('be.visible',{ timeout: 50000 }).trigger('mouseover').as('button').click({force:true});
    }else{
        cy.wait(3500);
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
  
  
  export function enterRequestDetails(firstName, lastName, idNumber, email, phone, valid=true, type=1, owner=1,) {
    hoverAndClick([firstPageSelectors.firstButton],true);
    // cy.wait(5000);
    clickOptionOnUl(generalSelectors.ulsSelector, testData.bussinesType);
    checkCheckBox(firstPageSelectors.businnes_holder_down);
    checkCheckBox(firstPageSelectors.applicant_up)
    cy.get(firstPageSelectors.first_name).type(firstName);
    cy.get(firstPageSelectors.last_name).type(lastName);
    checkCheckBox(firstPageSelectors.recognitionTypeId,true);
    cy.get(firstPageSelectors.identification_number).type(idNumber);
    cy.get(firstPageSelectors.email).type(email);
    cy.get(firstPageSelectors.mobile).type(phone);
    cy.get(firstPageSelectors.otp_btn).click('left');
  }
  

export function seconedPage(bussinesName,numberOfEmployees) {
    cy.get(seconedPageSelectors.businessNameField).should('be.visible' ,{ timeout: 50000}).type(bussinesName);
    checkCheckBox(seconedPageSelectors.checkBoxBussines);
    cy.get(seconedPageSelectors.bussinessSizeField).type(numberOfEmployees);
    cy.get(seconedPageSelectors.businessDescriptionField).type('תיאור טסט');
    cy.get('.steps > :nth-child(2)').click();
    cy.wait(4000);
    hoverAndClick('#cityId');
    clickOptionOnUl('[role="listbox"]', ownerData.city,true);
    cy.wait(3000);
    hoverAndClick('#streetId');
    clickOptionOnUl('[role="listbox"]', ownerData.street,true);
    cy.get('#houseNum').type(ownerData.houseNum).should('have.value', ownerData.houseNum, { timeout: 50000 });
    cy.get('#entrance').type(ownerData.entrance).should('have.value', ownerData.entrance, { timeout: 50000 });
    cy.get('#floor').type(ownerData.floor).should('have.value', ownerData.floor, { timeout: 50000 });
    cy.get('#zip').type(ownerData.zip).should('have.value', ownerData.zip, { timeout: 50000 });
    cy.get('#poBox').type(ownerData.poBox).should('have.value', ownerData.poBox, { timeout: 50000 });
    cy.get('#phone').type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get('#mobile').type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get('#email').type(ownerData.email).should('have.value', ownerData.email, { timeout: 50000 });
    cy.get('#businessSize').type(ownerData.size).should('have.value', `0${ownerData.size}`, { timeout: 50000 });
    hoverAndClick('#accessToBusiness');
    cy.wait(500);
    clickOptionOnUl('[role="listbox"]',ownerData.access);
    cy.get('#storeNum').type(ownerData.storeNum).should('have.value', ownerData.storeNum, { timeout: 50000 });
    goNextStep()
}