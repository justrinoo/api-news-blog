const { Articles, Users } = require("../../../models");
const Validator = require("fastest-validator");
const n = new Validator();

module.exports = async (req, res) => {
	try {
		const schema = {
			user_id: "number",
			slug: "string",
			title: "string",
			description: "string",
		};
		const validate = n.validate(req.body, schema);
		if (validate.length) {
			return res.status(400).json({ status: "error", message: validate });
		}

		const { user_id } = req.body;
		const article_id = req.params.id;

		const user = await Users.findByPk(user_id);
		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "user not found!" });
		}
		const article = await Articles.findByPk(article_id, {
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
		await Articles.findOne({
			where: {
				slug: req.body.slug,
				title: req.body.title,
				description: req.body.description,
			},
		});

		if (!article) {
			return res
				.status(404)
				.json({ status: "error", message: "article not found!" });
		}

		await article.update({
			user_id,
			slug: req.body.slug,
			title: req.body.title,
			description: req.body.description,
			options: "publish",
		});
		return res
			.status(200)
			.json({ status: "success", message: "article has been updated!" });
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
