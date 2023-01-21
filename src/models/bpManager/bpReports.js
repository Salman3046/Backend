const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpReports', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    reportedBy: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "fk_reportedUsers_users20"
    },
    reportOptionId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    businessPageId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bpReports',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uniqueKey",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reportedBy" },
        ]
      },
      {
        name: "fk_reportedUsers_users2_idx",
        using: "BTREE",
        fields: [
          { name: "reportedBy" },
        ]
      },
      {
        name: "fk_reportedUsers_reportOptions1_idx",
        using: "BTREE",
        fields: [
          { name: "reportOptionId" },
        ]
      },
      {
        name: "fk_userReports_copy1_businessPage1_idx",
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
        ]
      },
    ]
  });
};
