const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const bpSubCategory = sequelize.define('bpSubCategory', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'bpCatalogue',
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
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
    }
  }, {
    sequelize,
    tableName: 'bpSubCategory',
    timestamps: true,
    paranoid: true,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{
          name: "id"
        }, ]
      },
      {
        name: "fk_bpSubCategory_bpCategory1_idx",
        using: "BTREE",
        fields: [{
          name: "categoryId"
        }, ]
      },
      {
        name: "fk_bpSubCategory_users1_idx",
        using: "BTREE",
        fields: [{
          name: "userId"
        }, ]
      },
    ]
  });

  return bpSubCategory;
};