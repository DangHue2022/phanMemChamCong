'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payRoll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payRoll.init({
    userID: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    workDay: DataTypes.FLOAT,
    salary: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'payRolls',
  });
  return payRoll;
};