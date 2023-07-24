const serviceAdmin = require('../services/v1/admin');
const CronJob = require('cron').CronJob;

const leaveOfMonth = async () => {
    const leaves = await serviceAdmin.findAll({attributes: ['id'], where: {deleted: false, role: 1}}, 'users');
    leaves.forEach(async (leave) => {
        const userLeave = await serviceAdmin.findOne({where: {userID: leave.id}}, 'leaveInformations');
        const leaveUpdate = {
            leaveOfMonth: userLeave.leaveOfMonth + 1,
            id: userLeave.id,
        }
        await serviceAdmin.update(leaveUpdate, 'leaveInformations')
    });
}
const extraDaysOff = new CronJob(
    '2 2 8 1 * *',
    leaveOfMonth,
    null,
    true,
);

const leavePeriod = new CronJob(
    '* * * * * *',
    function () {
        console.log('abc')
    },
    null,
    true,
);