'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HangPhong extends Model {

    static associate(models) {
      HangPhong.hasMany(models.Phong, {
        foreignKey: 'maHangPhong',
        as: 'phongs'
      })
    }
  }
  HangPhong.init({ // không cần khai báo khóa chính 
    tenHP: DataTypes.STRING,
    giaGio: DataTypes.INTEGER,
    giaNgay: DataTypes.INTEGER,
    giaDem: DataTypes.INTEGER,
    anh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'HangPhong',
  });
  return HangPhong;
};

