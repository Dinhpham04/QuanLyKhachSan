'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phong extends Model {
    static associate(models) { // định danh các mối quan hệ 
      Phong.belongsTo(models.HangPhong, {
        foreignKey: 'maHangPhong',
        as: 'hangPhong',
      });
      Phong.hasMany(models.Anh, {
        foreignKey: 'maPhong',
        as: 'anhs',
      });
      Phong.hasMany(models.DatPhong, {
        foreignKey: 'maPhong',
        as: 'datPhongs',
      })
    }
  }
  Phong.init({ // không cần khai báo khóa chính 
    tenPhong: DataTypes.STRING,
    veSinh: DataTypes.BOOLEAN,
    trangTSD: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Phong',
  });
  return Phong;
};

