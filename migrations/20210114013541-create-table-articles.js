"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("articles", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			options: {
				type: Sequelize.ENUM(),
				values: ["publish", "archive"],
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});

		await queryInterface.addConstraint("articles", {
			type: "foreign key",
			name: "USER_ID_ARTICLE",
			fields: ["userId"],
			references: {
				table: "users",
				field: "id",
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("articles");
	},
};
