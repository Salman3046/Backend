const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpOperatingHours = sequelize.define(
    "bpOperatingHours",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dayName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      startingTimeShift1: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      startingTimeShift2: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      startingTimeShift3: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      endingTimeShift1: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      endingTimeShift2: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      endingTimeShift3: {
        type: DataTypes.STRING(45),
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
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpOperatingHours",
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
          name: "fk_bpOperatingHours_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpOperatingHours_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );

  bpOperatingHours.associate = (models) => {
    bpOperatingHours.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id",
    });
  };

  return bpOperatingHours;
};
