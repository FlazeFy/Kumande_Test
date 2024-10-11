import '../../components/template'

describe('Dashboard Module', () => {
    it('TC-DS-002-01 - User can see payment analytic monthly (Positive)', () => {
        // Test Data
        const email = "flazen.edu@gmail.com"
        const password = "nopass123"
        const year = '2024'
        const month = '10'

        // Pre-Condition : User has signed in
        cy.templateE2ELogin(email, password).then(token => {
            cy.request({
                method: 'GET',
                url: `/api/v1/analytic/payment/month/${month}/year/${year}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                cy.templateGet(200, res, null)
                const dataObj = res.body.data
                expect(dataObj).to.be.an('object')

                // Get list key / column
                const intFields = ['average','max','min','total']

                // Validate column
                // Expected Result : System will show section for total, average, max, and min with its currency in rupiah
                cy.templateValidateColumn(dataObj, intFields, 'number', false)
            })
        })    
    })
})
  