const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var bpAdminstrator = sequelize.define('bpAdminstrator', {
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
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('superAdmin', 'admin', 'manager'),
      allowNull: true
    },
    roleAdd: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    roleUpdate: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    roleDelete: {
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
    tableName: 'bpAdminstrator',
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
        name: "uniqueCol",
        unique: true,
        using: "BTREE",
        fields: [{
            name: "businessPageId"
          },
          {
            name: "userId"
          },
        ]
      },
      {
        name: "fk_bpAdminstrator_businessPage1_idx",
        using: "BTREE",
        fields: [{
          name: "businessPageId"
        }, ]
      },
      {
        name: "fk_bpAdminstrator_users1_idx",
        using: "BTREE",
        fields: [{
          name: "userId"
        }, ]
      },
    ]
  });
  bpAdminstrator.associate = (models) => {
    bpAdminstrator.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id"
    });
    bpAdminstrator.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
  }
  return bpAdminstrator;
};