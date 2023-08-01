const serviceAdmin = require('../../../services/v1/admin');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = require('../../../ulti/multer');
const uploadSingle = upload.single('avatar');

class validateUser {
    async checkPassword(req, res, next) {
        const user = await serviceAdmin.findOne({where: {id: req.cookies.user.id}}, 'users');
        const userPassword = bcrypt.compareSync(req.body.passWord, user.passWord);
        if (!userPassword) {
            return res.status(403).send('Current password is not correct')
        }
        else if (req.body.newPassWord != req.body.enterThePassword) {
            return res.status(403).send('re-enter incorrect password');
        }
        else {
            var checkPasswordUpToCase = false;
            var checkPasswordToLowerCase = false;
            var checkPasswordNumber = false;
            var checkPasswordSpecialCharacters = false;
            for (let i = 0; i< req.body.newPassWord.length; i++) {
                if (req.body.newPassWord[i] >= 'A' && req.body.newPassWord[i] <= 'Z') {
                    checkPasswordUpToCase = true;
                }
                else if (req.body.newPassWord[i] >= 'a' && req.body.newPassWord[i] <= 'z') {
                    checkPasswordToLowerCase = true;
                }
                else if (req.body.newPassWord[i] >= '0' && req.body.newPassWord[i] <= '9') {
                    checkPasswordNumber = true;
                }
                else if (req.body.newPassWord[i] === '!' || req.body.newPassWord[i] === '@' || req.body.newPassWord[i] === '$' || req.body.newPassWord[i] === '&' || req.body.newPassWord === '%') {
                    checkPasswordSpecialCharacters = true;
                }
            }
            if (checkPasswordNumber === false || checkPasswordSpecialCharacters === false || checkPasswordToLowerCase === false || checkPasswordUpToCase === false) {
                return res.status(403).send('Weak password')
            }
            next();
        }
    }
    async uploadImage(req, res, next) {
        uploadSingle(req, res, function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            next();
        })
    }
}


module.exports = new validateUser();