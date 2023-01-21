module.exports = (sequelize, DataTypes) => {
  const userSettings = sequelize.define("userSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userRegistration: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    unusualLogins: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    userAccDel: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    twoFactorAuth: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    accountValidation: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    reCaptcha: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    preventBadLoginAttempts: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    autoUserNameOnReg: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    twoFactAuthField: {
      type: DataTypes.ENUM("Email-Address", "Phone-Number", "Both"),
      allowNull: true,
      defaultValue: "Phone-Number",
    },
    accoutValidationMethod: {
      type: DataTypes.ENUM("Email-Address", "Phone-Number"),
      allowNull: true,
      defaultValue: "Phone-Number",
    },
    recaptchaKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recaptchaSecretKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loginAttempts: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    activeUser: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    deActivateUser: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    registrationPerHour: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    userLastSeen: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    profileBackgroundChange: {
      type: DataTypes.TINYINT,
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
  return userSettings;
};
