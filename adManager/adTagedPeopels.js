
module.exports = (sequelize, DataTypes) => {
  const adTagedPeopels = sequelize.define(
    "adTagedPeopels",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      adManagerId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adManagers",
          key: "id",
        },
      },
      tagedUser: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        paranoid: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  adTagedPeopels.associate = (models) => {
    adTagedPeopels.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
  };
  return adTagedPeopels;
};

