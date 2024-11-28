'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DatPhongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maPhong: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'phongs',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      maKhachHang: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'khachhangs',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      trangThai: {
        type: Sequelize.ENUM('dat_truoc', 'dang_su_dung', 'huy', 'cho_xac_nhan'),
        allowNull: false,
        defaultValue: 'dat_truoc'
      },
      hinhThuc: {
        type: Sequelize.ENUM('gio', 'ngay', 'dem'),
        allowNull: false,
        defaultValue: 'gio'
      },
      tGNhan: {
        type: Sequelize.DATE
      },
      tGTra: {
        type: Sequelize.DATE
      },
      ghiChu: {
        type: Sequelize.STRING
      },
      trangTTT: {
        type: Sequelize.ENUM('mot_phan', 'toan_bo', 'chua_TT'),
        allowNull: false,
        defaultValue: 'chua_TT'
      },
      daTT: {
        type: Sequelize.INTEGER
      },
      canTT: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('DatPhongs');
  }
};