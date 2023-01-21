module.exports = (sequelize, DataTypes) => {
  const smsSettings = sequelize.define("smsSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    defaultSmsProvider: {
      type: DataTypes.ENUM("test"),
      allowNull: true,
      defaultValue: "test",
    },
    bulkSmsUserName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    twilioAccount: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    twilioPhoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    infobipPassword: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    bulkSmsEApiUrl: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    bulkSmsPassword: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    twilioAuthToken: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    infobipUserName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
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
      allowNull: false,
    },
  });
  //   feelingCategory.associate = (models) => {
  //     // feelingCategory.belongsTo(models.posts, {
  //     //   foreignKey: "feelingCategoryId",
  //     //   targetKey: "id",
  //     // });
  //     //feelingCategory.hasMany(models.posts);
  //   };
  return smsSettings;
};
