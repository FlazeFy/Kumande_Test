// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats', () => {
    const method = 'put'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Update Allergic', () => {
        const id = '93926fef-e8a2-ec92-1816-ec5995ab6f50'
        const body = {
            "allergic_context" : "Cheese",
            "allergic_desc" : null
        }
        cy.request({
            method: method,
            url: `/api/v1/analytic/allergic/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdateAllergic')
        cy.get('@' + method + 'UpdateAllergic').then(dt => {
            cy.templatePut(dt,null)
        })
    })
})