const db = require ('../../../models/index');
const jwt = require('../../../ulti/jwt');
const servicesAdmin = require('../../../services/v1/admin');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-hoangdangdev.com-green-cat-a@";
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-hoangdangdev.com-green-cat-a@";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d';

class defaultController {
    // login
    login (req, res) {
        return res.json({Dien: 'login'});
    }

    async loginConfirm (req, res) {
        try {
            const accessToken =  await jwt.generateToken(req.user, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwt.generateToken(req.user, refreshTokenSecret, refreshTokenLife);
            res.cookie('accessToken', accessToken, { maxAge: 6000000});
            res.cookie('refreshToken', refreshToken, { maxAge: 6000000});
            const userUpdate = {
                refreshToken: refreshToken,
                id: req.user.id,
            };
            await servicesAdmin.update(userUpdate, 'users');
            const user = await servicesAdmin.findOne({where: {email: req.user.email}}, 'users');
            res.cookie('user', user, { maxAge: 6000000});

            res.send('login success');
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async refreshToken (req, res) {
        const userData = await servicesAdmin.findOne({attributes: ['refreshToken'], where: {email: req.cookies.user.email}}, 'users');
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken && refreshToken === userData.refreshToken) {
            try {
                const decoded = await jwt.verifyToken(userData.refreshToken, refreshTokenSecret);
                const user = decoded.data;
                const accessToken = jwt.generateToken(user, accessTokenSecret, accessTokenLife);
                res.cookie('accessToken', accessToken, { maxAge: 6000000});
                return res.redirect(req.headers.referer)
            } catch (error) {
                res.status(403).json({
                    message: 'Invalid refresh token.',
                  });
            }
        }
        else {
            // Không tìm thấy token trong request
            res.redirect('/login');
        }
    }

    // logout user
    async logout (req, res) {
        res.clearCookie('accessToken');
        res.clearCookie('user');
        const data = {
            refreshToken: '',
            id: req.cookies.user.id
        }
        await servicesAdmin.update(data, 'users');
        res.clearCookie('refreshToken');
        return res.redirect('/login');
    }

    home (req, res) {
        res.send('ok');
    }
}

module.exports = new defaultController();