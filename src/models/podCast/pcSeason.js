const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcSeason', {
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
        isOpen: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            defaultValue: 1
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
        tableName: 'pcSeason',
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
            }
        ]
    });
};
