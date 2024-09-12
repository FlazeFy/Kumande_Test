const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { add_firestore } = require('../audit/firebase/command');
const assert = require('assert');

async function tc_s003_see_today_calories() {
    let driver = await new Builder().forBrowser('chrome').build()
    const date = new Date()
    const BASEURL = 'http://localhost:8000'

    // Test Data
    const email = 'flazen.edu@gmail.com'
    const password = 'nopass123'
   
    try {
        // Test Step 1 : Pengguna telah masuk kedalam aplikasi
        await driver.get(`${BASEURL}/login`)
        await driver.findElement(By.id('email-input')).sendKeys(email)
        await driver.findElement(By.id('pass-input')).sendKeys(password)
        await driver.findElement(By.id('submit-btn')).click()
        await driver.wait(until.urlContains('dashboard'), 10000)
        let screenshot_1 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-S003-Step 1-Test Data on ${date}.png`, screenshot_1, 'base64')

        // Test Step 2 : Pada halaman dashboard. Pengguna mencari section today calories
        const todayCal = await (await driver.findElement(By.id('today_calories')).getText()).trim()
        assert.strictEqual(todayCal.includes('Cal'), true, `Status: Failed\nExpected: The calorie value is not valid. Expected: Have text 'Cal' in title as a unit\nResult: ${todayCal}`)
        let splitCal = todayCal.split(' / ')
        let current = parseInt(splitCal[0])
        let target = parseInt(splitCal[1])
        assert.equal(current >= 0, true, `Status: Failed\nExpected: The calorie value is not valid. Expected: Current calorie must more than or equal to 0 Cal\nResult: ${current} Cal`)
        assert.equal(target > 0, true, `Status: Failed\nExpected: The calorie value is not valid. Expected: Target calorie must more than 0 Cal\nResult: ${current} Cal`)

        await driver.executeScript('alert("TC-S003 See today calories Test Success")')
        await driver.wait(until.alertIsPresent())
        await driver.switchTo().alert()

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-S003',
            tc_name: 'See today calories',
            tc_desc: 'Validate Test Steps for See today calories',
            tc_data: {
                email: email,
                password: password,
            },
            tc_evidence_name: [
                `TC-S003-Step 1-Test Data on ${date}.png`,
                `TC-S003-Step 2-Test Data on ${date}.png`,
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

tc_s003_see_today_calories()
