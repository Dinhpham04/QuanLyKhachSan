'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaLamViec extends Model {
    static associate(models) { // định danh các mối quan hệ 
      CaLamViec.hasMany(models.LichLamViec, {
        foreignKey: 'maCaLamViec',
        as: 'lichLamViecs',
      })
    }
  }
  CaLamViec.init({ // không cần khai báo khóa chính 
    tenCaLV: DataTypes.STRING,
    thoiGian: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CaLamViec',
  });
  return CaLamViec;
};

