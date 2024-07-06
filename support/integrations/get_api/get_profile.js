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
        cy.get('@' + method + 'MyProfile').then(dt => {
            cy.templateGet(dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['fullname','password','email','gender','born_at','created_at']
            const stringNullableFields = ['updated_at']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
        })
    })

    it(method.toUpperCase() + ' - My Body Info', () => {
        cy.request({
            method: method,
            url: '/api/v1/user/body_info',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MyBodyInfo')
        cy.get('@' + method + 'MyBodyInfo').then(dt => {
            cy.templateGet(dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('object')

            // Get list key / column
            const stringFields = ['gender','born_at']
            const stringNullableFields = ['blood_pressure','created_at','calorie_updated']
            const integerFields = ['age']
            const integerNullableFields = ['blood_glucose','gout','bmi','cholesterol','weight','height','result']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, integerFields, 'number', false)
            cy.templateValidateColumn(dataArr, integerNullableFields, 'number', true)
        })
    })
})