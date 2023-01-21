const Sequelize = require("sequelize");
const { bpVisitors } = require("../../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const bpVisitors = sequelize.define(
    "bpVisitors",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      visitingStatus: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "bpVisitors",
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
          name: "fk_postMentions_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
        {
          name: "fk_postViews_copy1_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
      ],
    }
  );

  bpVisitors.associate = (models) => {
    bpVisitors.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    //bpVisitors.hasMany(models.users);
  };

  return bpVisitors;
};
