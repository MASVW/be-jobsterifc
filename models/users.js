'use strict';
const { Trie } = require('natural');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.batchs, {
        foreignKey: 'userId',
        as: 'batches',
      });
      users.hasMany(models.applyments, {
        foreignKey: 'userId',
        as: 'application',
      });
    }
  }
  users.init(
    {
  userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    resume: DataTypes.STRING,
    profile: DataTypes.STRING,
    isCustomer: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    job: DataTypes.STRING,
    sex: {
      type: DataTypes.ENUM('MALE','FEMALE'),
      defaultValue: 'MALE'
    },
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.TEXT,
    phone: DataTypes.STRING,
    predict: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, 
  {
    sequelize,
    modelName: 'users',
  });
  return users;
};