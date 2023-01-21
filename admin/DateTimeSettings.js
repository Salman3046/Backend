module.exports = (sequelize, DataTypes) => {
  const DateTimeSettings = sequelize.define("DateTimeSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    timeFormat: {
      type: DataTypes.ENUM("12 Hour", "24 Hour"),
      allowNull: true,
      defaultValue: "12 Hour",
    },
    DateFormat: {
      type: DataTypes.ENUM("MM/DD/YY"),
      allowNull: true,
      defaultValue: "MM/DD/YY",
    },
    TimeZone: {
      type: DataTypes.ENUM("IST(UCT +5:30", "PST(UCT+5:00 )"),
      allowNull: true,
      defaultValue: "IST(UCT +5:30",
    },
    weekStartsOn: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Mon",
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
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
  return DateTimeSettings;
};
