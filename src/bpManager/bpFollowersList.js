const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpFollowersList = sequelize.define(
    "bpFollowersList",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      isActive: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      notificationOn: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
      },
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpFollowersList",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_bpFollowersList_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpFollowersList_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );

  bpFollowersList.associate = (models) => {
    bpFollowersList.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    bpFollowersList.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id",
    });
  };

  return bpFollowersList;
};
