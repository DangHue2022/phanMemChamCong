const servicesAdmin = require('../../../services/v1/admin');
const bcrypt = require('bcryptjs');

class validate {
    async checkLogin (req, res, next) {
        const user = await servicesAdmin.findOne({where: {email: req.body.email}}, 'users');
        if (user === null) {
           return res.send('email not found');
        }
        else {
            if (!bcrypt.compareSync(req.body.passWord, user.passWord)) {
                return res.send('password not match');
            }
            else {
                req.user = user;
                next();
            }
        }
    }

    async checkPassword(req, res, next) { 
        if (req.body.newPassword != req.body.enterThePassword) {
            return res.status(403).send('re-enter incorrect password');
        }
        else {
            var checkPasswordUpToCase = false;
            var checkPasswordToLowerCase = false;
            var checkPasswordNumber = false;
            var checkPasswordSpecialCharacters = false;
            for (let i = 0; i< req.body.newPassword.length; i++) {
                if (req.body.newPassword[i] >= 'A' && req.body.newPassword[i] <= 'Z') {
                    checkPasswordUpToCase = true;
                }
                else if (req.body.newPassword[i] >= 'a' && req.body.newPassword[i] <= 'z') {
                    checkPasswordToLowerCase = true;
                }
                else if (req.body.newPassword[i] >= '0' && req.body.newPassword[i] <= '9') {
                    checkPasswordNumber = true;
                }
                else if (req.body.newPassword[i] === '!' || req.body.newPassword[i] === '@' || req.body.newPassword[i] === '$' || req.body.newPassword[i] === '&' || req.body.newPassword === '%') {
                    checkPasswordSpecialCharacters = true;
                }
            }
            if (checkPasswordNumber === false || checkPasswordSpecialCharacters === false || checkPasswordToLowerCase === false || checkPasswordUpToCase === false) {
                return res.status(403).send('Weak password')
            }
            next();
        }
    }
}

module.exports = new validate();