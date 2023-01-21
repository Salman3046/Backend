const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpCommentReports', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    postCommentId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPostComments',
        key: 'id'
      }
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
      allowNull: false,
      references: {
        model: 'reportOptions',
        key: 'id'
      }
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
    tableName: 'grpCommentReports',
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
        name: "fk_grpCommentReports_grpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "postCommentId" },
        ]
      },
      {
        name: "fk_grpCommentReports_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_grpCommentReports_reportOptions1_idx",
        using: "BTREE",
        fields: [
          { name: "reportOptionId" },
        ]
      },
    ]
  });
};
