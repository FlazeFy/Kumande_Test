// Test Case ID : TC-001
// Related FR : FR-001
// Modules : Auth, Consume

// Components
import '../../components/template'

describe('Kumande Cases - TC001', () => {
    // Template
    const methodCaseOne = 'post'
    const methodCaseTwo = 'get'
    const is_paginate = false

    it(methodCaseOne.toUpperCase() + ' - Login', () => {
        // Post login
        const builder = {
            "email": 'flazen.edu@gmail.com',
            "password": 'nopass123',
        }

        cy.request({
            method: methodCaseOne, 
            url: 'api/v1/login',
            body: builder,
        }).then(auth => {
            expect(auth.status).to.equal(200)
            const token = auth.body.token
            cy.wrap(token).as('token_TC001')
        })

        // View dashboard for test auth
        cy.get('@token_TC001').then(token => {
            cy.request({
                method: methodCaseTwo,
                url: '/api/v1/consume/total/byfrom',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(csm => {
                cy.templateGet(csm, is_paginate)
            })
        })
    })
})
