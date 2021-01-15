require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

module.exports = {
	development: {
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		host: DB_HOST,
		dialect: "mysql",
	},
	test: {
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		host: DB_HOST,
		dialect: "mysql",
	},
	production: {
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		host: DB_HOST,
		dialect: "mysql",
	},
};
