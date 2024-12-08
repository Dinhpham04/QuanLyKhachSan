'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HangHoa extends Model {

    static associate(models) { // định danh các mối quan hệ 
      HangHoa.hasMany(models.HoaDonDichVu, {
        foreignKey: 'maHangHoa',
        as: 'dichVus',
      })
    }
  }
  HangHoa.init({
    tenHH: DataTypes.STRING,
    giaBan: DataTypes.INTEGER,
    giaVon: DataTypes.INTEGER,
    tonKho: DataTypes.INTEGER,
    anh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'HangHoa',
  });
  return HangHoa;
};
