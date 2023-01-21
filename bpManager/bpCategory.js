const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const bpCategory = sequelize.define('bpCategory', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    tableName: 'bpCategory',
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
        name: "fk_bpCategory_users1_idx",
        using: "BTREE",
        fields: [{
          name: "userId"
        }, ]
      },
    ]
  });
  bpCategory.associate = (models) => {
    bpCategory.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
  }

  return bpCategory;
};