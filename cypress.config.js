const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        // baseUrl : 'https://kumande.leonardhors.site',

        // For Backend Apps
        // baseUrl: 'http://127.0.0.1:8000/',

        // For Frontend Apps
        baseUrl: 'http://localhost:3001/',
        
        specPattern : "support",
        supportFile : false,
    }
})