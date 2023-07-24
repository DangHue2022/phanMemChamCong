'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    email: DataTypes.STRING,
    passWord: DataTypes.TEXT,
    salary: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    avatar: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN,
    refreshToken: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};