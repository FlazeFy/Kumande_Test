// Components
import { generateAuthToken, generateMonthName } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Budget', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Dashboard Budget', () => {
        cy.request({
            method: 'POST',
            url: '/api/v1/budget/dashboard',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'DashboardBudget')
        cy.get('@' + method + 'DashboardBudget').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            expect(resultItem).to.have.property('total_all')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['month','year']
            const intFields = ['budget_total']
            const objectFields = ['payment_history']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
            cy.templateValidateColumn(dataArr, objectFields, 'object', false)

            // Validate math operation
            let total_all_expect = 0
            dataArr.forEach((el,idx) => {
                const total_price_res = el.payment_history.total_price
                const total_item_res = el.payment_history.total_item
                const average_payment_res = el.payment_history.average_payment
                const remain_budget_res = el.remain_budget
                const budget_total_res = el.budget_total

                if(total_price_res > 0 && total_item_res > 0){
                    // Average must equal to total price / total item
                    const average_expect = parseInt((total_price_res / total_item_res).toFixed(0))
                    expect(average_expect, `Average must equal to total price / total item. Index Data : ${idx}`).to.equal(average_payment_res)
                }

                total_all_expect = parseInt(total_all_expect.toFixed(0)) + total_price_res

                // Remain budget must be equal to budget total - total price
                const remain_budget_expect =  budget_total_res - total_price_res
                expect(remain_budget_expect,`Remain budget must be equal to budget total - total price. Index Data : ${idx}`).to.equal(remain_budget_res)

                // Ordering validation
                cy.templateOrdering(dataArr,'year','descending','number')
            });

            // Contain validation
            const monthNameShort = generateMonthName('all','short')
            cy.templateValidateContain(dataArr,monthNameShort,'month')

            // Total All must equal to sum Total Price all budget
            expect(resultItem.total_all, 'Total All must equal to sum Total Price all budget').to.equal(total_all_expect)
        })
    })
})