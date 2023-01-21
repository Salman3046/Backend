const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcSeries', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        categoryId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'pcCategory',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: 'users',
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
        tableName: 'pcSeries',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "pcSeriesfk_pcSeries_pcCategory1_idx" },
                ]
            }
        ]
    });
};
