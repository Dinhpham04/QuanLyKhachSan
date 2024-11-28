'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anhs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maPhong: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'phongs',
            // không dùng schema
          },
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Anhs');
  }
};