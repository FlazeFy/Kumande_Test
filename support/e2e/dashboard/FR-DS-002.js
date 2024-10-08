import { generateMonthName } from '../../components/generate'

describe('Dashboard Module', () => {
    it('TC-DS-002-01 - User can see payment analytic monthly (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')
        
        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Step 4 : In the dashboard page. User search for section "Payment's Analytic (Monthly)"
        cy.url().should('include', '/dashboard')
        cy.get('#content-body').contains(`Payment's Analytic (Monthly)`).should('exist')

        // Expected Result : System will show section for total, average, max, and min with its currency in rupiah
        const analyticMonthlySection = ['Total','Average','Max','Min']
        analyticMonthlySection.forEach(dt => {
            cy.get('#category-analytic-holder').contains(dt)
        })
        cy.get('#category-analytic-holder').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('h2').should('exist').contains('Rp. ')
            })

        // Audit
        cy.wait(3000).screenshot('TC-DS-002-01 - Expected Result')
    })
})
  