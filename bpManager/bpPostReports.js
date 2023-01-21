const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpPostReports', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    postId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    reportedBy: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reportOptionId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    isActive: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1
    },
    isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'bpPostReports',
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
        name: "fk_bpPostReport_bpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
      {
        name: "fk_bpPostReport_users1_idx",
        using: "BTREE",
        fields: [
          { name: "reportedBy" },
        ]
      },
      {
        name: "fk_bpPostReport_reportOptions1_idx",
        using: "BTREE",
        fields: [
          { name: "reportOptionId" },
        ]
      },
    ]
  });
};
