'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookreceive extends Model {
    static associate(models) {
      Bookreceive.belongsTo(models.Receive,{foreignKey: "receiveId"})
      Bookreceive.belongsTo(models.Book,{foreignKey:"bookId"})
    }
  }
  Bookreceive.init({
    receivedQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookreceive',
  });
  return Bookreceive;
};