const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcEpisode', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        seriesId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'pcSeries',
                key: 'id'
            }
        },
        seasonId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'pcSeason',
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
        title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        descrepation: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        coverImageURL: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        scheduledTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        mediaURL: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isActive: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'pcEpisode',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_pcSeason_pcSeries1_idx" },
                ]
            },
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "fk_pcEpisode_pcSeason1_idx" },
                ]
            },
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
