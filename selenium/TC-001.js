const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { add_firestore } = require('../audit/firebase/command');

async function tc_001_login() {
    let driver = await new Builder().forBrowser('chrome').build()
    const date = new Date()
    const BASEURL = 'http://localhost:8000'

    // Test Data
    const email = 'flazen.edu@gmail.com'
    const password = 'nopass123'
   
    try {
        // Test Step 1 : Pengguna membuka halaman login
        await driver.get(`${BASEURL}/login`)

        // Test Step 2 : Pengguna mengisikan form login
        await driver.findElement(By.id('email-input')).sendKeys(email)
        await driver.findElement(By.id('pass-input')).sendKeys(password)

        let screenshot_1 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-001-Step 2-Test Data on ${date}.png`, screenshot_1, 'base64')

        // Test Step 3 : Pengguna menekan button submit
        await driver.findElement(By.id('submit-btn')).click()

        await driver.wait(until.urlContains('dashboard'), 10000)
        let screenshot_2 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-001-Step 3-Test Data on ${date}.png`, screenshot_2, 'base64')
        
        await driver.executeScript('alert("TC-001 Login Test Success")')
        await driver.wait(until.alertIsPresent())
        await driver.switchTo().alert()

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-001',
            tc_name: 'Login',
            tc_desc: 'Validate Test Steps for login using email and password',
            tc_data: {
                email: email,
                password: password,
            },
            tc_evidence_name: [
                `TC-001-Step 2-Test Data on ${date}.png`,
                `TC-001-Step 3-Test Data on ${date}.png`
            ],
            tested_at: date,
            tc_base_url: BASEURL
        };
        await add_firestore(data, 'test_audit_kumande')
    } catch (error) {
        console.error('Error occurred:', error.message)
    } finally {
        await driver.quit()
    }
}

tc_001_login()
