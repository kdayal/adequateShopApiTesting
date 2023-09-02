const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "USERNAME": 'qwerty5432@gmail.com',
  "PASSWORD": 'Pkj*893Tsq',
  "API_URL": "http://restapi.adequateshop.com/api/",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration"
  },
});
