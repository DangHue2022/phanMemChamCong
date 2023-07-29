const controllerBaseUser = require('./controller');
const { check } = require('./middleware');
const validate = require('./validate');

module.exports = {
    baseUrl: '/users',
    handler: [
        check,
    ],
    default: [
        {
            method: 'GET',
            route: '/profile',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'GET',
            route: '/edit',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'GET',
            route: '/create-from',
            handler: [
                
                controllerBaseUser.createForm
            ]
        },
        {
            method: 'GET',
            route: '/notifications',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'GET',
            route: '/check',
            handler: [
                controllerBaseUser.check
            ]
        },
        {
            method: 'GET',
            route: '/timekeeping-calendar',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'GET',
            route: '/notifications-detail',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'POST',
            route: '/register',
            handler: [
                
                controllerBaseUser.single
            ]
        },
        {
            method: 'POST',
            route: '/edit',
            handler: [
                
                controllerBaseUser.check
            ]
        },
        {
            method: 'POST',
            route: 'send-from',
            handler: [
                controllerBaseUser.check
            ]
        }
    ]
}