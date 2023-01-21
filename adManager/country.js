const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "name_UNIQUE"
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: true,
      unique: "code_UNIQUE"
    },
    teleCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "teleCode_UNIQUE"
    },
    flagURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iconURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nativeLanguagesId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'appLanguages',
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
    tableName: 'country',
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
        name: "code_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "teleCode_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "teleCode" },
        ]
      },
      {
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "fk_countryFlag_languages1_idx",
        using: "BTREE",
        fields: [
          { name: "nativeLanguagesId" },
        ]
      },
    ]
  });
};
