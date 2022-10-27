'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Moneynote,{foreignKey:"customerId"})
    }
  }
  Customer.init({
    fullname : DataTypes.STRING,
    address : DataTypes.STRING,
    phone : DataTypes.STRING,
    email : DataTypes.STRING,
    debt : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};