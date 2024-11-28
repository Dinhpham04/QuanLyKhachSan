'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhachHang extends Model {

    static associate(models) { // định danh các mối quan hệ 
      KhachHang.hasMany(models.DatPhong, {
        foreignKey: 'maKhachHang',
        as: 'datPhongs',
      });
      KhachHang.hasMany(models.HoaDonDichVu, {
        foreignKey: 'maKhachHang',
        as: 'dichVus',
      })
    }
  }
  KhachHang.init({
    tenKH: DataTypes.STRING,
    ngaySinh: DataTypes.STRING,
    gioiTinh: DataTypes.BOOLEAN,
    soCCCD: DataTypes.STRING,
    soDT: DataTypes.STRING,
    anh: DataTypes.STRING,
    email: DataTypes.STRING,
    matKhau: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'KhachHang',
  });
  return KhachHang;
};
