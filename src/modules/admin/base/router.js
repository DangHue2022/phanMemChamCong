const { check } = require('./middleware');
const controllerBaseAdmin = require('./controller');
const validateBaseAdmin = require('./validate');

module.exports = {
    baseUrl: '/admin',
    handler: [
        check,
    ],
    default: [
        {
            method: 'GET',
            route: '/list-users',
            handler: [
                controllerBaseAdmin.listUser
            ]
        },
        {
            method: 'GET',
            route: '/detail-user',
            handler: [
                controllerBaseAdmin.detailUser
            ]
        },
        {
            method: 'GET',
            route: '/add-user',
            handler: [
                controllerBaseAdmin.addUser
            ]
        },
        {
            method: 'POST',
            route: '/add-user',
            handler: [
                validateBaseAdmin.checkEmailExist,
                controllerBaseAdmin.addUserConfirm
            ]
        },
        {
            method: 'POST',
            route: '/edit-user',
            handler: [
                controllerBaseAdmin.editUser
            ]
        },
        {
            method: 'PATCH',
            route: '/delete-user',
            handler: [ 
                controllerBaseAdmin.deleteUser
            ]
        },
        {
            method: 'GET',
            route: '/settings',
            handler: [
                controllerBaseAdmin.getSettings
            ]
        },
        {
            method: 'POST',
            route: '/settings',
            handler: [ 
                controllerBaseAdmin.postSettings
            ]
        }
    ]
}