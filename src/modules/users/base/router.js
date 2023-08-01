const controllerBaseUser = require('./controller');
const { check } = require('./middleware');
const validateUser = require('./validate');

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
                
                controllerBaseUser.profile
            ]
        },
        {
            method: 'GET',
            route: '/edit-email',
            handler: [
                controllerBaseUser.getEditEmail
            ]
        },
        {
            method: 'GET',
            route: '/change-password',
            handler: [
                controllerBaseUser.getChangePassword
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
            route: '/edit',
            handler: [
                
                controllerBaseUser.edit
            ]
        },
        {
            method: 'POST',
            route: 'send-from',
            handler: [
                controllerBaseUser.sendForm
            ]
        },
        {
            method: 'POST',
            route: '/change-password',
            handler: [
                validateUser.checkPassword,
                controllerBaseUser.changePassword
            ]
        },
        {
            method: 'POST',
            route: '/edit-avatar',
            handler: [
                validateUser.uploadImage,
                controllerBaseUser.editAvatar
            ]
        },
        {
            method: 'POST',
            route: '/edit-email',
            handler: [
                controllerBaseUser.editEmail
            ]
        },
        {
            method: 'POST',
            route: '/check-otpEmail',
            handler: [
                controllerBaseUser.checkOTP
            ]
        }
    ]
}