'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Phongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maHangPhong: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'hangphongs',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tenPhong: {
        type: Sequelize.STRING,
      },
      veSinh: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      trangTTSD: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('Phongs');
  }
};