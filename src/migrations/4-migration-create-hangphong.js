'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HangPhongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenHP: {
        type: Sequelize.STRING
      },
      giaGio: {
        type: Sequelize.INTEGER
      },
      giaNgay: {
        type: Sequelize.INTEGER
      },
      giaDem: {
        type: Sequelize.INTEGER
      },
      anh: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('HangPhongs');
  }
};