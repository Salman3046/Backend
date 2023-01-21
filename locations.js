module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define(
    "locations",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tableId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tableName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(20, 10),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(20, 10),
        allowNull: true,
      },
    },
    {}
  );
  // locations.associate = (models) => {
  //   locations.belongsTo(models.posts, {
  //     foreignKey: "postId",
  //     targetKey: "id",
  //   });
  // };

  return locations;
};
