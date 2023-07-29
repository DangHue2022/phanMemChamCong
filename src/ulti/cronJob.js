const serviceAdmin = require('../services/v1/admin');
const CronJob = require('cron').CronJob;
const d = new Date();

const leaveOfMonth = async () => {
    const leaves = await serviceAdmin.findAll({attributes: ['id'], where: {deleted: false, role: 1}}, 'users');
    var getMonth = d.getMonth();
    var getFullYear = d.getFullYear();
    if (getMonth === 0) {
        getMonth = 12;
        getFullYear -= 1;
    }
    leaves.forEach(async (leave) => {
        const userLeave = await serviceAdmin.findOne({where: {userID: leave.id, month: getMonth, year: getFullYear}}, 'leaveInformations');
        if (d.getMonth() === 0) {
            userLeave.leaveOfMonth = 0;
            userLeave.used = false;
        }
        const leaveUpdate = {
            userID: userLeave.userID,
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            leaveOfMonth: userLeave.leaveOfMonth + 1,
            used: userLeave.used,
        }
        await serviceAdmin.create(leaveUpdate, 'leaveInformations')
    });
}

const expiredLeaveDays = async () => {
    await serviceAdmin.update({status: false}, {where: {year: d.getFullYear() - 1}}, 'leaveInformations');
}

const extraDaysOff = new CronJob(
    '2 2 2 1 * *',
    leaveOfMonth,
    null,
    true,
);

const leavePeriod = new CronJob(
    '2 2 2 1 0 *',
    expiredLeaveDays,
    null,
    true,
);

const workDay = async () => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = day + '/' + month + '/' + year;
    const listUsers = await serviceAdmin.findAll({attributes: ['id'], where: {deleted: false, role: 1}}, 'users');
    
    listUsers.forEach(async (user) => {
        const dataTimeSheets = await serviceAdmin.findAll({where: {date: date, userID: user.id}}, 'timeSheets');
        const payRollMonth = await serviceAdmin.findOne({where: {month: month, year: year, userID: user.id}}, 'payRolls');
        const setting = await serviceAdmin.findOne({where: {month: month, year: year}}, 'settings');
        const payRollDay = {
            userID: user.id,
            month: month,
            year: year,
        };
        var time;
        if (!setting) {
            setting.values[0] = 8;
        }

        if (dataTimeSheets.length != 0) {
            const singleType = await serviceAdmin.findOne({where: {userID: user.id, date: date, status: 1}}, 'applicationForms');
            
            if (!singleType) {
                time = dataTimeSheets[dataTimeSheets.length - 1].time - dataTimeSheets[0].time;
                const hours = Math.floor(time / 3600000);
                const minutes = Math.floor((time % 3600000) / 60000) / 60;
                time = hours + minutes;
            }
            else if (singleType.singleID === 3) {
                const hoursCheckOut = convertTimeToHours(dataTimeSheets[0].time);
                const endTimeHour = sliceAndConvertTime(singleType.endTime);
                time = endTimeHour - hoursCheckOut;
            }
            else if (singleType.singleID === 2) {
                const hoursCheckIn = convertTimeToHours(dataTimeSheets[dataTimeSheets.length - 1].time);
                const startTimeHour = sliceAndConvertTime(singleType.startTime);
                time = hoursCheckIn - startTimeHour;
                console.log(time)
            }
            else if (singleType.singleID === 1) {
                time = setting.values[0];
            }
            else if (singleType.singleID === 4) {
                const hourLate = convertTimeToHours(dataTimeSheets[0].time);
                const startHourLate = sliceAndConvertTime(singleType.startTime);
                const hourEarly = convertTimeToHours(dataTimeSheets[dataTimeSheets.length - 1].time);
                const endHourLate = sliceAndConvertTime(singleType.endTime);
                if ((hourLate <= startHourLate + (5/60)) && (hourEarly >= endHourLate - (5/60))) {
                    time = setting.values[0];
                }
                else {
                    time = dataTimeSheets[dataTimeSheets.length - 1].time - dataTimeSheets[0].time;
                    const hours = Math.floor(time / 3600000);
                    const minutes = Math.floor((time % 3600000) / 60000) / 60;
                    time = hours + minutes;
                }
            }
            
            if (payRollMonth) {
                if (time >= 7.5 && time < setting.values[0]) {
                    payRollDay.workDay = payRollMonth.workDay + 0.7;
                    return await serviceAdmin.update(payRollDay, {where: {month: payRollMonth.month, userID: payRollMonth.userID, year: payRollMonth.year}}, 'payRolls');
                }
                else if (time >= 5 && time < 7.5) {
                    payRollDay.workDay = payRollMonth.workDay + 0.5;
                    return await serviceAdmin.update(payRollDay, {where: {month: payRollMonth.month, userID: payRollMonth.userID, year: payRollMonth.year}}, 'payRolls');
                }
                else if (time < 5) {
                    return;
                }
                else {
                    payRollDay.workDay = payRollMonth.workDay + 1;
                    return await serviceAdmin.update(payRollDay, {where: {month: payRollMonth.month, userID: payRollMonth.userID, year: payRollMonth.year}}, 'payRolls');
                }
            }
            else {
                if (time >= 7.5 && time < setting.values[0]) {
                    payRollDay.workDay = 0.7;
                    return await serviceAdmin.create(payRollDay, 'payRolls');
                }
                else if (time >= 5 && time < 7.5) {
                    payRollDay.workDay = 0.5;
                    return await serviceAdmin.create(payRollDay, 'payRolls');
                }
                else if (time < 5) {
                    payRollDay.workDay = 0;
                    return await serviceAdmin.create(payRollDay, 'payRolls');
                }
                else {
                    payRollDay.workDay = 1;
                    return await serviceAdmin.create(payRollDay, 'payRolls');
                }
            }
        }
        else {
            const single = await serviceAdmin.findOne({where: {userID: user.id, date: date, status: 1, singleID: 1}}, 'applicationForms');
            if (single) {
                if (payRollMonth) {
                    payRollDay.workDay = payRollMonth.workDay + 1;
                    return await serviceAdmin.update(payRollDay, {where: {month: payRollMonth.month, userID: payRollMonth.userID, year: payRollMonth.year}}, 'payRolls');
                }
                else {
                    payRollDay.workDay = 1;
                    return await serviceAdmin.create(payRollDay, 'payRolls');
                }
            }
            return
        }
    })
};

const convertTimeToHours = (milisecond) => {
    var hoursCheckIn = Math.floor(milisecond / 3600000);
    const minutesCheckIn = Math.floor((milisecond % 3600000) / 60000) / 60;
    hoursCheckIn %= 24;
    hoursCheckIn += 7;
    hoursCheckIn += minutesCheckIn;
    return hoursCheckIn
}
const sliceAndConvertTime = (time) => {
    const startTimeMinute = Number(time.slice(3, 5)) / 60;
    const startTimeHour = Number(time.slice(0, 2)) + startTimeMinute;
    return startTimeHour;
}

const closeTheWorkingDays = new CronJob(
    '* * * * * *',
    workDay,
    null,
    true,
);