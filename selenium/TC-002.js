const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { add_firestore } = require('../audit/firebase/command');

async function tc_002_signout() {
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
        fs.writeFileSync(`TC-002-Step 1-Test Data on ${date}.png`, screenshot_1, 'base64')

        // Test Step 2 : Pengguna menekan tombol Sign Out
        await driver.executeScript(`
            var element = document.getElementById('sign-out-btn')
            while(!element) {
                window.scrollBy(0, 100)
                element = document.getElementById('sign-out-btn')
            }
        `);
        let signOutBtn = await driver.findElement(By.id('sign-out-btn'))
        await driver.wait(until.elementIsVisible(signOutBtn), 10000)
        await driver.wait(until.elementIsEnabled(signOutBtn), 10000)
        let attempts = 0;
        while (attempts < 3) {
            try {
                await signOutBtn.click();
                break;
            } catch (error) {
                if (error.name === 'ElementClickInterceptedError') {
                    await driver.sleep(1000)
                    attempts++
                } else {
                    throw error
                }
            }
        }
        await driver.wait(until.elementLocated(By.id('signoutModal')), 10000)
        let screenshot_2 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-002-Step 2-Test Data on ${date}.png`, screenshot_2, 'base64')

        // Test Step 3 : Pada pop up validasi, pengguna menekan tombol Yes, Sign Out
        await driver.findElement(By.id('sign-out-confirm-btn')).click()
        await driver.wait(until.elementLocated(By.id('email-input')), 10000)
        let screenshot_3 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-002-Step 3-Test Data on ${date}.png`, screenshot_3, 'base64')

        await driver.executeScript('alert("TC-002 SignOut Test Success")')
        await driver.wait(until.alertIsPresent())
        await driver.switchTo().alert()

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-002',
            tc_name: 'Sign Out',
            tc_desc: 'Validate Test Steps for sign out',
            tc_data: {
                email: email,
                password: password,
            },
            tc_evidence_name: [
                `TC-002-Step 1-Test Data on ${date}.png`,
                `TC-002-Step 2-Test Data on ${date}.png`,
                `TC-002-Step 3-Test Data on ${date}.png`
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

tc_002_signout()
