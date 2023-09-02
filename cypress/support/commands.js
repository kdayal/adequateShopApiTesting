// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

// Define a custom command to set a global variable
/* Cypress.Commands.add('setGlobalVariable', (key, value) => {
    cy.window().then((win) => {
      win[key] = value;
    });
  });
  
  // Define a custom command to get a global variable
  Cypress.Commands.add('getGlobalVariable', (key) => {
    return cy.window().then((win) => {
      return win[key];
    });
  }); */
  
/*   Cypress.Commands.add('setGlobalVariable', (key, value) => {
    cy.window().its(key).then((globalVar) => {
      globalVar = value;
    });
  });
  
  Cypress.Commands.add('getGlobalVariable', (key) => {
    return cy.window().its(key);
  }); */
  
  Cypress.Commands.add('setGlobalVariable', (key, value) => {
    cy.window().then((win) => {
      win[key] = value;
    });
  });
  
  Cypress.Commands.add('getGlobalVariable', (key) => {
    return cy.window().then((win) => {
      return cy.wrap(win[key]);
    });
  });
  