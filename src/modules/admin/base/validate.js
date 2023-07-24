require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-hoangdangdev.com-green-cat-a@";
const jwt = require('../../../ulti/jwt');
const serviceAdmin = require('../../../services/v1/admin');

class validateBaseAdmin {
    async checkEmailExist (req, res, next) {
        const checkEmail = await serviceAdmin.findOne({where: {email: req.body.email}}, 'users');
        if (checkEmail) {
            return res.send('email already exists');
        }
        next();
    }
}

module.exports = new validateBaseAdmin();