const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bpFAQ",
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
      question: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      answer: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      showOnPage: {
        type: DataTypes.TINYINT,
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
      tableName: "bpFAQ",
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
          name: "fk_bpFAQ_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpFAQ_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );
};
