module.exports = (sequelize, DataTypes) => {
  const postSettings = sequelize.define("postSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    commentsReport: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    coloredPost: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    waterMarkOverlay: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "80 Characters",
    },
    maxAllowedCharacters: {
      type: DataTypes.ENUM("80 Characters"),
      allowNull: true,
      defaultValue: "80 Characters",
    },
    viewHomePagePosts: {
      type: DataTypes.ENUM("user posts"),
      allowNull: true,
      defaultValue: "user posts",
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
  return postSettings;
};
