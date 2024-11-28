'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDonDichVu extends Model {

    static associate(models) { // định danh các mối quan hệ 
      HoaDonDichVu.belongsTo(models.KhachHang, {
        foreignKey: 'maKhachHang',
        as: 'khachHang'
      });
      HoaDonDichVu.belongsTo(models.HangHoa, {
        foreignKey: 'maHangHoa',
        as: 'hangHoa'
      })
    }
  }
  HoaDonDichVu.init({
    soLuong: DataTypes.INTEGER,
    thanhTien: DataTypes.INTEGER,
    trangTTT: DataTypes.BOOLEAN,
    thoigian: DataTypes.DATE,
    danhGia: DataTypes.INTEGER,
    nhanXet: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'HoaDonDichVu',
  });
  return HoaDonDichVu;
};
