const defaultController = require('./controller');
const validateDefault = require('./validate');

module.exports = {
    baseUrl: '/',
    handler: [
        (req, res, next) => {
            return next();
        },
    ],
    default: [
        {
            method: 'GET',
            route: '/login',
            handler: [
                defaultController.login
            ]
        },
        {
            method: 'GET',
            route: '/logout',
            handler: [
                defaultController.logout
            ]
        },
        {
            method: 'POST',
            route: '/login',
            handler: [
                validateDefault.checkLogin,
                defaultController.loginConfirm
            ]
        },
        {
            method: 'GET',
            route: '/refreshToken',
            handler: [
                defaultController.refreshToken
            ]
        },
        {
            method: 'GET',
            route: '/forgot-password',
            handler: [
                defaultController.getForgotPassword
            ]
        },
        {
            method: 'POST',
            route: '/forgot-password',
            handler: [
                defaultController.forgotPassWord
            ]
        },
        {
            method: 'POST',
            route: '/check-OTP',
            handler: [
                defaultController.checkOtp
            ]
        },
        {
            method: 'POST',
            route: '/reset-password',
            handler: [
                validateDefault.checkPassword,
                defaultController.resetPassword
            ]
        },
        {
            method: 'GET',
            route: '',
            handler: [
                defaultController.home
            ]
        },
    ]
}