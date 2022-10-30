'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moneynote extends Model {
    static associate(models) {
      Moneynote.belongsTo(models.Customer,{foreignKey:"customerId"})
    }
  }
  Moneynote.init({
    moneyColect : DataTypes.INTEGER,
    isDeleted : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Moneynote',
  });
  return Moneynote;
};