import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(`../configs/config.js`)[env];

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		dialectOptions: {
			multipleStatements: true
		},
		...config,
		define: {
			freezeTableName: true
		}
	}
);

const db = {};
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
	.filter(file => (
		file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
	))
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

fs.readdirSync(__dirname)
	.filter(file => (
		file.indexOf('.js') <= 0
	))
	.forEach((file) => {
		fs.readdirSync(path.join(__dirname, file))
			.filter(subFile => (
				subFile.indexOf('.') !== 0 && subFile !== basename && subFile.slice(-3) === '.js'
			))
			.forEach((subFile) => {
				const model = require(path.join(__dirname + "/" + file, subFile))(sequelize, Sequelize.DataTypes);
				db[model.name] = model;
			});
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
