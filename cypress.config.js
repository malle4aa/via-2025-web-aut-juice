const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 90000, // 🔧 increased from default 60s to 90s
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // Node event listeners here
    },
  },
  dOrigin: true,
  e2e: {
  pageLoadTimeout: 100000,
  defaultCommandTimeout: 10000,
  baseUrl: "http://localhost:3000",
  chromeWebSecurity: false,
  experimentalSessionAndOrigin: true,
},

});
