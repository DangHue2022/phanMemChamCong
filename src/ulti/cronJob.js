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