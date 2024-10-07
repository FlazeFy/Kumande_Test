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
  