const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl : 'https://kumande.leonardhors.site',
        specPattern : "cypress/support/e2e",
        supportFile : false
    }
})