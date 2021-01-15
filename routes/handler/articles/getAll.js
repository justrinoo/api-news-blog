const { Articles, Users } = require("../../../models");

module.exports = async (req, res) => {
	try {
		const articles = await Articles.findAll({
			attributes: [
				"id",
				"userId",
				"slug",
				"title",
				"description",
				"options",
				"created_at",
				"updated_at",
			],
			include: [{ model: Users, required: true, as: "article_user" }],
		});
		return res.status(200).json({ status: "success", data: articles });
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
