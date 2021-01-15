const { Users } = require("../../../models");
const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const n = new Validator();

module.exports = async (req, res) => {
	try {
		const schema = {
			email: "string|empty:false",
			username: "string|empty:false",
			password: "string|empty:false",
		};
		const validate = n.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json({ status: "error", message: validate });
		}
		const user = await Users.findOne({
			where: {
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
			},
		});
		if (user) {
			return res
				.status(409)
				.json({ status: "error", message: "user already exist!" });
		}

		const password = await bcrypt.hash(req.body.password, 10);

		const dataRegister = await Users.create({
			email: req.body.email,
			username: req.body.username,
			password,
		});
		return res.status(200).json({
			status: "success",
			message: "user success created",
			data: {
				id: dataRegister.id,
				email: dataRegister.email,
				username: dataRegister.username,
			},
		});
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
