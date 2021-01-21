const { Articles, Users } = require("../../../models");

module.exports = async (req, res) => {
	try {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results = {};
		results.next = {
			page: page + 1,
			limit: limit,
		};
		results.previous = {
			page: page - 1,
			limit: limit + 1,
		};

		const articles = await Articles.findAll({
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
		});

		results.results = articles.slice(startIndex, endIndex);
		return res.status(200).json({ status: "success", data: results });
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
