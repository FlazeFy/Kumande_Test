// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const yr = 2023
    const mon = 4

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

    it(method.toUpperCase() + ' - Total Spend Month', () => {
        cy.request({
            method: method,
            url: '/api/v1/payment/total/month/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalSpendMonth')
        cy.get('@' + method + 'TotalSpendMonth').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Spend Day', () => {
        cy.request({
            method: method,
            url: '/api/v1/payment/total/month/'+mon+'/year/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalSpendDay')
        cy.get('@' + method + 'TotalSpendDay').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Analytic Spend By Month', () => {
        cy.request({
            method: method,
            url: '/api/v1/analytic/payment/month/'+mon+'/year/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AnalyticSpendByMonth')
        cy.get('@' + method + 'AnalyticSpendByMonth').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Count Calorie', () => {
        cy.request({
            method: method,
            url: '/api/v1/count/calorie',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CountCalorie')
        cy.get('@' + method + 'CountCalorie').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Lifetime Payment', () => {
        cy.request({
            method: method,
            url: '/api/v1/count/payment',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalLifetimePayment')
        cy.get('@' + method + 'TotalLifetimePayment').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })
})