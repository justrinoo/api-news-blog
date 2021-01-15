module.exports = (Sequelize, DataTypes) => {
	const Articles = Sequelize.define(
		"Articles",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
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
			tableName: "articles",
		}
	);

	Articles.associate = function (models) {
		Articles.belongsTo(models.Users, {
			as: "article_user",
			foreignKey: "userId",
		});
	};

	return Articles;
};
