// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Consume', () => {
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
        cy.get('@' + method + 'AllConsumeList').then(dt => {
            cy.templateGet(200,dt, true)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','slug_name','list_name','created_at']
            const stringNullableFields = ['list_desc']
            const arrayNullableFields = ['consume','list_tag']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)      
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)  
            cy.templateValidateColumn(dataArr, arrayNullableFields, 'array', true)                   
        })
    })

    it(method.toUpperCase() + ' - All List Consume', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/list/select',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllListConsume')
        cy.get('@' + method + 'AllListConsume').then(dt => {
            cy.templateGet(200,dt, false)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['slug_name','consume_name','consume_type']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)         
        })
    })

    it(method.toUpperCase() + ' - All Consume', () => {
        const page_limit = 15
        const order = 'DESC'
        const favorite = 'all'
        const type = 'all'
        const provide = 'all'
        const calorie = 'all'

        cy.request({
            method: method,
            url: `/api/v1/consume/limit/${page_limit}/order/${order}/favorite/${favorite}/type/${type}/provide/${provide}/calorie/${calorie}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AllConsume')
        cy.get('@' + method + 'AllConsume').then(dt => {
            cy.templateGet(200,dt, true)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','slug_name','consume_from','consume_name','consume_type','created_at']
            const arrayFields = ['consume_detail','consume_tag']
            const stringNullableFields = ['consume_comment','payment_method']
            const integerFields = ['is_favorite','is_payment','payment_price']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, arrayFields, 'array', false)
            cy.templateValidateColumn(dataArr, integerFields, 'number', false)
        })
    })
})