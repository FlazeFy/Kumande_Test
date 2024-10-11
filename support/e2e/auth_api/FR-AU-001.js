// Components
import '../../components/template'

describe('Auth Module', () => {
    it('TC-AU-001-01 - User can login with registered account and valid email and password (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
        }).then(res => {
            expect(res.status).to.equal(200)
            const token = res.body.token
            cy.wrap(token).as('TC-AU-001-01')
        })

        // Expected Result : The system redirect user to dashboard page. Test using an API that found in dashboard page
        cy.get('@TC-AU-001-01').then(token => {
            cy.request({
                method: 'GET',
                url: '/api/v1/count/calorie/fulfill/2024-08-08',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                cy.templateGet(res, false)
            })
        })
    })

    it('TC-AU-001-02 - User can not login with wrong email and password (Negative)', () => {
        // Test Data
        const email = "flazen.edus@gmail.com"
        const password = "nopass321"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(401)
            
            // Expected Result : System will stay in login page and show alert message `Email doesn't exist`
            expect(res.body.message).to.contain("Email doesn't exist")
        })        
    })

    it('TC-AU-001-03 - User can not login with correct email but have wrong password (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass1234"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(401)
            
            // Expected Result : System will stay in login page and show alert message `Wrong password`
            expect(res.body.message).to.contain("Wrong password")
        })         
    })

    it('TC-AU-001-04 - User can not login with invalid email format (Negative)', () => {
        // Test Data
        const email = "flazen.edu@yahoo.com"
        const password = "nopass1234"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message `email must be gmail`
            expect(res.body.message).to.contain("email must be gmail")
        })
    })

    it('TC-AU-001-05 - User can not login with invalid minimum email character length (Negative)', () => {
        // Test Data
        const email = "@gmail.com"
        const password = "nopass123"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message `The email must be a valid email address`
            expect(res.body.message.email[0]).to.contain("The email must be a valid email address")
        })
    })

    it('TC-AU-001-06 - User can not login with invalid minimum password character length (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopas"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message `The password must be at least 6 characters`
            expect(res.body.message.password[0]).to.contain("The password must be at least 6 characters")
        })
    })

    it('TC-AU-001-07 - User can not login with invalid maximum email character length (Negative)', () => {
        // Test Data
        const email = "thisisaverylongemailaddressforsamplepurposesanditshouldexceedthecharacterlimitofeighty@gmail.com"
        const password = "nopass123"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message `The email must not be greater than 75 characters`
            expect(res.body.message.email[0]).to.contain("The email must not be greater than 75 characters")
        })
    })

    it('TC-AU-001-08 - User can not login with invalid maximum password character length (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "ThisIsAVeryLongPasswordThatContainsOnlyNumbersAndAlphabets12345678901234567890"

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message `The password must not be greater than 50 characters`
            expect(res.body.message.password[0]).to.contain("The password must not be greater than 50 characters")
        })
    })

    it('TC-AU-001-09 - User can not login with empty field (Negative)', () => {
        // Test Data
        const email = null
        const password = null

        // Login API : Sign in into the Apps
        cy.request({
            method: 'POST', 
            url: 'api/v1/login',
            body: {
                "email": email,
                "password": password,
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.equal(422)
            
            // Expected Result : System will stay in login page and show alert message "email field is required" and "password field is required"
            expect(res.body.message.password[0]).to.contain("password field is required")
            expect(res.body.message.email[0]).to.contain("email field is required")
        })
    })
})
  