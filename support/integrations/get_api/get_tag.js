// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Tag', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - All Tag', () => {
        cy.request({
            method: method,
            url: '/api/v1/tag',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllTag')
        cy.get('@' + method + 'AllTag').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['tag_slug','tag_name']
            const stringNullableFields = ['created_by']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
        })
    })
})