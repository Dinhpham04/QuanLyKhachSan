'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // định danh các mối quan hệ 
      // define association here
    }
  }
  User.init({ // không cần khai báo khóa chính 
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    typeRole: DataTypes.STRING,
    keyRole: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};