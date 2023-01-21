module.exports = (sequelize, DataTypes) => {
    const paymentGatewayMasters = sequelize.define(
      "paymentGatewayMasters",
      {
        id: {
          type: DataTypes.STRING(255),
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        paymentGatewayName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        sequence: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        accessDevice: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {}
    );
    return paymentGatewayMasters;
  };
  