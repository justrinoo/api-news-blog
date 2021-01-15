const express = require("express");
const router = express.Router();
const handlerRegister = require("./handler/users");

router.post("/register", handlerRegister.register);
router.post("/login", handlerRegister.login);

module.exports = router;
