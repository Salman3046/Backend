
module.exports = (sequelize, DataTypes) => {
  const adPreferrencesMasters = sequelize.define(
    "adPreferrencesMasters",
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
      name: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      discriptions: {
        type: DataTypes.TEXT,
        defaultValue: "",
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
  adPreferrencesMasters.associate = (models) => {
    adPreferrencesMasters.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
  };
  return adPreferrencesMasters;
};

