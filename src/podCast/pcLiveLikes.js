const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcLiveLikes', {
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
        podcastLiveId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'pcLives',
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER,
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
        tableName: 'pcLiveLikes',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_pcLiveLikes_pcPodcastsLives1_idx" },
                ]
            },
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_pcLiveLikes_users1_idx" },
                ]
            }
        ]
    });
};
