'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detailbookform extends Model {
    static associate(models) {
      Detailbookform.belongsTo(models.Bookform, { foreignKey: "bookformId" })
      Detailbookform.belongsTo(models.Book, { foreignKey: "bookId" })
    }
  }
  Detailbookform.init({
    numberBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detailbookform',
  });
  return Detailbookform;
};