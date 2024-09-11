// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Budget', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Delete Budget', () => {
        const id = '989db6ac-42fd-4d5f-990c-bf98fe033412'
        cy.request({
            method: method,
            url: `/api/v1/budget/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteBudget')
        cy.get('@' + method + 'DeleteBudget').then(dt => {
            cy.templateDelete(dt)
        })
    })
})