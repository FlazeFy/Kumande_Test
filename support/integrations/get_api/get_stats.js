// Components
import { generateAuthToken, generateDayName, generateRandDate } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Stats & Calendar', () => {
    const is_paginate = false
    const method = 'get'
    const token = generateAuthToken("hardcode")
    const date = generateRandDate()
    const yr = 2023
    const mon = 4

    it(method.toUpperCase() + ' - Today Schedule (TC-S001)', () => {
        const day = generateDayName(date)

        cy.request({
            method: method,
            url: `/api/v1/schedule/day/${day}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TodaySchedule')
        cy.get('@' + method + 'TodaySchedule').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','schedule_consume','consume_type','created_at','created_by']
            const stringNullableFields = ['firebase_id','consume_id','schedule_desc']
            const arrayFields = ['consume_detail','schedule_time']
            const arrayNullableFields = ['schedule_tag']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, arrayFields, 'array', false)
            cy.templateValidateColumn(dataArr, arrayNullableFields, 'array', true)
        })
    })

    it(method.toUpperCase() + ' - Today Calories (TC-S002)', () => {
        cy.request({
            method: method,
            url: `/api/v1/count/calorie/fulfill/2024-07-05`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TodayCalories')
        cy.get('@' + method + 'TodayCalories').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const intFields = ['total','target']

            // Validate column
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By From (TC-S005)', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/byfrom',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByFrom')
        cy.get('@' + method + 'TotalConsumeByFrom').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Type (TC-S004)', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/bytype',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByType')
        cy.get('@' + method + 'TotalConsumeByType').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Main Ingredient (TC-S007)', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/bymain',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByMain')
        cy.get('@' + method + 'TotalConsumeByMain').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Total Consume By Provide (TC-S006)', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/byprovide',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalConsumeByProvide')
        cy.get('@' + method + 'TotalConsumeByProvide').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Total Spend This Year (TC-S008)', () => {
        cy.request({
            method: method,
            url: '/api/v1/payment/total/month/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalSpendThisYear')
        cy.get('@' + method + 'TotalSpendThisYear').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - My Schedule (TC-C001)', () => {
        cy.request({
            method: method,
            url: '/api/v1/schedule',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'MySchedule')
        cy.get('@' + method + 'MySchedule').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['day','time','schedule_consume']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
        })
    })

    it(method.toUpperCase() + ' - Calendar Daily Spending (TC-C002)', () => {
        cy.request({
            method: method,
            url: '/api/v1/payment/total/month/'+mon+'/year/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CalendarDailySpending')
        cy.get('@' + method + 'CalendarDailySpending').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Calendar Daily Calorie (TC-C003 & TC-S009)', () => {
        cy.request({
            method: method,
            url: `/api/v1/consume/total/day/cal/month/${mon}/year/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CalendarDailyCalorie')
        cy.get('@' + method + 'CalendarDailyCalorie').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Monthly Payment Analytic (TS-S003)', () => {
        cy.request({
            method: method,
            url: '/api/v1/analytic/payment/month/'+mon+'/year/'+yr,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'AnalyticSpendByMonth')
        cy.get('@' + method + 'AnalyticSpendByMonth').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const intFields = ['average','max','min','total']

            // Validate column
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Body Info (TC-S012)', () => {
        cy.request({
            method: method,
            url: '/api/v1/count/calorie',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'BodyInfo')
        cy.get('@' + method + 'BodyInfo').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['created_at']
            const intFields = ['weight','height','result']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Spending Info (TC-S011)', () => {
        cy.request({
            method: method,
            url: '/api/v1/count/payment',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'SpendingInfo')
        cy.get('@' + method + 'SpendingInfo').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const intFields = ['total_days','total_payment']

            // Validate column
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Budget Spending BY Year (TC-S010)', () => {
        cy.request({
            method: method,
            url: `/api/v1/budget/by/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'BudgetSpendingByYear')
        cy.get('@' + method + 'BudgetSpendingByYear').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Consume Total (TC-S013)', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/total/bytype',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'ConsumeTotal')
        cy.get('@' + method + 'ConsumeTotal').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Calorie Max Min', () => {
        cy.request({
            method: method,
            url: '/api/v1/consume/calorie/maxmin',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CalorieMaxMin')
        cy.get('@' + method + 'CalorieMaxMin').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const intFields = ['max_calorie','min_calorie','avg_calorie']

            // Validate column
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it(method.toUpperCase() + ' - Calorie Total By Consume Type', () => {
        const type = 'all'

        cy.request({
            method: method,
            url: `/api/v1/consume/calorie/bytype/${type}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CalorieTotalByConsumeType')
        cy.get('@' + method + 'CalorieTotalByConsumeType').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const intFields = ['calorie']
            const stringFields = ['consume_type']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })
})