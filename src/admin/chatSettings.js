module.exports = (sequelize, DataTypes) => {
  const chatSettings = sequelize.define("chatSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    messageSeen: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    typingSystem: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    audioCalls: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    videoCalls: {
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
  return chatSettings;
};
