import '../../components/template'

describe('Consume Module', () => {
    it('TC-CS-003-01 - User can sorting consume history by its date consumed (Positive)', () => {
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

        // Step 4 : In the navbar, user click the History menu
        cy.url().should('include', '/dashboard')
        cy.get('#history_menu_nav_btn').should('exist').click()

        // Step 5 : In the history page. User search for section "All Consume"
        cy.url().should('include', '/history')
        cy.get('#content-body').contains(`All Consume`).should('exist')

        // Expected Result : System will show consume with its name, notes, detail, type, valid price, and date created
        cy.templateE2EValidateConsumeBox()

        // Step 6 : User find "Order By Date" dropdown and choose ascending
        cy.get('#order-consume-history').should('have.value', 'desc').select('Ascending')

        // Expected Result : System will show consume with its name, notes, detail, type, valid price, and date created
        cy.templateE2EValidateConsumeBox()

        // Step 7 : Lastly the user must choose descending
        cy.get('#order-consume-history').should('have.value', 'asc').select('Descending')

        // Audit
        cy.wait(3000).screenshot('TC-CS-003-01 - Expected Result')
    })
})
  