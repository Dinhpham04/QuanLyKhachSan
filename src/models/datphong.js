'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatPhong extends Model {
    static associate(models) {
      DatPhong.belongsTo(models.Phong, {
        foreignKey: 'maPhong',
        as: 'phong',
      });
      DatPhong.belongsTo(models.KhachHang, {
        foreignKey: 'maKhachHang',
        as: 'khachHang',
      })
    }
  }
  DatPhong.init({
    trangThai: DataTypes.ENUM('dat_truoc', 'dang_su_dung', 'huy', 'cho_xac_nhan'),
    hinhThuc: DataTypes.ENUM('gio', 'ngay', 'dem'),
    tGNhan: DataTypes.DATE,
    tGTra: DataTypes.DATE,
    ghiChu: DataTypes.STRING,
    trangTTT: DataTypes.ENUM('mot_phan', 'toan_bo', 'chua_TT'),
    daTT: DataTypes.INTEGER,
    canTT: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DatPhong',
  });
  return DatPhong;
};
