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
                controllerBaseUser.notification
            ]
        },
        {
            method: 'GET',
            route: '/notifications-detail',
            handler: [
                controllerBaseUser.detailNotification
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
                controllerBaseUser.calendar
            ]
        },
        {
            method: 'GET',
            route: '/history-checkin',
            handler: [
                controllerBaseUser.historyCheckInOut
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