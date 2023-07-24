'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        defaultValue: 'Dang',
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      passWord: {
        type: Sequelize.TEXT
      },
      salary: {
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.TEXT
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};