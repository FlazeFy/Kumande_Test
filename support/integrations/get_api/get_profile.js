// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Profile', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - My Profile', () => {
        cy.request({
            method: method,
            url: '/api/v1/user',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MyProfile')
        cy.get('@' + method + 'MyProfile').then(sch => {
            cy.templateGet(sch, is_paginate)
        })
    })
})