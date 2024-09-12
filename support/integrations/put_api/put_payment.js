// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Payment', () => {
    const method = 'put'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Update Payment', () => {
        const id = '0f03a2c0-3c1d-c573-1dc3-4e176b913b7a'
        const body = {
            "payment_method" : "Ovo",
            "payment_price" : 15000
        }
        cy.request({
            method: method,
            url: `/api/v1/payment/update/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdatePayment')
        cy.get('@' + method + 'UpdatePayment').then(dt => {
            cy.templatePut(dt,null)
        })
    })
})