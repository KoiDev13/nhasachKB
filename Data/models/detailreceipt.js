'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detailreceipt extends Model {
    static associate(models) {
      Detailreceipt.belongsTo(models.Book, { foreignKey: "bookId" })
      Detailreceipt.belongsTo(models.Receipt, { foreignKey: "receiptId" })
    }
  }
  Detailreceipt.init({
    numberBook: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Detailreceipt',
  });
  return Detailreceipt;
};