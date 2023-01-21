const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpAudioPosts', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coverURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duration: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    postId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPosts',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'grpAudioPosts',
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
        name: "fk_grpAudioPosts_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
    ]
  });
};
