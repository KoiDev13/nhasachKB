'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init({
    username : DataTypes.STRING,
    password : DataTypes.STRING,
    role : DataTypes.STRING,
    isDeleted : DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};