
module.exports = (sequelize, DataTypes) => {
  const adCallToActionMasters = sequelize.define(
    "adCallToActionMasters",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      descriptions: {
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
  adCallToActionMasters.associate = (models) => {
  };
  return adCallToActionMasters;
};

