module.exports = (sequelize, DataTypes) => {
  const adManagers = sequelize.define(
    "adManagers",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      adMastrerTypesId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adMastrerTypes",
          key: "id",
        },
      },
      adTypesId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "adTypes",
          key: "id",
        },
      },
      adSubTypesId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adSubTypes",
          key: "id",
        },
      },
      discriptions: {
        type: DataTypes.STRING,
      },
      websiteLink: {
        type: DataTypes.STRING,
      },
      adStatus: {
        type: DataTypes.ENUM([
          "READY_TO_START",
          "PENDING",
          "CANCELLED",
          "RUNNING",
          "DRAFT",
          "DUE",
          "OVERDUE",
          "COMPLETED",
          "STOP",
        ]),
        defaultValue: "READY_TO_START",
      },
      adId: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        paranoid: true,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        default: Date.now(),
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  adManagers.associate = (models) => {
    adManagers.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    adManagers.belongsTo(models.adMastrerTypes, {
      foreignKey: "adMastrerTypesId",
      targetKey: "id",
    });
    adManagers.belongsTo(models.adTypes, {
      foreignKey: "adTypesId",
      targetKey: "id",
    });
    adManagers.belongsTo(models.adSubTypes, {
      foreignKey: "adSubTypesId",
      targetKey: "id",
    });
    adManagers.hasMany(models.adMedias);
    adManagers.hasMany(models.adPreferrences);
    adManagers.hasMany(models.adTargetGenders);
    adManagers.hasMany(models.adTargetAges);
    adManagers.hasMany(models.adTargetProfessions);
    adManagers.hasMany(models.adTargetInterests);
    adManagers.hasMany(models.adTargetLocations);
    adManagers.hasMany(models.budgetAndDurations);
    adManagers.hasMany(models.adUserTransactions);
    adManagers.hasMany(models.adPayments);
    adManagers.hasMany(models.insights);
    adManagers.hasMany(models.adPostComments);
    adManagers.hasMany(models.adPostEngagements);
    adManagers.hasMany(models.adPostReactions);
    adManagers.hasMany(models.adPostShares);
    adManagers.hasMany(models.adPostImpressions);
  };
  return adManagers;
};
