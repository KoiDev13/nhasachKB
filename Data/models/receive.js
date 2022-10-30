'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receive extends Model {
    static associate(models) {
      Receive.hasMany(models.Bookreceive,{foreignKey:"receiveId"})
    }
  }
  Receive.init({
    isDeleted : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Receive',
  });
  return Receive;
};