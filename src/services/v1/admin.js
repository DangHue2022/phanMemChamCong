const { Op } = require('sequelize');
const db = require('../../models/index');

const models = [
    'users', 'settings', 'timeSheets', 'singleTypes', 'payRolls', 'monthlySalarys',
    'notifications', 'leaveInformations', 'holidays', 'applicationForms'
];

class servicesDefault {
    findOne (data, mod) {
        return new Promise((resolve, reject) => {
            try {
                models.forEach(async (model) => {
                    if (model === mod) {
                        const ele = await db[model].findOne(data);
                        resolve(ele);
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    findAll (data, mod) {
        return new Promise(async(resolve, reject) => {
            try {
                models.forEach(async (model) => {
                    if (model === mod) {
                        const allUsers = await db[model].findAll(data);
                        resolve(allUsers);
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    create (data, mod) {
        return new Promise((resolve, reject) => {
            try {
                models.forEach(async(model) => {
                    if (model === mod) {
                        await db[model].create(data);
                        resolve();
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    update (data, condition, mod) {
        return new Promise((resolve, reject) => {
            try {
                models.forEach(async(model) => {
                    if(model === mod) {
                        await db[model].update(data, condition);
                        resolve();
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new servicesDefault();