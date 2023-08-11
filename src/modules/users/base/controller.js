const appRootPath = require('app-root-path');
const serviceAdmin = require('../../../services/v1/admin');
const otp = require('../../../ulti/otp');
const sendOTPMail = require('../../../ulti/nodeMailer');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const fs = require('fs');

class controllerBaseUser {
    // edit user
    profile(req, res) {
        res.send('open profile');
    }

    async edit(req, res) {
        const userUpdate = {
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
        }
        await serviceAdmin.update(userUpdate, {where: {id: req.cookies.user.id}});
        res.send('edit completed');
    }

    // adit avatar
    async editAvatar(req, res) {
        const avatarUpdate = {
            avatar: req.file.filename,
        }
        const user = await serviceAdmin.findOne({where: {id: req.cookies.user.id}}, 'users');
        if (user.avatar) {
            fs.unlinkSync((appRootPath + `/src/public/image/${user.avatar}`).replace(/\\/g, '/'));
        }
        await serviceAdmin.update(avatarUpdate, {where: {id: req.cookies.user.id}}, 'users');
        res.send('update avatar completed');
    }

    // Change Password
    getChangePassword(req, res) {
        res.send('open page change password');
    }

    async changePassword(req, res) {
        await serviceAdmin.update({passWord: bcrypt.hashSync(req.body.newPassWord, salt)}, {where: {id: req.cookies.user.id}}, 'users');
        res.redirect('/login');
    }

    // edit email
    getEditEmail(req, res) {
        res.send('open edit email');
    }

    editEmail(req, res) {
        const secret = otp.generateUniqueSecret();
        const otpToken = otp.generateOTPToken(secret);
        res.cookie('secret', secret, {maxAge: 6000000});
        const sendOTP = {
            otpToken: otpToken,
            email: req.body.email
        };
        sendOTPMail(sendOTP);
        res.send('open page OTP');
    }

    async checkOTP(req, res) {
        try {
            const checkOTP = otp.verifyOTPToken(req.body.otp, req.cookies.secret);
            if (!checkOTP) {
                return res.send('OTP wrong');
            }
            await serviceAdmin.update({email: req.body.email}, {where: {id: req.cookies.user.id}}, 'users');
            return res.redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new controllerBaseUser();