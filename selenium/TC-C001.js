const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { add_firestore } = require('../audit/firebase/command');
const assert = require('assert');

async function tc_C001_see_my_schedule() {
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
        fs.writeFileSync(`TC-C001-Step 1-Test Data on ${date}.png`, screenshot_1, 'base64')

        // Test Step 2 : Pengguna membuka halaman Schedule
        await driver.findElement(By.id('schedule_menu_nav_btn')).click()
        await driver.wait(until.urlContains('schedule'), 10000)
        let screenshot_2 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-C001-Step 2-Test Data on ${date}.png`, screenshot_2, 'base64')

        // Test Step 3 : Pengguna mencari section my schedule
        await driver.executeScript(`
            var element = document.getElementById('table_my_schedule')
            while(!element) {
                window.scrollBy(0, 100)
                element = document.getElementById('table_my_schedule')
            }
        `);
        let tableElement = await driver.findElement(By.id('table_my_schedule'))
        await driver.wait(until.elementIsVisible(tableElement), 10000)

        let rows = await driver.findElements(By.css('#table_my_schedule tbody tr'))
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        for (let dt of rows) {
            let firstTd = await dt.findElement(By.css('td:first-child'))
            let dayText = await firstTd.getText()

            assert.equal(daysOfWeek.includes(dayText), true, `Status: Failed\nExpected: First column must be a valid day name\nResult: ${dayText}`)
        }

        let screenshot_3 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-C001-Step 3-Test Data on ${date}.png`, screenshot_3, 'base64')

        await driver.executeScript('alert("TC-C001 See my schedule Test Success")')
        await driver.wait(until.alertIsPresent())
        await driver.switchTo().alert()

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-C001',
            tc_name: 'See my schedule',
            tc_desc: 'Validate Test Steps for See my schedule',
            tc_data: {
                email: email,
                password: password,
            },
            tc_evidence_name: [
                `TC-C001-Step 1-Test Data on ${date}.png`,
                `TC-C001-Step 2-Test Data on ${date}.png`,
                `TC-C001-Step 3-Test Data on ${date}.png`,
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

tc_C001_see_my_schedule()
