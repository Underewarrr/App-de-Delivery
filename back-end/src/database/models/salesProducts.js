module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define(
    "salesProduct",
    {
      saleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "sales_products",
    }
  );

  salesProduct.associate = (models) => {
    salesProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale'
    })
    salesProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    })
  }

  return salesProduct;
};
