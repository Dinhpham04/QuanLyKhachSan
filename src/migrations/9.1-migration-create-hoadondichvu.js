'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HoaDonDichVus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maHangHoa: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'hanghoas',
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
      soLuong: {
        type: Sequelize.INTEGER,
      },
      thanhTien: {
        type: Sequelize.INTEGER,
      },
      trangTTT: {
        type: Sequelize.BOOLEAN,
      },
      thoigian: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      danhGia: {
        type: Sequelize.INTEGER,
      },
      nhanXet: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('HoaDonDichVus');
  }
};