const { Articles, Users } = require("../../../models");

module.exports = async (req, res) => {
	try {
		const article_id = req.params.id;
		const articles = await Articles.findByPk(article_id, {
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
		if (!articles) {
			return res
				.status(404)
				.json({ status: "error", message: "article not found!" });
		}
		return res.status(200).json({ status: "success", data: articles });
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
