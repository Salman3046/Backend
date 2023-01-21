module.exports = (sequelize, DataTypes) => {
  const emailSettings = sequelize.define("emailSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serverType: {
      type: DataTypes.ENUM("test"),
      allowNull: true,
    },
    smtpUserName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    smtpPort: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    smtpHost: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    smtpPassword: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    smtpEncryption: {
      type: DataTypes.ENUM("test"),
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    countryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  //   feelingCategory.associate = (models) => {
  //     // feelingCategory.belongsTo(models.posts, {
  //     //   foreignKey: "feelingCategoryId",
  //     //   targetKey: "id",
  //     // });
  //     //feelingCategory.hasMany(models.posts);
  //   };
  return emailSettings;
};
