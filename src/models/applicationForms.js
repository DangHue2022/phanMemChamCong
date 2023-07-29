'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class applicationForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  applicationForm.init({
    userID: DataTypes.INTEGER,
    singleID: DataTypes.INTEGER,
    date: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    status: DataTypes.INTEGER,
    totalDaysOff: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'applicationForms',
  });
  return applicationForm;
};