const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "n3ws bl09",
		resave: true,
		saveUninitialized: true,
		cookie: {
			expires: new Date(Date.now() + 60 * 10000),
			maxAge: 60 * 10000,
		},
	})
);

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/article", articlesRouter);

module.exports = app;
