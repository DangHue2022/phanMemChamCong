const serviceAdmin = require('../../../services/v1/admin');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class controlerBaseAdmin {
    async listUser (req, res) {
        const allUser = await serviceAdmin.findAll({where: {role: 1}}, 'users');
        res.send(allUser)
    }

    async detailUser (req, res) {
        const detailUser = await serviceAdmin.findOne({where: {id: req.query.id}}, 'users');
        return res.send(detailUser);
    }

    // add user
    addUser (req, res) {
        res.send('open add user');
    }

    async addUserConfirm (req, res) {
        const dataUser = {
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary,
            role: req.body.role,
            passWord: bcrypt.hashSync("12345678", salt),
        }
        await serviceAdmin.create(dataUser, 'users');
        if (req.body.role != 0) {
            const user = await serviceAdmin.findOne({attributes: ['id'], where: {email: dataUser.email}}, 'users');
            const d = new Date();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const leaveUser = {
                userID: user.id,
                month: month,
                year: year,
                leaveOfMonth: 0,
            }
            await serviceAdmin.create(leaveUser, 'leaveInformations');
        } 
        res.send('add user confirm');
    }

    // edit user
    async editUser (req, res) {
        const dataUser = {
            salary: req.body.salary,
        };
        await serviceAdmin.update(dataUser, {where: {id: req.body.id}}, 'users');
        return res.send('edit user confirm');
    }

    // delete user
    async deleteUser (req, res) {
        const dataDelete = {
            deleted: true,
        }
        await serviceAdmin.update(dataDelete, {where: {id: req.body.id}}, 'users');
        return res.send('delete user confirm');
    }

    // settings
    getSettings(req, res) {
        res.send('open settings');
    }

    async postSettings(req, res) {
        const dataSettings = {
            day: req.body.dayOff,
            month: req.body.month,
            year: req.body.year,
            keys: ['number of hours worked in a day', 'saturday_off', 'sunday_off'],
            values: [req.body.hour_of_day, req.body.saturday_off, req.body.sunday_off],
        };
        const month = await serviceAdmin.findOne({attributes: ['id', 'month'], where: {month: dataSettings.month, year: dataSettings.year}}, 'settings');
        if (month) {
            await serviceAdmin.update(dataSettings, {where: {id: month.id}}, 'settings');
            await serviceAdmin.update(dataSettings, {where: {month: month.month}}, 'holidays')
        }
        else {
            await serviceAdmin.create(dataSettings, 'settings');
            await serviceAdmin.create(dataSettings, 'holidays');
        }
        res.send('month');
    }
}

module.exports = new controlerBaseAdmin();