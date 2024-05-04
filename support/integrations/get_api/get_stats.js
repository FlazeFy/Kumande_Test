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

    it(method.toUpperCase() + ' - TodaySchedule (TC-S001)', () => {
        const day = generateDayName(date)

        cy.request({
            method: method,
            url: `/api/v1/schedule/day/${day}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TodaySchedule')
        cy.get('@' + method + 'TodaySchedule').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - TodayCalories (TC-S002)', () => {
        const day = generateDayName(date)

        cy.request({
            method: method,
            url: `/api/v1/analytic/payment/month/${mon}/year/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TodayCalories')
        cy.get('@' + method + 'TodayCalories').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'TotalConsumeByFrom').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'TotalConsumeByType').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'TotalConsumeByMain').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'TotalConsumeByProvide').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'TotalSpendThisYear').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Total Daily Calorie This Month (TC-S009)', () => {
        cy.request({
            method: method,
            url: `/api/v1/consume/total/day/cal/month/${mon}/year/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'TotalDailyCalorieThisMonth')
        cy.get('@' + method + 'TotalDailyCalorieThisMonth').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'MySchedule').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'CalendarDailySpending').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Calendar Daily Calorie (TC-C003)', () => {
        cy.request({
            method: method,
            url: `/api/v1/consume/total/day/cal/month/${mon}/year/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'CalendarDailyCalorie')
        cy.get('@' + method + 'CalendarDailyCalorie').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'AnalyticSpendByMonth').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'BodyInfo').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'SpendingInfo').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })

    it(method.toUpperCase() + ' - Budget Spending This Year (TC-S010)', () => {
        cy.request({
            method: method,
            url: `/api/v1/budget/${yr}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as(method + 'BudgetSpendingThisYear')
        cy.get('@' + method + 'BudgetSpendingThisYear').then(stats => {
            cy.templateGet(stats, is_paginate)
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
        cy.get('@' + method + 'ConsumeTotal').then(stats => {
            cy.templateGet(stats, is_paginate)
        })
    })
})