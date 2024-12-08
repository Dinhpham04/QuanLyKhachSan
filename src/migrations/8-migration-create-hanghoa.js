'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HangHoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenHH: {
        type: Sequelize.STRING
      },
      giaBan: {
        type: Sequelize.INTEGER
      },
      giaVon: {
        type: Sequelize.INTEGER
      },
      tonKho: {
        type: Sequelize.INTEGER
      },
      anh: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('HangHoas');
  }
};