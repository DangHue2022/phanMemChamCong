const appRootPath = require('app-root-path');
const serviceAdmin = require('../../../services/v1/admin');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const fs = require('fs');
const path = require('path');

class controllerBaseUser {
    async check(req, res) {
        const d = new Date();
        const time = d.getTime();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const date = day+'/'+month+'/'+year
        const timeSheet = {
            userID: req.cookies.user.id,
            time: time,
            date: date,
        }
        await serviceAdmin.create(timeSheet, 'timeSheets')
        res.send('date')
    }

    // create form
    createForm(req, res) {
        res.send('open create form')
    }

    async sendForm(req, res) {
        const type = {
            userID: req.cookies.user.id,
            singleID: req.body.singleID,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalDaysOff: req.body.totalDaysOff,
        }
        await serviceAdmin.create(type, 'applicationForms');
        res.send('type')
    }

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
}

module.exports = new controllerBaseUser();