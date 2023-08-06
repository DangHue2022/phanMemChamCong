const controllerBaseUser = require('./controller');
const { check } = require('./middleware');

module.exports = {
    baseUrl: '/users/active',
    handler: [
        check,
    ],
    default: [
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
            route: 'send-from',
            handler: [
                controllerBaseUser.sendForm
            ]
        },
    ]
}