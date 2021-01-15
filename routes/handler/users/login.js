require("dotenv").config();
const { Users } = require("../../../models");
const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const n = new Validator();
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env;

module.exports = async (req, res) => {
	try {
		const schema = {
			email: "string|empty:false",
			password: "string|empty:false",
		};
		const validate = n.validate(req.body, schema);
		if (validate.length) {
			return res.status(400).json({ status: "error", message: validate });
		}

		const user = await Users.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "user not found" });
		}

		const password = await bcrypt.compare(req.body.password, user.password);
		if (!password) {
			return res
				.status(404)
				.json({ status: "error", message: "password dont match!" });
		}

		const token = jwt.sign(
			{ email: user.email, password: user.password },
			JWT_SECRET,
			{ expiresIn: JWT_SECRET_EXPIRES }
		);

		return res.status(200).json({
			status: "success",
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
			},
			token,
		});
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
