const serviceAdmin = require('../../../services/v1/admin');
const db = require('../../../models/index');
const d = new Date();

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

    // notifications
    async notification(req, res) {
        const dataNotification = await serviceAdmin.findAll({where: {userID: req.cookies.user.id}}, 'notifications');
        res.send(dataNotification)
    }

    async detailNotification(req, res) {
        serviceAdmin.innerJoin('singleTypes', 'applicationForms', {foreignKey: 'singleID', constraints: false})
        const innerJoin = await serviceAdmin.findOne({include: [{model: db.singleTypes, required: true}], where: {id: req.query.formID}}, 'applicationForms');
        res.send(innerJoin)
    }

    // timekeeping-calendar
    async calendar(req, res) {
        const calendarWorkDay = await serviceAdmin.findAll({where: {userID: req.cookies.user.id, month: req.query.month}}, 'payRolls');
        res.send(calendarWorkDay)
    }

    async historyCheckInOut(req, res) {
        const userID = req.cookies.user.id;
        const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        var timeCheck = [];
        const historyCheckInOutUser = await serviceAdmin.findAll({attributes: ['time'] ,where: {userID: userID, date: date}}, 'timeSheets');
        historyCheckInOutUser.forEach(element => {
            timeCheck.push( convertTimeToHours(element.time))
        })
        res.send(timeCheck)
    }
}

const convertTimeToHours = (milisecond) => {
    var hours = Math.floor(milisecond / 3600000);
    const minutes = Math.floor((milisecond % 3600000) / 60000);
    var time;
    hours %= 24;
    hours += 7;
    time = hours + ':' + minutes;
    return time
}

module.exports = new controllerBaseUser();