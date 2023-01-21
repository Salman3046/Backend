const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const bpCoverImages = sequelize.define('bpCoverImages', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    businessPageId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    bpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    coverUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'bpCoverImages',
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
        name: "fk_bpCoverImages_businessPage1_idx",
        using: "BTREE",
        fields: [{
          name: "businessPageId"
        }, ]
      },
      {
        name: "fk_bpCoverImages_users1_idx",
        using: "BTREE",
        fields: [{
          name: "bpAdminId"
        }, ]
      },
    ]
  });
  bpCoverImages.associate = (models) => {
    bpCoverImages.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id"
    });
  }
  return bpCoverImages;
};