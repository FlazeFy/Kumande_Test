// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Budget', () => {
    const method = 'post'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Post Budget', () => {
        const body = {
            "firebase_id" : "testing",
            "budget_total": 400000,
            "month": "Aug",
            "year": 2024
        }
        cy.request({
            method: method,
            url: '/api/v1/budget/create',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'PostBudget')
        cy.get('@' + method + 'PostBudget').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.data).to.have.property('budget_total')
            expect(dt.body.data).to.have.property('budget_month_year')
            expect(dt.body.data.budget_month_year).to.have.property('month')
            expect(dt.body.data.budget_month_year).to.have.property('year')
            expect(typeof dt.body.data.budget_total).to.eq('number')
            expect(typeof dt.body.data.budget_month_year).to.eq('object')
            expect(typeof dt.body.data.budget_month_year.year).to.eq('number')
            expect(typeof dt.body.data.budget_month_year.month).to.eq('string')
        })
    })
})