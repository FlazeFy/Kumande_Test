// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Delete Count Calorie', () => {
        const id = '146a46cb-63de-9cd3-260b-e5108dfd808e'
        cy.request({
            method: method,
            url: `/api/v1/count/calorie/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteCountCalorie')
        cy.get('@' + method + 'DeleteCountCalorie').then(dt => {
            cy.templateDelete(dt)
        })
    })

    it(method.toUpperCase() + ' - Delete Allergic', () => {
        const id = '1861e836-4b21-11ef-9023-3216422910e7'
        cy.request({
            method: method,
            url: `/api/v1/analytic/allergic/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteAllergic')
        cy.get('@' + method + 'DeleteAllergic').then(dt => {
            cy.templateDelete(dt)
        })
    })
})