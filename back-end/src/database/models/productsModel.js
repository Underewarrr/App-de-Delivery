module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "products",
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.salesProduct, {
      foreignKey: 'productId',
      as: 'product'
    })
  }

  return Product;
};
