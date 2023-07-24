const controller = require('./controller');
const { sleep } = require('./middleware');
const validate = require('./validate');

module.exports = {
    baseUrl: '/users',
    handler: [
        sleep,
    ],
    default: [
        {
            method: 'GET',
            route: '/profile',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/edit',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/create-from',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/notifications',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/check',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/timekeeping-calendar',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'GET',
            route: '/notifications-detail',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'POST',
            route: '/register',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'POST',
            route: '/edit',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'POST',
            route: 'send-from',
            handler: [
                validate,
                controller
            ]
        }
    ]
}