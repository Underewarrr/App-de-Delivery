'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      product_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_products')
  }
};
