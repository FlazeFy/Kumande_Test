// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Tag', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Delete Tag', () => {
        const id = 'efb17420-639d-8616-3b03-b50ffdcecc7e'
        cy.request({
            method: method,
            url: `/api/v1/tag/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteTag')
        cy.get('@' + method + 'DeleteTag').then(dt => {
            cy.templateDelete(dt)
        })
    })
})