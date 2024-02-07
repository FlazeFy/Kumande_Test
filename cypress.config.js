const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        // baseUrl : 'https://kumande.leonardhors.site',
        baseUrl: 'http://127.0.0.1:8000/',
        specPattern : "support/integrations",
        supportFile : false
    }
})