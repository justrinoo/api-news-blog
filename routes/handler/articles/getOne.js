const { Articles, Users } = require("../../../models");

module.exports = async (req, res) => {
	try {
		const slug = req.params.slug;

		const articles = await Articles.findOne(
			{
				where: {
					slug,
				},
			},
			{
				attributes: [
					"id",
					"userId",
					"slug",
					"title",
					"description",
					"category",
					"options",
					"created_at",
					"updated_at",
				],
				include: [{ model: Users, required: true, as: "article_user" }],
			}
		);
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
