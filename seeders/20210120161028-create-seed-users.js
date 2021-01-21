const bcrypt = require("bcrypt");
("use strict");

function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "jhondoe@mail.com",
					username: "Jhon Doe",
					password: hashPassword("password"),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Users", [
			{
				username: "John Doe",
			},
		]);
	},
};
