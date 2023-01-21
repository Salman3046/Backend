const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcLives', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'pcCategory',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        startTime: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        endTime: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        likesCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        shareCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        allowComments: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        },
        isLive: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        },
        isActive: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'pcLives',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_pcEpisode_pcCategory1_idx" },
                ]
            }
        ]
    });
};
