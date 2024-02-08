// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Consume', () => {
    const is_paginate = true
    const limit = 10
    const ord = 'desc'
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - All Consume List', () => {
        cy.request({
            method: method,
            url: '/api/v1/list/limit/'+limit+'/order/'+ord,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllConsumeList')
        cy.get('@' + method + 'AllConsumeList').then(csm => {
            cy.templateGet(csm, is_paginate)
        })
    })
})