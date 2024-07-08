// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Reminder', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - My Reminder', () => {
        cy.request({
            method: method,
            url: '/api/v1/reminder',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MyReminder')
        cy.get('@' + method + 'MyReminder').then(dt => {
            cy.templateGet(dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['reminder_id','reminder_name','reminder_type','reminder_body']
            const stringNullableFields = ['id_rel_reminder']
            const arrayNullableFields = ['reminder_context','reminder_attachment']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, arrayNullableFields, 'array', true)
        })
    })
})