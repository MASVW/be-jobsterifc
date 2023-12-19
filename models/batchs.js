'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class batchs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      batchs.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      batchs.hasMany(models.applyments, {
        foreignKey: 'batchId',
        as: 'application',
      });
    }
  }
  batchs.init({
    batchId: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
    userId: DataTypes.INTEGER,
    campaignName: DataTypes.STRING,
    campaignDesc: DataTypes.TEXT,
    campaignKeyword: DataTypes.STRING,
    predict: DataTypes.JSON,
    status: DataTypes.BOOLEAN,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'batchs',
  });
  return batchs;
};