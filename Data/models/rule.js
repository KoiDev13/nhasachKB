'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    static associate(models) {
      Rule.belongsTo(models.Regulation,{foreignKey:"regulationId"})
    }
  }
  Rule.init({
    minReceive : DataTypes.INTEGER,
    minQuantityBeforeReceive : DataTypes.INTEGER,
    maxDebt : DataTypes.INTEGER,
    minQuantityAfterSell : DataTypes.INTEGER,
    allowConsiderDebt : DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'Rule',
  });
  return Rule;
};