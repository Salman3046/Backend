const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpCommentReports', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    },
    commentId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    userId: {
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
    }
  }, {
    sequelize,
    tableName: 'bpCommentReports',
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
        name: "fk_bpCommentReports_bpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "commentId" },
        ]
      },
      {
        name: "fk_bpCommentReports_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_bpCommentReports_reportOptions1_idx",
        using: "BTREE",
        fields: [
          { name: "reportOptionId" },
        ]
      },
    ]
  });
};
