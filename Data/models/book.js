'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Detailreceipt, { foreignKey: "bookId" })
      Book.hasMany(models.Detailbookform, { foreignKey: "bookId" })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    author: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};