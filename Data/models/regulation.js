'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regulation extends Model {
    static associate(models) {
      Regulation.hasMany(models.Rule,{foreignKey:"regulationId"})
    }
  }
  Regulation.init({
    title : DataTypes.STRING,
    description : DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Regulation',
  });
  return Regulation;
};