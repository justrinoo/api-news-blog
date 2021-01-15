const express = require("express");
const router = express.Router();
const handlerArticles = require("./handler/articles");
const verifyToken = require("../middlewares/verify");

router.get("/", verifyToken, handlerArticles.getAll);
router.get("/:id", verifyToken, handlerArticles.getOne);
router.post("/new", handlerArticles.create);
router.put("/edit/:id", handlerArticles.edit);
router.delete("/delete/:id", handlerArticles.destroy);

module.exports = router;
