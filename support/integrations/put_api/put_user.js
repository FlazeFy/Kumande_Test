// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Kumande API Testing - User', () => {
    const method = 'put'
    const token = generateAuthToken("hardcode")

    it(method.toUpperCase() + ' - Edit Profile', () => {
        const body = {
            'fullname' : 'testingleonardho',
            'email' : 'testing@gmail.com',
            'gender' : 'male',
            'born_at' : '2001-08-08',
        }
        cy.request({
            method: method,
            url: '/api/v1/user/edit',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'EditProfile')
        cy.get('@' + method + 'EditProfile').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Edit Telegram ID', () => {
        const body = {
            'telegram_user_id' : '1317625971',
        }
        cy.request({
            method: method,
            url: '/api/v1/user/edit_telegram_id',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'EditTelegramID')
        cy.get('@' + method + 'EditTelegramID').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Edit Telegram ID QR Code', () => {
        const body = {
            "id" : "157c5f24-8f7f-11ee-b9d1-0242ac120002",
            'telegram_user_id' : '1317625977',
        }
        cy.request({
            method: method,
            url: '/api/v1/user/edit_telegram_id_qrcode',
            body: body
        }).as(method + 'EditTelegramIDQrCode')
        cy.get('@' + method + 'EditTelegramIDQrCode').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Edit Timezone', () => {
        const body = {
            'timezone' : '+07:00',
        }
        cy.request({
            method: method,
            url: '/api/v1/user/edit_timezone',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'EditTimezone')
        cy.get('@' + method + 'EditTimezone').then(dt => {
            cy.templatePut(dt,null)
        })
    })

    it(method.toUpperCase() + ' - Edit Profile Image', () => {
        const body = {
            "image_url" : "157c5f24-8f7f-11ee-b9d1-0242ac120002",
        }
        cy.request({
            method: method,
            url: '/api/v1/user/image',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: body
        }).as(method + 'EditProfileImage')
        cy.get('@' + method + 'EditProfileImage').then(dt => {
            cy.templatePut(dt,null)
        })
    })
})