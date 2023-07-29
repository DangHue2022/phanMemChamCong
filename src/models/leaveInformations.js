'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leaveInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leaveInformation.init({
    userID: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    leaveOfMonth: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
    used: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'leaveInformations',
  });
  return leaveInformation;
};