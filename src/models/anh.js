'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anh extends Model {
    static associate(models) { // định danh các mối quan hệ 
      Anh.belongsTo(models.Phong, {
        foreignKey: 'maPhong',
        as: 'phong',
      })
    }
  }
  Anh.init({
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Anh',
  });
  return Anh;
};

// Khởi tạo model đầu tiên: npx sequelize-cli model:generate --name Anh --attributes firstName:string,lastName:string,email:string