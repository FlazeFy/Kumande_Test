describe('Auth Module', () => {
    it('TC-AU-001-01 - User can login with registered account and valid email and password (Positive)', () => {
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

        // Expected Result : The system redirect user to dashboard page
        cy.url().should('include', '/dashboard') 

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-01 - Expected Result')
    })

    it('TC-AU-001-02 - User can not login with wrong email and password (Negative)', () => {
        // Test Data
        const email = "flazen.edus@gmail.com"
        const password = "nopass321"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `Email doesn't exist`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`Email doesn't exist`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-02 - Expected Result')
    })

    it('TC-AU-001-03 - User can not login with correct email but have wrong password (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass1234"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `Wrong password`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`Wrong password`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-03 - Expected Result')
    })

    it('TC-AU-001-04 - User can not login with invalid email format (Negative)', () => {
        // Test Data
        const email = "flazen.edu@yahoo.com"
        const password = "nopass1234"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `email must be gmail`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`email must be gmail`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-04 - Expected Result')
    })

    it('TC-AU-001-05 - User can not login with invalid minimum email character length (Negative)', () => {
        // Test Data
        const email = "@gmail.com"
        const password = "nopass123"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message 'The email must be a valid email address'
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = ['The email must be a valid email address']
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-05 - Expected Result')
    })

    it('TC-AU-001-06 - User can not login with invalid minimum password character length (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopas"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `The password must be at least 6 characters`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`The password must be at least 6 characters`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-06 - Expected Result')
    })

    it('TC-AU-001-07 - User can not login with invalid maximum email character length (Negative)', () => {
        // Test Data
        const email = "thisisaverylongemailaddressforsamplepurposesanditshouldexceedthecharacterlimitofeighty@gmail.com"
        const password = "nopass123"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `The email must not be greater than 75 characters`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`The email must not be greater than 75 characters`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-07 - Expected Result')
    })

    it('TC-AU-001-08 - User can not login with invalid maximum password character length (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "ThisIsAVeryLongPasswordThatContainsOnlyNumbersAndAlphabets12345678901234567890"

        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User fill the email and password field
        cy.get('#email-input').should('exist').type(email)
        cy.get('#pass-input').should('exist').type(password)

        // Step 3 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message `The password must not be greater than 50 characters`
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = [`The password must not be greater than 50 characters`]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-08 - Expected Result')
    })

    it('TC-AU-001-09 - User can not login with empty field (Negative)', () => {
        // Pre-Condition : User have registered account
        // Step 1 : User visit the page /login
        cy.visit('http://localhost:3001/login')

        // Step 2 : User click "Sign In" button
        cy.get('#submit-btn').should('exist').click()

        // Expected Result : System will stay in login page and show alert message "email field is required" and "password field is required"
        cy.url().should('include', '/login') 
        cy.get('#login-failed-msg').should('exist')
        const textContainInFailedMsg = ["email field is required","password field is required"]
        textContainInFailedMsg.forEach(dt => {
            cy.get('#login-failed-msg').contains(dt)
        })

        // Audit
        cy.wait(3000).screenshot('TC-AU-001-09 - Expected Result')
    })
})
  