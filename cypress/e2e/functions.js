/// <reference types="cypress"/>
const baseUrl = 'https://master.d2edn1not0aeaf.amplifyapp.com';
const testData = require('./testData.json');
const ownerData = testData.owners[0];
const firstPageSelectors = testData.selectors.firstPageSelectors;
const seconedPageSelectors = testData.selectors.seconedPageSelectors;
const generalSelectors = testData.selectors.generalSelectors;
const thiredPageSelectors = testData.selectors.thiredPageSelector;
const fourthPageSelectors = testData.selectors.fourthPageSelector;
const fifthPageSelectors = testData.selectors.fifthPageSelectors;
const sixthPageSelectors = testData.selectors.sixthPageSelectors;


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
    cy.wait(2500);
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
  
  
  export function enterRequestDetails() {
    hoverAndClick([firstPageSelectors.firstButton],true);
    // cy.wait(5000);
    clickOptionOnUl(generalSelectors.ulsSelector, testData.bussinesType);
    checkCheckBox(firstPageSelectors.businnes_holder_down);
    checkCheckBox(firstPageSelectors.applicant_up)
    cy.get(firstPageSelectors.first_name).type(testData.firstName);
    cy.get(firstPageSelectors.last_name).type(testData.lastName);
    checkCheckBox(firstPageSelectors.recognitionTypeId,true);
    cy.get(firstPageSelectors.identification_number).type(testData.idNumber);
    cy.get(firstPageSelectors.email).type(testData.email);
    cy.get(firstPageSelectors.mobile).type(testData.phone);
    cy.get(firstPageSelectors.otp_btn).click('left');
    enter_otp(testData.validOTP);
  }
  

export function seconedPage() {
    cy.get(seconedPageSelectors.businessNameField).should('be.visible' ,{ timeout: 50000}).type(testData.businessName);
    checkCheckBox(seconedPageSelectors.checkBoxBussines);
    cy.get(seconedPageSelectors.bussinessNumberOfEmployeesField).type(testData.numOfEmployees);
    cy.get(seconedPageSelectors.businessDescriptionField).type(testData.businessDescription);
    goNextStep()
    cy.wait(4000);
}

export function thiredPage() {
    hoverAndClick(thiredPageSelectors.cityDropDown);
    clickOptionOnUl(generalSelectors.ulsSelector, ownerData.city,true);
    hoverAndClick(thiredPageSelectors.streetDropDown);
    clickOptionOnUl(generalSelectors.ulsSelector, ownerData.street,true);
    cy.get(thiredPageSelectors.houseNumField).type(ownerData.houseNum).should('have.value', ownerData.houseNum, { timeout: 50000 });
    cy.get(thiredPageSelectors.entranceField).type(ownerData.entrance).should('have.value', ownerData.entrance, { timeout: 50000 });
    cy.get(thiredPageSelectors.floorField).type(ownerData.floor).should('have.value', ownerData.floor, { timeout: 50000 });
    cy.get(thiredPageSelectors.zipField).type(ownerData.zip).should('have.value', ownerData.zip, { timeout: 50000 });
    cy.get(thiredPageSelectors.poBoxField).type(ownerData.poBox).should('have.value', ownerData.poBox, { timeout: 50000 });
    cy.get(thiredPageSelectors.phoneField).type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get(thiredPageSelectors.mobileField).type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get(thiredPageSelectors.emailField).type(ownerData.email).should('have.value', ownerData.email, { timeout: 50000 });
    cy.get(thiredPageSelectors.bussinessSizeField).type(ownerData.size).should('have.value', `0${ownerData.size}`, { timeout: 50000 });
    hoverAndClick(thiredPageSelectors.accessToBusinessDropdown);
    clickOptionOnUl(generalSelectors.ulsSelector,ownerData.access);
    cy.get(thiredPageSelectors.storeNumField).type(ownerData.storeNum).should('have.value', ownerData.storeNum, { timeout: 50000 });
    goNextStep()
    
}

export function fourthPage() {
    hoverAndClick(fourthPageSelectors.businessCategoryDropdown);
    clickOptionOnUl(generalSelectors.ulsSelector,ownerData.category);
    hoverAndClick(fourthPageSelectors.itemDetailsDropdown);
    clickOptionOnUl(generalSelectors.ulsSelector,ownerData.subCategory);
    cy.get(fourthPageSelectors.descriptionField).type('test').should('have.value', 'test', { timeout: 50000 });
    goNextStep();
}



export function fifthPage(){
    cy.get(fifthPageSelectors.firstNameField).type(ownerData.firstName).should('have.value', ownerData.firstName, { timeout: 50000 });
    cy.get(fifthPageSelectors.lastNameField).type(ownerData.lastName).should('have.value', ownerData.lastName, { timeout: 50000 });
    cy.get(fifthPageSelectors.ownerIdNumberField).type(ownerData.idNumber).should('have.value', ownerData.idNumber, { timeout: 50000 });
    hoverAndClick(fifthPageSelectors.cityDropdown);
    clickOptionOnUl(generalSelectors.ulsSelector,ownerData.city);
    hoverAndClick(fifthPageSelectors.streetDropdown);
    clickOptionOnUl(generalSelectors.ulsSelector,ownerData.street,true);
    cy.get(fifthPageSelectors.houseNumField).type(ownerData.houseNum).should('have.value', ownerData.houseNum, { timeout: 50000 });
    cy.get(fifthPageSelectors.entranceField).type(ownerData.entrance).should('have.value', ownerData.entrance, { timeout: 50000 });
    cy.get(fifthPageSelectors.floorField).type(ownerData.floor).should('have.value', ownerData.floor, { timeout: 50000 });
    cy.get(fifthPageSelectors.zipField).type(ownerData.zip).should('have.value', ownerData.zip, { timeout: 50000 });
    cy.get(fifthPageSelectors.phoneField).type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get(fifthPageSelectors.mobileField).type(ownerData.phone).should('have.value', ownerData.phone, { timeout: 50000 });
    cy.get(fifthPageSelectors.emailField).type(ownerData.email).should('have.value', ownerData.email, { timeout: 50000 });
    goNextStep();
}


export function sixthPage() {
    cy.get(sixthPageSelectors.downloadButton).click({force:true});
    cy.get(sixthPageSelectors.submitButton).click();
}