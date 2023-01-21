const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const genderConfigs = sequelize.define('genderConfigs', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    genderMastersId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'genderMasters',
        key: 'id'
      }
    },
    priceCount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {});
  genderConfigs.associate = (models) => {
    genderConfigs.belongsTo(models.genderMasters, {
      foreignKey: "genderMastersId",
      targetKey: "id"
    });
  };
  return genderConfigs;
};