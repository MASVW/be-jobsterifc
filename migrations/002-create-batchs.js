'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('batchs', {
      batchId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // nama tabel, bukan nama model
          key: 'userId', // kolom yang dirujuk di tabel users
        },
        onDelete: 'SET NULL',
      },
      campaignName: {
        type: Sequelize.STRING
      },
      campaignDesc: {
        type: Sequelize.TEXT
      },
      campaignKeyword: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      predict: {
        allowNull: true,
        type: Sequelize.JSON
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('batchs');
  }
};