import '../../components/template'

describe('Dashboard Module', () => {
    it('TC-DS-004-01 - User can see today calories (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"
        const date = '2024-10-12'

        // Pre-Condition : User has signed in
        cy.templateE2ELogin(email, password).then(token => {
            cy.request({
                method: 'GET',
                url: `/api/v1/count/calorie/fulfill/${date}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                cy.templateGet(200, res, null)
                const dataObj = res.body.data
                expect(dataObj).to.be.an('object')

                // Get list key / column
                const intFields = ['target','total']

                // Validate column
                // Expected Result : System will show total calorie today and achieved
                cy.templateValidateColumn(dataObj, intFields, 'number', false)
            })
        })    
    })
})
  