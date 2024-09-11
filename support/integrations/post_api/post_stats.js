// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats', () => {
    const method = 'post'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Post Count Calorie', () => {
        const body = {
            "firebase_id" : "testing",
            "weight" : 65,
            "height" : 185,
            "result" : 1800
        }
        cy.request({
            method: method,
            url: '/api/v1/count/calorie',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'PostCountCalorie')
        cy.get('@' + method + 'PostCountCalorie').then(dt => {
            cy.templatePost(dt,body)
        })
    })

    it(method.toUpperCase() + ' - Post Allergic', () => {
        const body = {
            "allergic_context" : "allergic type A",
            "allergic_desc" : "lorem ipsum",
        }
        cy.request({
            method: method,
            url: '/api/v1/analytic/allergic',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'PostAllergic')
        cy.get('@' + method + 'PostAllergic').then(dt => {
            cy.templatePost(dt,body)
        })
    })
})