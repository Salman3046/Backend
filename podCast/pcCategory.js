const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pcCategory', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
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
        tableName: 'pcCategory',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            }
        ]
    });
};
