'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receipt extends Model {
        static associate(models) {
            Receipt.belongsTo(models.Customer, { foreignKey: "customerId" })
            Receipt.hasMany(models.Detailreceipt, { foreignKey: "receiptId" })
        }
    }
    Receipt.init({
        totalValue: DataTypes.INTEGER,
        pay: DataTypes.INTEGER,
        isDeleted: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Receipt',
    });
    return Receipt;
};