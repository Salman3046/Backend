const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpContacts = sequelize.define(
    "bpContacts",
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
      emailAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      operatingStatus: {
        type: DataTypes.ENUM("email", "mobile"),
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
      tableName: "bpContacts",
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
          name: "fk_bpContacts_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpContacts_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );

  return bpContacts;
};
