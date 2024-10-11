import '../../components/template'

describe('Dashboard Module', () => {
    it('TC-DS-001-01 - User can see today consume schedule summary with attached consume (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"
        const day = 'Fri'

        // Pre-Condition : User has signed in
        cy.templateE2ELogin(email, password).then(token => {
            cy.request({
                method: 'GET',
                url: `/api/v1/schedule/day/${day}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                cy.templateGet(200, res, false)
                const dataArr = res.body.data
                expect(dataArr).to.be.an('array')

                // Get list key / column
                const stringFields = ['consume_type','schedule_consume']
                const arrayFields = ['schedule_time']

                // Validate column
                // Expected Result : System will show list of consume in section breakfast, lunch, or dinner
                cy.templateValidateColumn(dataArr, stringFields, 'string', false)
                cy.templateValidateColumn(dataArr, arrayFields, 'array', false)
            })
        })    
    })

    it('TC-DS-001-02 - User can see today consume schedule summary with empty attached consume (Negative)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"
        const day = 'Sat'

        // Pre-Condition : User has signed in
        cy.templateE2ELogin(email, password).then(token => {
            cy.request({
                method: 'GET',
                url: `/api/v1/schedule/day/${day}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then(res => {
                cy.templateGet(404, res, false)

                // Expected Result : System will show message "No Schedule for today" for all section in breakfast, lunch, and dinner section
                expect(res.body.message).to.equal('No Schedule for today')
            })
        })    
    })
})
  