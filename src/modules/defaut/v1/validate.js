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
}

module.exports = new validate();