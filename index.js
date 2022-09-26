const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { createController } = require("./controller/PollController");
require("dotenv").config();
// middleware
app.set("view engine", "ejs");
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 8000;

// API Route 
app.get("/", (req, res) => {
  res.render("home");
});
app.get('/create',createController)


// Database connection
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fp7ypgo.mongodb.net/express-cc`;
mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(port, () => {
      console.log("Yes, i am listing your talking");
    });
  })
  .catch((err) => {
    console.log(err);
  });
