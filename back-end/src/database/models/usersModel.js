module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      role: DataTypes.STRING(255),
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "users",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'user'
    })
    User.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'seller'
    })
  }

  return User;
};
