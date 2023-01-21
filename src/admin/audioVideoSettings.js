module.exports = (sequelize, DataTypes) => {
  const audioVideoSettings = sequelize.define("audioVideoSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    audioCall: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    chat: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    videoCall: {
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
  return audioVideoSettings;
};
