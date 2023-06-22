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
      testMethods.enterRequestDetails(  testData.firstName,
        testData.lastName,
        testData.idNumber,
        testData.email,
        testData.phone)
      enter_otp(testData.validOTP);
      cy.get('#businessName').should('be.visible' ,{ timeout: 50000}).type('שם עסק');
      checkCheckBox(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input');
      cy.get('#numOfEmployees').type('5');
      cy.get('.MuiInputBase-root > #businessDescription').type('תיאור טסט');
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
      hoverAndClick('#vocations\\[0\\]\\.businessCategory');
      clickOptionOnUl('[role="listbox"]',ownerData.category);
      hoverAndClick('#vocations\\[0\\]\\.itemDetails');
      clickOptionOnUl('[role="listbox"]',ownerData.subCategory);
      cy.get('#vocations\\[0\\]\\.description').type('test').should('have.value', 'test', { timeout: 50000 });;
      goNextStep();
      cy.get('#owners\\[0\\]\\.firstName').type(ownerData.firstName).should('have.value', ownerData.firstName, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.lastName').type(ownerData.lastName).should('have.value', ownerData.lastName, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.identityNum').type(ownerData.idNumber).should('have.value', ownerData.idNumber, { timeout: 50000 });
      hoverAndClick('#owners\\[0\\]\\.address\\.cityId');
      clickOptionOnUl('[role="listbox"]',ownerData.city);
      hoverAndClick('#owners\\[0\\]\\.address\\.streetId');
      clickOptionOnUl('[role="listbox"]',ownerData.street,true);
      cy.get('#owners\\[0\\]\\.address\\.houseNum').type(ownerData.houseNum).should('have.value', ownerData.houseNum, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.entrance').type(ownerData.entrance).should('have.value', ownerData.entrance, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.floor').type(ownerData.floor).should('have.value', ownerData.floor, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.zip').type(ownerData.zip).should('have.value', ownerData.zip, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.phone').type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.mobile').type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
      cy.get('#owners\\[0\\]\\.address\\.email').type(ownerData.email).should('have.value', ownerData.email, { timeout: 50000 });
      goNextStep();
      cy.get(':nth-child(1) > .sc-ftvSup > .actions > .MuiButtonBase-root').click({force:true});
      cy.get('.submit').click();


  })

})
  