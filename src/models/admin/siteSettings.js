module.exports = (sequelize, DataTypes) => {
  const siteSettings = sequelize.define("siteSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    greetings: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    marketPlaceSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    articleSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    businessPageSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    advertisementSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    eventSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    weatherWidget: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    feedGroupSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    storySystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    moviesSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    stickersSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    friendsNearbySystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    googleMaps: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    popularPostsComments: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    postBlogs: {
      type: DataTypes.ENUM("Admin", "Users"),
      allowNull: true,
      defaultValue: "Users",
    },
    eventSystemVisibility: {
      type: DataTypes.ENUM("Registered Users", "Unregistered Users"),
      allowNull: true,
      defaultValue: "Registered Users",
    },
    productSystemVisibility: {
      type: DataTypes.ENUM("Registered Users", "Unregistered Users"),
      allowNull: true,
      defaultValue: "Registered Users",
    },
    weatherWidgetGoogleKey: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "abcd",
    },
    GIFsystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    membership: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    businessPageApproval: {
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
  return siteSettings;
};
