const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 5000,
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/e2e/**/*.cy.js",         
    supportFile: "cypress/support/e2e.js",          
  },
});
