require('dotenv').config();

const x = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		// logging:false,
	},
	test: {
		userName: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	production: {
		userName: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	staging: {
		userName: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
};
module.exports = x;
