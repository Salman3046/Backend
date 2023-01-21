const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpMessageSettings = sequelize.define(
    "bpMessageSettings",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      instantReplyOn: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      instantReplyText: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      awayMessageOn: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      awayMessageText: {
        type: DataTypes.STRING(400),
        allowNull: true,
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
    },
    {
      sequelize,
      tableName: "bpMessageSettings",
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
          name: "fk_bpMessageSetting_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpMessageSetting_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );

  bpMessageSettings.associate = (models) => {
    bpMessageSettings.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id",
    });
  };

  return bpMessageSettings;
};
