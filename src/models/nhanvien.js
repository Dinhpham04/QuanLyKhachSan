'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVien extends Model {

    static associate(models) { // định danh các mối quan hệ 
      NhanVien.hasMany(models.LichLamViec, {
        foreignKey: 'maNhanVien',
        as: 'lichLamViecs'
      })
    }
  }
  NhanVien.init({
    tenNV: DataTypes.STRING,
    maCC: DataTypes.STRING,
    ngaySinh: DataTypes.STRING,
    gioiTinh: DataTypes.BOOLEAN,
    soCCCD: DataTypes.STRING,
    chucDanh: DataTypes.STRING,
    soDT: DataTypes.STRING,
    anh: DataTypes.STRING,
    email: DataTypes.STRING,
    matKhau: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'NhanVien',
  });
  return NhanVien;
};
