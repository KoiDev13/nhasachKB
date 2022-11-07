'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bookform extends Model {
        static associate(models) {
            Bookform.hasMany(models.Detailbookform, { foreignKey: "bookformId" })
        }
    }
    Bookform.init({
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Bookform',
    });
    return Bookform;
};