module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      displayLocation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      schedule: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isScheduled: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      postType: {
        type: DataTypes.ENUM(
          "text",
          "media",
          "thought",
          "article",
          "event",
          "recommendation",
          "alert",
          "poll",
          "podcast",
          "shotz",
          "goLive"
        ),
        allowNull: true,
      },
      thoughtText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thoughtForeColor: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      thoughtBackColor: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      articleTags: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      articleCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "articleCategory",
          key: "id",
        },
      },
      articleCoverImageURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      edited: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      thumbnailURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sharesCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      viewsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      blockedByAdmin: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      blockMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blockCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      locationLAT: {
        type: DataTypes.DECIMAL(20, 10),
        allowNull: true,
      },
      locationLONG: {
        type: DataTypes.DECIMAL(20, 10),
        allowNull: true,
      },
      location1: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location2: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location3: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location4: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      rePosted: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      rePostid: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "posts",
          key: "id",
        },
      },
      feelingId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "feelings",
          key: "id",
        },
      },
      allowComments: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      shotzSpeed: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },
      shotzLength: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shotzAllowDuo: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      shotzAllowTrio: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      shotzAudioId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "shotzAudios",
          key: "id",
        },
      },
      shotzDuoId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "shotzAudios",
          key: "id",
        },
      },
      shotzTrioId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "shotzAudios",
          key: "id",
        },
      },
      shotzMediaURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      shotzIsAudioImported: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      userConnectionListId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      feelingCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "feelingCategory",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "feelingCategory",
          key: "users",
        },
      },
      recommendationCoverImageURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pollStartTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pollEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      alertLevelId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "postAlertLevelMaster",
          key: "id",
        },
      },
      alertRangeMeter: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      eventCoverImageURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eventStartTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      eventEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      eventDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eventAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eventCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "postEventCategory",
          key: "id",
        },
      },
      podcastTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      podcastImageURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      podcastMediaURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      podcastEpisodeId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "pcEpisode",
          key: "id",
        },
      },
      podcastCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        foreignKey: true,
        references: {
          model: "pcCategory",
          key: "id",
        },
      },
      podcastLivesId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "pcLives",
          key: "id",
        },
      },
    },
    {}
  );

  posts.associate = (models) => {
    posts.belongsTo(models.feelingCategory, {
      foreignKey: "feelingCategoryId",
      targetKey: "id",
    });
    posts.belongsTo(models.feelings, {
      foreignKey: "feelingId",
      targetKey: "id",
    });
    posts.hasMany(models.postTaggedUsers);
    posts.hasMany(models.postMediaList);
    posts.hasMany(models.postLikes);
    posts.hasMany(models.postArticleItems);
    //posts.hasMany(models.feelingCategory);
    //  posts.hasMany(models.locations);
  };

  return posts;
};
