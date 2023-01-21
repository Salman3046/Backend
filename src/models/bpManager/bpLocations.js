const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const bpLocations = sequelize.define('bpLocations', {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    locationLAT: {
      type: DataTypes.DECIMAL(20, 10),
      allowNull: true
    },
    locationLONG: {
      type: DataTypes.DECIMAL(20, 10),
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
    businessPageId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    bpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    isDefault:{
      type: DataTypes.TINYINT,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'bpLocations',
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
        name: "fk_bpLocation_businessPage1_idx",
        using: "BTREE",
        fields: [{
          name: "businessPageId"
        }, ]
      },
      {
        name: "fk_bpLocation_users1_idx",
        using: "BTREE",
        fields: [{
          name: "bpAdminId"
        }, ]
      },
    ]
  })
  bpLocations.associate = (models) => {
    bpLocations.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id"
    });
  }
  return bpLocations;
};