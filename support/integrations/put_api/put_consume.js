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
})