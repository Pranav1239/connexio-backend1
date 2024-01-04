const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser"); // Added body-parser
require("dotenv").config();

const authRoutes = require("./routes/authRoute"); // Corrected import path
const usersRoutes = require("./routes/users");

const app = express();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json()); // Use body-parser for JSON parsing
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
