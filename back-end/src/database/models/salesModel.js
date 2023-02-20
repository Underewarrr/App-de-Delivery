module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(190),
      deliveryNumber: DataTypes.STRING(190),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "sales",
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      through: Sale,
    })
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
      through: Sale,
    })
    Sale.belongsTo(models.salesProduct, {
      foreignKey: 'id',
      through: Sale,
      as: 'sale'
    })
  }

  return Sale;
};
