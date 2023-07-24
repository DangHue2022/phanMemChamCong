const controller = require('./controller');
const { sleep } = require('./middleware');
const validate = require('./validate');

module.exports = {
    baseUrl: '/admin/list-from',
    handler: [
        sleep,
    ],
    default: [
        {
            method: 'GET',
            route: '/detail',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'POST',
            route: '/accept',
            handler: [
                validate,
                controller
            ]
        },
        {
            method: 'POST',
            route: '/reject',
            handler: [
                validate,
                controller
            ]
        }
    ]
}