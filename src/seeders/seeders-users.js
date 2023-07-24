const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            name: 'Admin',
            date_of_birth: '04/12/1998',
            email: 'admin@gmail.com',
            passWord: bcrypt.hashSync("12345678", salt),
            salary: '0',
            role: 0,
            avatar: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};