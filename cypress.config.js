const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here (optional)
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 5000,
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/e2e/**/*.cy.js",         // ✅ Ensure Cypress looks for tests
    supportFile: "cypress/support/e2e.js",          // ✅ Ensures custom commands are loaded
  },
});
