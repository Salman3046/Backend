const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpPosts = sequelize.define(
    "bpPosts",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rePostId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      feelingId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "businessPages",
          key: "id",
        },
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      capation: {
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
        defaultValue: 0,
      },
      postType: {
        type: DataTypes.ENUM("media", "event", "article", "offer", "coupon"),
        allowNull: true,
      },
      articleTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      blockByAdmin: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      blockMessage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      blockCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      isRePosted: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowComment: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      sharesCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      viewsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      commentsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      thumbnailURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      locationLAT: {
        type: DataTypes.DECIMAL(20, 10),
      },
      locationLONG: {
        type: DataTypes.DECIMAL(20, 10),
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
    },
    {
      sequelize,
      tableName: "bpPosts",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_bpPosts_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpPosts_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
        {
          name: "fk_bpPosts_bpPosts1_idx",
          using: "BTREE",
          fields: [{ name: "rePostId" }],
        },
        {
          name: "fk_bpPosts_feelings1_idx",
          using: "BTREE",
          fields: [{ name: "feelingId" }],
        },
      ],
    }
  );
  bpPosts.associate = (models) => {
    bpPosts.hasMany(models.bpPostMediaLists);
    bpPosts.hasMany(models.bpPostLikes);
  };
  return bpPosts;
};
