import { generateMonthName } from '../../components/generate'
import '../../components/template'

describe('Dashboard Module', () => {
    it('TC-DS-003-01 - User can see current month budget plan with its detail (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"
        const d = new Date()
        let month = d.getMonth()
        const currentMonth = generateMonthName(month,'short')

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')
        
        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Step 4 : In the dashboard page. User search for section "Budget in..."
        cy.url().should('include', '/dashboard')
        cy.get('#content-body').contains(`Budget in`).should('exist')

        // Expected Result : System will show budget, spending, month name, year, and payment status
        const analyticMonthlySection = ['Spending','Budget']
        analyticMonthlySection.push(currentMonth,d.getFullYear())
        analyticMonthlySection.forEach(dt => {
            cy.get('.budget-plan-section').contains(dt)
        })
        cy.get('.budget-plan-section').contains('Rp. ')
        cy.get('.budget-text') 
            .invoke('text')      
            .then((budgetText) => {
            cy.get('.spending-text') 
                .invoke('text')      
                .then((spendingText) => {
                    const budget = parseInt(budgetText.replace('Rp. ','').replace('K',''))
                    const spending = parseInt(spendingText.replace('Rp. ','').replace('K',''))

                    expect(budget).to.be.greaterThan(0)
                    expect(spending).to.be.at.least(0)

                    if(spending === 0){
                        cy.get('.budget-plan-section').contains('- No Payment Found -')
                    } else {
                        cy.get('.budget-plan-section').should('not.contain', '- No Payment Found -')
                    }
            });
        });

        // Audit
        cy.wait(3000).screenshot('TC-DS-003-01 - Expected Result')
    })

})
  