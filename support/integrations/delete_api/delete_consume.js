// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Consume', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Delete Consume List', () => {
        const id = 'f0d5de00-c0e3-07f6-0b0c-27492e113d4e'
        cy.request({
            method: method,
            url: `/api/v1/list/delete/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteConsumeList')
        cy.get('@' + method + 'DeleteConsumeList').then(dt => {
            cy.templateDelete(dt)
        })
    })

    it(method.toUpperCase() + ' - Delete Consume List Relation', () => {
        const id = 'dbc84a79-fc38-77e8-1ff2-ac78847c6c58'
        cy.request({
            method: method,
            url: `/api/v1/list/deleteRel/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).as(method + 'DeleteConsumeListRelation')
        cy.get('@' + method + 'DeleteConsumeListRelation').then(dt => {
            cy.templateDelete(dt)
        })
    })
})