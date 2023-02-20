'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING(190),
        allowNull: false,
      },
      delivery_number: {
        type: Sequelize.STRING(190),
        allowNull: false,
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50)
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
