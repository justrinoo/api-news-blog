const uuid = require("uuid").v4;
const { Articles, Users } = require("../../../models");
const Validator = require("fastest-validator");
const n = new Validator();

module.exports = async (req, res) => {
	try {
		const schema = {
			userId: "number|empty:false",
			slug: "string|empty:false",
			title: "string|empty:false",
			description: "string|empty:false",
		};

		const validate = n.validate(req.body, schema);
		if (validate.length) {
			return res.status(200).json({ status: "error", message: validate });
		}

		const articles = await Articles.findOne({
			where: {
				userId: req.body.userId,
				slug: req.body.slug,
				title: req.body.title,
				description: req.body.description,
			},
		});

		const { userId, slug, title, description } = req.body;
		const user = await Users.findByPk(userId);

		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "user not found!" });
		}
		if (articles) {
			return res.status(409).json({
				status: "error",
				message: "article already exist,can you replace?",
			});
		}

		await Articles.create({
			id: uuid(),
			userId,
			slug,
			title,
			description,
			options: "publish",
		});

		return res
			.status(200)
			.json({ status: "success", message: "article has been created!" });
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
