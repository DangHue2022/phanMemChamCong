const controllerUserListForm = require('./controller');
const { check } = require('./middleware');

module.exports = {
    baseUrl: '/admin/list-form',
    handler: [
        check,
    ],
    default: [
        {
            method: 'GET',
            route: '/detail',
            handler: [
                controllerUserListForm.detailForm
            ]
        },
        {
            method: 'GET',
            route: '/accept',
            handler: [
                controllerUserListForm.acceptForm
            ]
        },
        {
            method: 'GET',
            route: '/reject',
            handler: [
                controllerUserListForm.rejectForm
            ]
        },
        {
            method: 'POST',
            route: '/',
            handler: [
                controllerUserListForm.listForm
            ]
        }
    ]
}