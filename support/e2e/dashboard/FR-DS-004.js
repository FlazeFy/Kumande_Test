import { generateMonthName } from '../../components/generate'

describe('Dashboard Module', () => {
    it('TC-DS-004-01 - User can see today calories (Positive)', () => {
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

        // Step 4 : In the dashboard page. User search for section "Today Calories"
        cy.url().should('include', '/dashboard')
        cy.get('#content-body').contains(`Today Calories`).should('exist')

        // Expected Result : System will show total calorie today and achieved
        cy.get('#today-calorie-holder').contains('Cal')
        cy.get('#today_calories') 
            .invoke('text')      
            .then((calText) => {
                const calTextClean = calText.replace(' Cal')
                const splitCal = calTextClean.split(' / ')
                const achieved = parseInt(splitCal[0])
                const target = parseInt(splitCal[1])

                expect(target).to.be.gte(achieved)
                expect(achieved).to.be.at.least(0)
                expect(target).to.be.greaterThan(0)
        });

        // Audit
        cy.wait(3000).screenshot('TC-DS-004-01 - Expected Result')
    })
})
  