require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		await jwt.verify(token, JWT_SECRET, function (error, decoded) {
			if (error) {
				return res
					.status(403)
					.json({ status: "error", message: error.message });
			}
			req.user = decoded;
			return next();
		});
	} catch (error) {
		return res.status(500).json({ status: "error", message: error.message });
	}
};
