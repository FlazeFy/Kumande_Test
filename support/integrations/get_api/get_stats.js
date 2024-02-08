// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Total Consume By From', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/byfrom',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByFrom')
        cy.get('@' + method + 'TotalConsumeByFrom').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Type', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/bytype',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByType')
        cy.get('@' + method + 'TotalConsumeByType').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Main Ingredient', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/bymain',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByMain')
        cy.get('@' + method + 'TotalConsumeByMain').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Provide', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/byprovide',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByProvide')
        cy.get('@' + method + 'TotalConsumeByProvide').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })
})