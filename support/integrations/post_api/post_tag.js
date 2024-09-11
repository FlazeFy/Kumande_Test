// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Tag', () => {
    const method = 'post'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Post Tag', () => {
        const body = {
            "tag_name": "testing-tag"
        }
        cy.request({
            method: method,
            url: '/api/v1/tag/add',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'PostTag')
        cy.get('@' + method + 'PostTag').then(dt => {
            cy.templatePost(dt,body)
        })
    })
})