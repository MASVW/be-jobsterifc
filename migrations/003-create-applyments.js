'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('applyments', {
      applyId: {
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
      batchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'batchs', // nama tabel, bukan nama model
          key: 'batchId', // kolom yang dirujuk di tabel users
        },
        onDelete: 'SET NULL',
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    await queryInterface.dropTable('applyments');
  }
};