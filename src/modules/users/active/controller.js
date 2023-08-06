
const serviceAdmin = require('../../../services/v1/admin');

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
}

module.exports = new controllerBaseUser();