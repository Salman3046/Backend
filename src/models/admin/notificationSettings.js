module.exports = (sequelize, DataTypes) => {
  const notificationSettings = sequelize.define("notificationSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emailNotification: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    profileVisit: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    notifcationOnPost: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
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
  return notificationSettings;
};
