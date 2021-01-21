const { Articles } = require("./Articles");
module.exports = (Sequelize, DataTypes) => {
	const Users = Sequelize.define(
		"Users",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "created_at",
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: "updated_at",
				allowNull: false,
			},
		},
		{
			tableName: "users",
		}
	);

	Users.associate = function (models) {
		Users.hasMany(models.Articles, { foreignKey: "userId" });
	};

	return Users;
};
