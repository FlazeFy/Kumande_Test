// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - Consume', () => {
    const method = 'put'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Update Gallery', () => {
        const id = '6cecae97-3e1d-2976-0904-09e14e3c9b5b'
        const body = {
            "gallery_desc" : "This is an image testings",
        }
        cy.request({
            method: method,
            url: `/api/v1/consume/gallery/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdateGallery')
        cy.get('@' + method + 'UpdateGallery').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Update Is Favorite', () => {
        const id = '0b9e3fa7-8e17-feaa-3be0-44d43f9699d8'
        const body = {
            "is_favorite" : 1,
        }
        cy.request({
            method: method,
            url: `/api/v1/consume/update/favorite/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdateIsFavorite')
        cy.get('@' + method + 'UpdateIsFavorite').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Update Consume Data', () => {
        const id = '0b9e3fa7-8e17-feaa-3be0-44d43f9699d8'
        const body = {
            "consume_type" : 'Food',
            "consume_name" : 'Rice Testing',
            "consume_from" : "Go-Food",
            "consume_tag" : `[{"slug_name":"chocolate","tag_name":"Chocolate"},{"slug_name":"tasty","tag_name":"Tasty"}]`,
            "consume_comment" : "This is comment testing"
        }
        cy.request({
            method: method,
            url: `/api/v1/consume/update/data/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdateConsumeData')
        cy.get('@' + method + 'UpdateConsumeData').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Update Consume List Data', () => {
        const id = 'f0d5de00-c0e3-07f6-0b0c-27492e113d4e'
        const body = {
            "list_name" : 'Asian testing food',
            "list_desc" : "This is description testing",
        }
        cy.request({
            method: method,
            url: `/api/v1/list/update/data/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'UpdateConsumeListData')
        cy.get('@' + method + 'UpdateConsumeListData').then(dt => {
            cy.templatePut(dt,null)
        })
    })
})