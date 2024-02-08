// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Schedule', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - All Today Schedule', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/byfrom',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllTodaySchedule')
        cy.get('@' + method + 'AllTodaySchedule').then(sch => {
            cy.templateGet(sch, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - My Schedule', () => {
        cy.request({
            method: method,
            url: '/api/v1/schedule',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MySchedule')
        cy.get('@' + method + 'MySchedule').then(sch => {
            cy.templateGet(sch, is_paginate)
        })
    })
})