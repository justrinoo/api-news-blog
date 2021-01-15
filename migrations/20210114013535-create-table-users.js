"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			username: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_At: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	},
};
