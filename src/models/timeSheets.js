'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timeSheets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  timeSheets.init({
    userID: DataTypes.INTEGER,
    time: DataTypes.TIME,
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'timeSheets',
  });
  return timeSheets;
};