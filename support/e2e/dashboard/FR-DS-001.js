import { generateMonthName } from '../../components/generate'

describe('Dashboard Module', () => {
    it('TC-DS-001-02 - User can see today consume schedule summary with empty attached consume (Negative)', () => {
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

        // Step 4 : In the dashboard page. User search for section "Today's Schedule"
        cy.url().should('include', '/dashboard')
        cy.get('#content-body').contains(`Today's Schedule`).should('exist')

        // Expected Result : System will show message "No Schedule for today" for all section in breakfast, lunch, and dinner section
        cy.get('#time-daily-schedule-holder').should('exist').children() 
            .each(($el) => {
                cy.wrap($el).find('a').should('exist').contains('- No Schedule for today -')
            })

        // Audit
        cy.wait(3000).screenshot('TC-DS-001-02 - Expected Result')
    })
})
  