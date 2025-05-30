const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 5000,
    baseUrl: "http://127.0.0.1:3000",
    experimentalSessionAndOrigin: true, // <-- This line is critical for cy.session()
  },
});
