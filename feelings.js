module.exports = (sequelize, DataTypes) => {
  const feelings = sequelize.define("feelings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    feelingCategoryId: {
      type: DataTypes.STRING(36),
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    iconURL: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  });
  feelings.associate = (models) => {
    feelings.belongsTo(models.feelingCategory, {
      foreignKey: "feelingCategoryId",
      targetKey: "id",
    });
  };
  return feelings;
};
