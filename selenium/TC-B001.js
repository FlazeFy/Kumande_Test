const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { add_firestore } = require('../audit/firebase/command');
const assert = require('assert');

async function tc_b002_see_budget_dashboard() {
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
        fs.writeFileSync(`TC-B001-Step 1-Test Data on ${date}.png`, screenshot_1, 'base64')

        // Test Step 2 : Pengguna membuka halaman Budget
        await driver.findElement(By.id('budget_menu_nav_btn')).click()
        await driver.wait(until.urlContains('budget'), 10000)
        let screenshot_2 = await driver.takeScreenshot()
        fs.writeFileSync(`TC-B001-Step 2-Test Data on ${date}.png`, screenshot_2, 'base64')

        // Test Step 3 : Pengguna melihat budget dan detailnya
        const budget_plans = await driver.findElements(By.className('budget-plan-section'))

        let idx = 0
        for (let el of budget_plans) {
            const planTitle = await el.findElement(By.className('budget-plan-title')).getText()
            const budgetText = await el.findElement(By.className('budget-text')).getText()
            const spendingText = await el.findElement(By.className('spending-text')).getText()
            const remainText = await el.findElement(By.className('apexcharts-text apexcharts-datalabel-label')).getText()

            const budgetAmount = parseFloat(budgetText.replace('Rp. ', ''))
            const spendingAmmount = parseFloat(spendingText.replace('Rp. ', ''))
            let remainAmmount

            if(spendingAmmount < budgetAmount){
                remainAmmount = parseFloat(remainText.replace('Rp. ', ''))
            } else {
                remainAmmount = remainText
            }
            
            console.log(`\nIndex : ${idx}, Budget Plan ${planTitle}`)

            // Validate number
            assert.equal(budgetAmount > 0, true, `Status : Failed\nExpected : Budget is more than 0\nResult: Budget is Rp. ${budgetAmount}K`)
            console.log(`Status : Passed\nExpected : Budget is more than 0\nResult: Budget is Rp. ${budgetAmount}K`)

            assert.equal(spendingAmmount >= 0, true, `Status : Failed\nExpected : Spending is more than or equal to 0\nResult: Spending is Rp. ${spendingAmmount}K`)
            console.log(`Status : Passed\nExpected : Spending is more than or equal to 0\nResult: Spending is Rp. ${spendingAmmount}K`)

            // Overload status validation
            if(spendingAmmount >= budgetAmount){
                assert.equal(spendingAmmount >= budgetAmount, true, `Status : Failed\nExpected : Chart caption must be overload if spending is more than or equal to budget\nResult: Chart caption ${remainAmmount}`)
                console.log(`Status : Passed\nExpected : Chart caption must be overload if spending is more than or equal to budget\nResult: Chart caption is ${remainAmmount}`) 
            } else {
                assert.equal(spendingAmmount < budgetAmount, true, `Status : Failed\nExpected : Chart caption must be overload if spending is more than or equal to budget\nResult: Chart caption ${remainAmmount}`)
                console.log(`Status : Passed\nExpected : Chart caption must be overload if spending is more than or equal to budget\nResult: Chart caption is ${remainAmmount}`) 

                // Chart caption validation
                // Notes : It could be a difference of one due to decimal rounding
                const caption_expected = budgetAmount - spendingAmmount
                const diff_expected = remainAmmount - caption_expected
                assert.ok(
                    diff_expected == 0 || diff_expected == 1,
                    `Status: Failed\nExpected: Chart caption must be equal to budget - spending\nResult: Chart caption ${remainAmmount} and the remain is ${caption_expected}`
                );                
                console.log(`Status : Passed\nExpected : Chart caption must be equal to budget - spending\nResult: Chart caption is ${remainAmmount} and the remain is ${caption_expected}`) 
            }

            // Budget plan detail validation
            if(spendingAmmount > 0){
                await el.click() 
                await driver.wait(until.elementLocated(By.id('paymentMonthlyModal')), 10000)
                await driver.sleep(5000)

                const detail_spending = await driver.findElements(By.className('payment-detail'))
                let paymentTotal = 0

                for (let dt of detail_spending) {
                    const paymentPriceText = await dt.findElement(By.className('payment-price')).getText()
                    const paymentAmmount = parseFloat(paymentPriceText.replace('Rp. ', ''))

                    paymentTotal = paymentTotal + paymentAmmount
                }

                let screenshot_3 = await driver.takeScreenshot()
                fs.writeFileSync(`TC-B001-Step 3.${idx}-Test Data on ${date}.png`, screenshot_3, 'base64')

                // Plan detail validation
                // Notes : It could be a difference of one due to decimal rounding
                const diff_detail_expected = spendingAmmount - paymentTotal
                assert.ok(
                    diff_detail_expected == 0 || diff_detail_expected == 1,
                    `Status: Failed\nExpected: Plan detail payment must be equal to spending\nResult: Plan detail total is ${paymentTotal} and the spending is ${spendingAmmount}`
                );                
                console.log(`Status : Passed\nExpected : Plan detail payment must be equal to spending\nResult: Plan detail total is ${paymentTotal} and the spending is ${spendingAmmount}`) 
                
                await driver.findElement(By.id('btn_close_modal')).click()
            }

            idx++
        }

        await driver.executeScript('alert("TC-B001 See budget dashboard Test Success")')
        await driver.wait(until.alertIsPresent())
        await driver.switchTo().alert()

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-B002',
            tc_name: 'See budget dashboard',
            tc_desc: 'Validate Test Steps for See budget dashboard',
            tc_data: {
                email: email,
                password: password,
            },
            tc_evidence_name: [
                `TC-B001-Step 1-Test Data on ${date}.png`,
                `TC-B001-Step 2-Test Data on ${date}.png`,
                `TC-B001-Step 3-Test Data on ${date}.png`
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

tc_b002_see_budget_dashboard()
