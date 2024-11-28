'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KhachHangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenKH: {
        type: Sequelize.STRING
      },
      ngaySinh: {
        type: Sequelize.STRING
      },
      gioiTinh: {
        type: Sequelize.BOOLEAN,
      },
      soCCCD: {
        type: Sequelize.STRING
      },
      soDT: {
        type: Sequelize.STRING
      },
      anh: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      matKhau: {
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
    await queryInterface.dropTable('KhachHangs');
  }
};