'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LichLamViecs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maCaLamViec: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'calamviecs',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      maNhanVien: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'nhanviens',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      hoanthanh: {
        type: Sequelize.BOOLEAN,
      },
      thoiGian: {
        type: Sequelize.DATE
      },
      ghiChu: {
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
    await queryInterface.dropTable('LichLamViecs');
  }
};