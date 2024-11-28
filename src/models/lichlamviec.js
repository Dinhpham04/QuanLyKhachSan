'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LichLamViec extends Model {
    static associate(models) { // định danh các mối quan hệ 
      LichLamViec.belongsTo(models.CaLamViec, {
        foreignKey: 'maCaLamViec',
        as: 'caLamViec',
      });
      LichLamViec.belongsTo(models.NhanVien, {
        foreignKey: 'maNhanVien',
        as: 'nhanVien',
      })
    }
  }
  LichLamViec.init({ // không cần khai báo khóa chính 
    hoanThanh: DataTypes.BOOLEAN,
    thoiGian: DataTypes.DATE,
    ghiChu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LichLamViec',
  });
  return LichLamViec;
};

